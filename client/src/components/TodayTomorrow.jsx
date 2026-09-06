import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TODAY_TOMORROW_ITEMS } from '../data/futureData';
import sound from '../utils/sound';
import { 
  ArrowRight, 
  ArrowLeftRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  ChevronRight 
} from 'lucide-react';

export default function TodayTomorrow() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 split
  const [mode, setMode] = useState('split'); // 'split' | 'side-by-side'

  const currentItem = TODAY_TOMORROW_ITEMS[activeTab];

  const handleTabChange = (idx) => {
    sound.playClick();
    setActiveTab(idx);
  };

  return (
    <section 
      id="transformation" 
      className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0E433E] to-[#0C3E3A] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 bg-seagreen-primary/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <ArrowLeftRight size={13} className="text-seagreen-gold" />
            <span>The Paradigm Shift</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">2026 vs 2040</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            Today’s Friction, <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">tomorrow’s</span> Harmony
          </h2>

          <p className="text-base sm:text-xl text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            Technology is not merely accumulating speed; it is fundamentally redefining systemic relationships. Compare contemporary friction with the regenerative possibilities of 2040.
          </p>
        </div>

        {/* Domain Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {TODAY_TOMORROW_ITEMS.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(idx)}
                data-cursor="hover"
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-0.5'
                    : 'bg-white/5 border-white/10 text-seagreen-seafoam/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.domain}
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#124D46]/90 to-[#0A332F]/95 border border-seagreen-primary/30 shadow-2xl backdrop-blur-xl"
          >
            {/* Contrast Highlight Banner */}
            <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Sparkles size={16} className="text-seagreen-gold" />
                <span className="font-serif italic text-base sm:text-lg text-seagreen-gold">
                  "{currentItem.contrastHighlight}"
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { sound.playClick(); setMode('split'); }}
                  data-cursor="hover"
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    mode === 'split' ? 'bg-seagreen-gold text-seagreen-deep' : 'bg-white/10 text-white/70'
                  }`}
                >
                  Split Slider
                </button>
                <button
                  onClick={() => { sound.playClick(); setMode('side-by-side'); }}
                  data-cursor="hover"
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    mode === 'side-by-side' ? 'bg-seagreen-gold text-seagreen-deep' : 'bg-white/10 text-white/70'
                  }`}
                >
                  Dual View
                </button>
              </div>
            </div>

            {mode === 'split' ? (
              /* Split Comparison View with interactive slider scrubber */
              <div>
                <div className="mb-4 flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-seagreen-seafoam">
                  <span className="text-amber-300 flex items-center gap-1.5">
                    <AlertCircle size={14} /> 2026 Today ({100 - sliderPos}%)
                  </span>
                  <span className="text-seagreen-gold flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> 2040 Tomorrow ({sliderPos}%)
                  </span>
                </div>

                <div className="relative mb-6">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={sliderPos}
                    onChange={(e) => {
                      setSliderPos(Number(e.target.value));
                    }}
                    data-cursor="hover"
                    className="w-full h-2.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-seagreen-gold border border-white/10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Today Card */}
                  <div 
                    className="p-6 rounded-2xl bg-black/30 border border-amber-500/20 transition-all"
                    style={{ opacity: 0.3 + ((100 - sliderPos) / 100) * 0.7 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono font-bold mb-3 border border-amber-500/30">
                      <span>STATUS QUO — 2026</span>
                    </div>
                    <h4 className="editorial-serif text-xl sm:text-2xl font-bold text-white mb-2">
                      {currentItem.todayTitle}
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed mb-6 font-sans">
                      {currentItem.todayDesc}
                    </p>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-amber-300/90">
                      <span>METRIC BURDEN</span>
                      <span className="font-bold">{currentItem.todayMetrics}</span>
                    </div>
                  </div>

                  {/* Tomorrow Card */}
                  <div 
                    className="p-6 rounded-2xl bg-gradient-to-br from-seagreen-dark/60 to-seagreen-deep/80 border border-seagreen-gold/40 transition-all shadow-seagreen"
                    style={{ opacity: 0.3 + (sliderPos / 100) * 0.7 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seagreen-primary/30 text-seagreen-gold text-xs font-mono font-bold mb-3 border border-seagreen-gold/40">
                      <span>SPECULATIVE SYNTHESIS — 2040</span>
                    </div>
                    <h4 className="editorial-serif text-xl sm:text-2xl font-bold text-white mb-2">
                      {currentItem.tomorrowTitle}
                    </h4>
                    <p className="text-sm text-seagreen-seafoam/90 leading-relaxed mb-6 font-sans">
                      {currentItem.tomorrowDesc}
                    </p>
                    <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono text-seagreen-gold">
                      <span>REGENERATIVE YIELD</span>
                      <span className="font-bold">{currentItem.tomorrowMetrics}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Side by Side Dual View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-black/30 border border-amber-500/20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono font-bold mb-4 border border-amber-500/30">
                    <span>STATUS QUO — 2026</span>
                  </div>
                  <h4 className="editorial-serif text-2xl font-bold text-white mb-3">
                    {currentItem.todayTitle}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed mb-6 font-sans">
                    {currentItem.todayDesc}
                  </p>
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs font-mono text-amber-300">
                    <span className="text-white/50 block mb-1">MEASURED INEFFICIENCY</span>
                    <span className="font-bold">{currentItem.todayMetrics}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-seagreen-dark/80 to-seagreen-deep border border-seagreen-gold/50 shadow-seagreen">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seagreen-primary/40 text-seagreen-gold text-xs font-mono font-bold mb-4 border border-seagreen-gold/50">
                    <span>SPECULATIVE HARMONY — 2040</span>
                  </div>
                  <h4 className="editorial-serif text-2xl font-bold text-white mb-3">
                    {currentItem.tomorrowTitle}
                  </h4>
                  <p className="text-sm text-seagreen-seafoam leading-relaxed mb-6 font-sans">
                    {currentItem.tomorrowDesc}
                  </p>
                  <div className="p-4 rounded-xl bg-seagreen-gold/10 border border-seagreen-gold/30 text-xs font-mono text-seagreen-gold">
                    <span className="text-white/50 block mb-1">HARMONIC IMPACT</span>
                    <span className="font-bold">{currentItem.tomorrowMetrics}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
