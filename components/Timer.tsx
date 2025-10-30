'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerProps {
  onOpenSettings: () => void;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

export default function Timer({
  onOpenSettings,
  workDuration,
  shortBreakDuration,
  longBreakDuration,
}: TimerProps) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  // Use refs to track the end time for accuracy
  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getDuration = useCallback((timerMode: TimerMode) => {
    switch (timerMode) {
      case 'work':
        return workDuration;
      case 'shortBreak':
        return shortBreakDuration;
      case 'longBreak':
        return longBreakDuration;
    }
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  const getModeLabel = (timerMode: TimerMode) => {
    switch (timerMode) {
      case 'work':
        return 'Work Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  const getModeColor = (timerMode: TimerMode) => {
    switch (timerMode) {
      case 'work':
        return 'text-olive-200';
      case 'shortBreak':
        return 'text-sage-200';
      case 'longBreak':
        return 'text-olive-300';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stopAlarm = () => {
    // Stop the looping audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Stop the fallback oscillator
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      } catch (e) {
        // Oscillator might already be stopped
      }
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsAlarmRinging(false);
  };

  const playNotificationSound = () => {
    // Play custom notification sound from public/assets/sounds/ on loop
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/assets/sounds/notification.mp3');
        audio.volume = 0.5; // Adjust volume (0.0 to 1.0)
        audio.loop = true; // Loop the audio
        audioRef.current = audio;

        audio.play().catch((error) => {
          console.log('Audio playback failed:', error);
          // Fallback: generate a looping beep if audio file doesn't exist
          fallbackBeep();
        });

        setIsAlarmRinging(true);
      } catch (error) {
        console.log('Audio creation failed:', error);
        fallbackBeep();
      }
    }
  };

  const fallbackBeep = () => {
    // Fallback looping beep sound if custom audio fails
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const playBeep = () => {
          if (!audioContextRef.current) return;

          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = 800;
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);

          oscillatorRef.current = oscillator;

          // Loop the beep every 1.5 seconds
          setTimeout(() => {
            if (audioContextRef.current) {
              playBeep();
            }
          }, 1500);
        };

        playBeep();
        setIsAlarmRinging(true);
      } catch (e) {
        console.log('Fallback beep failed:', e);
      }
    }
  };

  const handleTimerComplete = useCallback(() => {
    playNotificationSound();

    if (mode === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);

      // After 4 work sessions, take a long break
      if (newCompletedSessions % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(longBreakDuration);
      } else {
        setMode('shortBreak');
        setTimeLeft(shortBreakDuration);
      }
    } else {
      setMode('work');
      setTimeLeft(workDuration);
    }

    setIsRunning(false);
    endTimeRef.current = null;
  }, [mode, completedSessions, workDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    if (isRunning && endTimeRef.current) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTimeRef.current! - now) / 1000));

        setTimeLeft(remaining);

        if (remaining === 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          handleTimerComplete();
        }
      }, 100); // Update more frequently for accuracy

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isRunning, handleTimerComplete]);

  const handleStart = () => {
    if (!isRunning) {
      // Stop alarm if it's ringing
      if (isAlarmRinging) {
        stopAlarm();
      }

      endTimeRef.current = Date.now() + timeLeft * 1000;
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    endTimeRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    // Stop alarm if it's ringing
    if (isAlarmRinging) {
      stopAlarm();
    }

    setIsRunning(false);
    endTimeRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft(getDuration(mode));
  };

  const switchMode = (newMode: TimerMode) => {
    // Stop alarm if it's ringing
    if (isAlarmRinging) {
      stopAlarm();
    }

    setIsRunning(false);
    endTimeRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
  };

  const progress = ((getDuration(mode) - timeLeft) / getDuration(mode)) * 100;

  // Update timeLeft when duration props change (from settings)
  useEffect(() => {
    // Only update if timer is not actively running
    if (!isRunning) {
      setTimeLeft(getDuration(mode));
    }
  }, [workDuration, shortBreakDuration, longBreakDuration, mode, isRunning, getDuration]);

  // Cleanup: Stop alarm when component unmounts
  useEffect(() => {
    return () => {
      stopAlarm();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Mode Selector */}
      <div className="flex gap-3 mb-4">
        {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((timerMode) => (
          <motion.button
            key={timerMode}
            onClick={() => switchMode(timerMode)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              mode === timerMode
                ? 'bg-olive-600 text-white shadow-lg'
                : 'bg-white/10 text-olive-200 hover:bg-white/20 border border-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getModeLabel(timerMode)}
          </motion.button>
        ))}
      </div>

      {/* Timer Display */}
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Circular Progress */}
        <svg className="transform -rotate-90" width="320" height="320">
          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="160"
            cy="160"
            r="150"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 150}
            strokeDashoffset={2 * Math.PI * 150 * (1 - progress / 100)}
            initial={{ strokeDashoffset: 2 * Math.PI * 150 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 150 * (1 - progress / 100) }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a8a5c" />
              <stop offset="100%" stopColor="#6d8160" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h2
            className={`text-7xl font-bold ${getModeColor(mode)} font-jp`}
            key={timeLeft}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(timeLeft)}
          </motion.h2>
          <p className="text-olive-300 text-lg mt-2 font-medium">
            {getModeLabel(mode)}
          </p>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isRunning ? (
          <motion.button
            onClick={handleStart}
            className={`px-8 py-4 rounded-full font-semibold text-lg shadow-zen transition-colors ${
              isAlarmRinging
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/50'
                : 'bg-olive-600 hover:bg-olive-700 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              isAlarmRinging
                ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 8px 32px 0 rgba(239, 68, 68, 0.3)',
                      '0 8px 32px 0 rgba(239, 68, 68, 0.6)',
                      '0 8px 32px 0 rgba(239, 68, 68, 0.3)',
                    ],
                  }
                : {}
            }
            transition={
              isAlarmRinging
                ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : {}
            }
          >
            {isAlarmRinging ? 'Stop Alarm & Start' : 'Start'}
          </motion.button>
        ) : (
          <motion.button
            onClick={handlePause}
            className="px-8 py-4 bg-sage-600 text-white rounded-full font-semibold text-lg shadow-zen hover:bg-sage-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pause
          </motion.button>
        )}

        <motion.button
          onClick={handleReset}
          className="px-8 py-4 bg-white/10 text-olive-200 rounded-full font-semibold text-lg shadow-zen hover:bg-white/20 border border-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>

      {/* Settings Button */}
      <motion.button
        onClick={onOpenSettings}
        className="flex items-center gap-2 text-olive-300 hover:text-olive-100 transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Settings</span>
      </motion.button>

      {/* Session Counter */}
      <div className="text-center mt-4">
        <p className="text-olive-300 text-sm">Completed Sessions</p>
        <p className="text-3xl font-bold text-olive-200 font-jp">{completedSessions}</p>
      </div>
    </div>
  );
}
