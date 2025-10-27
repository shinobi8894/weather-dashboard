'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

const shortcuts = [
  { key: '/', description: 'Focus search bar' },
  { key: 'Esc', description: 'Clear search / Close dialogs' },
  { key: '?', description: 'Toggle this shortcuts menu' },
  { key: 'Tab', description: 'Navigate between elements' },
  { key: 'Enter', description: 'Search for city' },
  { key: 'C', description: 'Toggle Celsius/Fahrenheit' },
];

interface KeyboardShortcutsProps {
  onToggleUnit: () => void;
  onFocusSearch: () => void;
}

export function KeyboardShortcuts({ onToggleUnit, onFocusSearch }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === '/') {
        e.preventDefault();
        onFocusSearch();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        onToggleUnit();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleUnit, onFocusSearch]);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white 
                 hover:bg-white/30 transition-all duration-200 shadow-lg"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-title"
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md 
                       bg-white rounded-3xl shadow-2xl p-6 z-[9999] max-h-[90vh] overflow-y-auto
                       mx-4 sm:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="shortcuts-title" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Keyboard size={24} />
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close shortcuts dialog"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">{shortcut.description}</span>
                    <kbd className="px-3 py-1 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
