import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';

export const MACRO_PHASES = [
  { id: 'explore', number: '01', label: 'Explore' },
  { id: 'experience', number: '02', label: 'Experience' },
  { id: 'design', number: '03', label: 'Design' },
  { id: 'reflect', number: '04', label: 'Reflect' },
];

export default function RightRailNav({ activeSection, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 140);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map sub-sections to the 4 macro-phases
  const getActiveMacroPhase = () => {
    if (activeSection === 'hero' || activeSection === 'explore' || activeSection === 'personalized' || activeSection === 'world') {
      return 'explore';
    }
    if (activeSection === 'experience' || activeSection === 'home-scenario' || activeSection === 'health-scenario' || activeSection === 'education-scenario' || activeSection === 'mobility-scenario' || activeSection === 'environment-scenario' || activeSection === 'day-in-2040' || activeSection === 'transformation') {
      return 'experience';
    }
    if (activeSection === 'design' || activeSection === 'simulator' || activeSection === 'profile') {
      return 'design';
    }
    if (activeSection === 'reflect' || activeSection === 'ethics' || activeSection === 'ai') {
      return 'reflect';
    }
    return 'explore';
  };

  const currentMacro = getActiveMacroPhase();

  const handleNav = (id) => {
    sound.playClick();
    onNavigate?.(id);
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3 pointer-events-auto"
        >
          {/* Active Phase Pill Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E4F4A]/90 border border-seagreen-gold/40 text-white shadow-xl backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-seagreen-gold uppercase">
              {currentMacro}
            </span>
          </div>

          {/* Capsule Track */}
          <div className="relative py-4 px-2.5 rounded-full bg-[#0A332F]/90 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col items-center gap-4">
            {/* Background progress track */}
            <div className="absolute top-4 bottom-4 w-0.5 bg-white/10 -z-0 rounded-full overflow-hidden">
              <div
                className="w-full bg-gradient-to-b from-seagreen-secondary to-seagreen-gold transition-all duration-150"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>

            {/* Circular Indicator Dots */}
            {MACRO_PHASES.map((phase) => {
              const isActive = currentMacro === phase.id;
              const isHovered = hoveredPhase === phase.id;

              return (
                <div
                  key={phase.id}
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => setHoveredPhase(phase.id)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Tooltip on Hover: e.g. "● Explore" */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.94 }}
                        animate={{ opacity: 1, x: -16, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.94 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-full top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-[#0E4F4A]/95 border border-seagreen-gold/40 text-white text-xs font-semibold whitespace-nowrap shadow-2xl pointer-events-none backdrop-blur-md"
                      >
                        <div className="flex items-center gap-1.5 font-sans">
                          <span className="text-seagreen-gold font-bold">●</span>
                          <span>{phase.label}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dot Button */}
                  <button
                    onClick={() => handleNav(phase.id)}
                    data-cursor="hover"
                    className="relative z-10 w-6 h-6 flex items-center justify-center focus:outline-none group"
                    aria-label={`Navigate to ${phase.label}`}
                  >
                    {/* Active Halo */}
                    {isActive && (
                      <motion.div
                        layoutId="activeRailMacroHalo"
                        className="absolute inset-0 rounded-full bg-seagreen-secondary/35 border border-seagreen-gold shadow-gold"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}

                    {/* Dot Core */}
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-2.5 h-2.5 bg-seagreen-gold shadow-gold scale-110'
                          : 'w-2 h-2 bg-white/40 group-hover:bg-seagreen-seafoam group-hover:scale-125'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Minimal Percent Indicator */}
          <div className="text-[9px] font-mono font-bold text-seagreen-gold tracking-widest uppercase pr-0.5">
            {Math.round(scrollProgress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
