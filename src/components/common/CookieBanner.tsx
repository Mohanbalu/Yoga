import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('yogyatra_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('yogyatra_cookie_consent', 'accepted');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md z-40 bg-[#18241F] text-white p-5 rounded-2xl shadow-2xl border border-[#2A3A33]"
        >
          <div className="flex items-start gap-3">
            <Cookie className="w-6 h-6 text-[#E2C085] shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <h4 className="text-xs font-semibold text-white">Mindful Cookie Privacy</h4>
              <p className="text-[11px] text-[#A1BBB0] leading-relaxed">
                We use non-intrusive cookies to personalize your booking experience and optimize website performance.
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={() => setShow(false)}
              className="px-3 py-1.5 text-xs text-[#A1BBB0] hover:text-white transition-colors"
            >
              Preferences
            </button>
            <button
              onClick={acceptCookies}
              className="bg-[#E2C085] text-[#18241F] px-4 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#F2D099] transition-all cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
