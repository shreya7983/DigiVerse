import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ETHICAL_CHALLENGES } from '../data/futureData';
import { ChevronDown, Scale } from 'lucide-react';

export default function Challenges() {
  const [expandedId, setExpandedId] = useState(ETHICAL_CHALLENGES[0].id);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="challenges" className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-seagreen-cream to-[#0A332F] text-white border-t border-seagreen-primary/25 relative overflow-hidden">
      {/* Soft emerald light diffusers */}
      <div className="pointer-events-none absolute top-1/4 -right-24 w-96 h-96 bg-seagreen-primary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -left-24 w-80 h-80 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Scale size={13} className="text-seagreen-gold" />
            <span>Critical Inquiry</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Ethical Boundaries</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            The Future Has Questions
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            Technology is never purely neutral. True progress requires confronting the hard paradoxes—privacy, systemic inequality, cognitive dependency, and ecological limits—before they harden into irreversible infrastructure.
          </p>
        </div>

        {/* 8 Expandable Dilemma Cards */}
        <div className="space-y-4">
          {ETHICAL_CHALLENGES.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-gradient-to-r from-[#124D46] to-[#0A332F] border-seagreen-gold/60 shadow-xl'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  data-cursor="hover"
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="font-mono text-xs font-bold text-seagreen-gold shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="editorial-serif font-bold text-base sm:text-lg text-white">
                          {item.title}
                        </h3>
                        <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-seagreen-primary/25 text-seagreen-seafoam font-semibold border border-seagreen-primary/30 hidden sm:inline-block">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-seagreen-seafoam/70 font-sans font-normal">
                        {item.question}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isExpanded
                        ? 'rotate-180 bg-seagreen-gold text-seagreen-dark shadow-sm'
                        : 'bg-white/10 text-seagreen-seafoam'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 pb-6 pt-2 border-t border-white/10 text-left font-sans"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Systemic Analysis */}
                        <div className="p-4 rounded-xl bg-black/25 border border-white/10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-seagreen-gold mb-2">
                            The Architectural Risk
                          </h4>
                          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                            {item.analysis}
                          </p>
                        </div>

                        {/* Proposed Countermeasure */}
                        <div className="p-4 rounded-xl bg-seagreen-primary/20 border border-seagreen-gold/40">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-seagreen-gold mb-2">
                            DigiVerse Design Countermeasure
                          </h4>
                          <p className="text-xs sm:text-sm text-seagreen-seafoam leading-relaxed font-semibold">
                            {item.countermeasure}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
