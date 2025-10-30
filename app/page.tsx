'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Timer from '@/components/Timer';
import SettingsModal from '@/components/SettingsModal';

// Default durations in seconds
const DEFAULT_WORK = 90 * 60; // 90 minutes
const DEFAULT_SHORT_BREAK = 20 * 60; // 20 minutes
const DEFAULT_LONG_BREAK = 60 * 60; // 60 minutes (1 hour)

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [workDuration, setWorkDuration] = useState(DEFAULT_WORK);
  const [shortBreakDuration, setShortBreakDuration] = useState(DEFAULT_SHORT_BREAK);
  const [longBreakDuration, setLongBreakDuration] = useState(DEFAULT_LONG_BREAK);

  const handleSaveSettings = (work: number, shortBreak: number, longBreak: number) => {
    setWorkDuration(work);
    setShortBreakDuration(shortBreak);
    setLongBreakDuration(longBreak);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image with Opacity */}
      {/* To customize: Change opacity-60 to any value (opacity-10 to opacity-100) */}
      {/* Or replace background.jpg with your own image in public/assets/images/ */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/assets/images/background.jpg')",
          }}
        />
        {/* Dark gradient overlay for elegant contrast while keeping image visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/40 to-black/50" />
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-olive-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-sage-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-olive-100 mb-4 font-jp drop-shadow-lg">
            Flow Mode
          </h1>
          <p className="text-xl md:text-2xl text-olive-200 font-light">
            Find your focus. Stay in flow.
          </p>

          {/* Decorative line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-olive-500 to-sage-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Timer Section */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-effect rounded-3xl shadow-zen p-8 md:p-12">
            <Timer
              onOpenSettings={() => setIsSettingsOpen(true)}
              workDuration={workDuration}
              shortBreakDuration={shortBreakDuration}
              longBreakDuration={longBreakDuration}
            />
          </div>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          className="max-w-xl mx-auto mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <blockquote className="text-olive-200 italic text-lg">
            "The secret of getting ahead is getting started."
            <footer className="text-olive-300 text-sm mt-2 not-italic">— Mark Twain</footer>
          </blockquote>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-16 text-olive-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-olive-300">Built with Next.js & TailwindCSS</p>
          <p className="mt-1 text-olive-300">Designed for mindful productivity</p>
        </motion.footer>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        workDuration={workDuration}
        shortBreakDuration={shortBreakDuration}
        longBreakDuration={longBreakDuration}
        onSave={handleSaveSettings}
      />
    </main>
  );
}
