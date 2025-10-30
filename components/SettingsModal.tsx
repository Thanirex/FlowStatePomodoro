'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  onSave: (work: number, shortBreak: number, longBreak: number) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  onSave,
}: SettingsModalProps) {
  const [workMinutes, setWorkMinutes] = useState(Math.floor(workDuration / 60));
  const [shortBreakMinutes, setShortBreakMinutes] = useState(Math.floor(shortBreakDuration / 60));
  const [longBreakMinutes, setLongBreakMinutes] = useState(Math.floor(longBreakDuration / 60));

  useEffect(() => {
    setWorkMinutes(Math.floor(workDuration / 60));
    setShortBreakMinutes(Math.floor(shortBreakDuration / 60));
    setLongBreakMinutes(Math.floor(longBreakDuration / 60));
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  const handleSave = () => {
    onSave(workMinutes * 60, shortBreakMinutes * 60, longBreakMinutes * 60);
    onClose();
  };

  const handleCancel = () => {
    // Reset to current values
    setWorkMinutes(Math.floor(workDuration / 60));
    setShortBreakMinutes(Math.floor(shortBreakDuration / 60));
    setLongBreakMinutes(Math.floor(longBreakDuration / 60));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="glass-effect rounded-3xl shadow-zen max-w-md w-full p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-olive-100 font-jp">Settings</h2>
                <button
                  onClick={onClose}
                  className="text-olive-300 hover:text-olive-100 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Settings Form */}
              <div className="space-y-6">
                {/* Work Duration */}
                <div>
                  <label className="block text-sm font-medium text-olive-200 mb-2">
                    Work Session (minutes)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setWorkMinutes(Math.max(1, workMinutes - 5))}
                      className="w-10 h-10 rounded-full bg-olive-600 hover:bg-olive-500 text-white font-bold transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={workMinutes}
                      onChange={(e) => setWorkMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 focus:border-olive-500 focus:outline-none text-center text-lg font-semibold text-olive-100"
                      min="1"
                      max="180"
                    />
                    <button
                      onClick={() => setWorkMinutes(Math.min(180, workMinutes + 5))}
                      className="w-10 h-10 rounded-full bg-olive-600 hover:bg-olive-500 text-white font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Short Break Duration */}
                <div>
                  <label className="block text-sm font-medium text-sage-200 mb-2">
                    Short Break (minutes)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShortBreakMinutes(Math.max(1, shortBreakMinutes - 1))}
                      className="w-10 h-10 rounded-full bg-sage-600 hover:bg-sage-500 text-white font-bold transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={shortBreakMinutes}
                      onChange={(e) =>
                        setShortBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 focus:border-sage-500 focus:outline-none text-center text-lg font-semibold text-sage-100"
                      min="1"
                      max="60"
                    />
                    <button
                      onClick={() => setShortBreakMinutes(Math.min(60, shortBreakMinutes + 1))}
                      className="w-10 h-10 rounded-full bg-sage-600 hover:bg-sage-500 text-white font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Long Break Duration */}
                <div>
                  <label className="block text-sm font-medium text-olive-200 mb-2">
                    Long Break (minutes)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setLongBreakMinutes(Math.max(1, longBreakMinutes - 5))}
                      className="w-10 h-10 rounded-full bg-olive-600 hover:bg-olive-500 text-white font-bold transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={longBreakMinutes}
                      onChange={(e) =>
                        setLongBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 focus:border-olive-500 focus:outline-none text-center text-lg font-semibold text-olive-100"
                      min="1"
                      max="120"
                    />
                    <button
                      onClick={() => setLongBreakMinutes(Math.min(120, longBreakMinutes + 5))}
                      className="w-10 h-10 rounded-full bg-olive-600 hover:bg-olive-500 text-white font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Notice */}
              <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-xs text-olive-300 text-center">
                  Settings will reset to default (90/10/60 min) when you reload the page.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <motion.button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/10 text-olive-200 font-semibold hover:bg-white/20 border border-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 rounded-xl bg-olive-600 text-white font-semibold hover:bg-olive-700 transition-colors shadow-zen"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
