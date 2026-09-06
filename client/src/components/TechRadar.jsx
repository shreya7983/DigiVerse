import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_RADAR_ITEMS } from '../data/futureData';
import { Radar, Filter, Sparkles, Check, ChevronRight, Info } from 'lucide-react';
import { sound } from '../utils/sound';

export default function TechRadar() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(TECH_RADAR_ITEMS[0]);

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'ai', label: 'AI & Neural' },
    { id: 'quantum', label: 'Quantum' },
    { id: 'biotech', label: 'Biotechnology' },
    { id: 'energy', label: 'Clean Energy' },
    { id: 'autonomous', label: 'Autonomous' },
    { id: 'spatial', label: 'Spatial AR/VR' },
    { id: 'robotics', label: 'Robotics' },
  ];

  const rings = [
    { id: 'transformative', label: 'Transformative', radiusPercent: 24, desc: 'Highest disruptive leverage' },
    { id: 'mainstream', label: 'Mainstream 2030', radiusPercent: 48, desc: 'Scaling widespread adoption' },
    { id: 'growing', label: 'Growing 2035', radiusPercent: 72, desc: 'Proven pilot breakthroughs' },
    { id: 'emerging', label: 'Emerging 2040', radiusPercent: 96, desc: 'Early frontier research' },
  ];

  const filteredItems = activeCategory === 'all'
    ? TECH_RADAR_ITEMS
    : TECH_RADAR_ITEMS.filter((t) => t.category === activeCategory);

  const handleSelectTech = (item) => {
    sound.playClick();
    setSelectedItem(item);
  };

  return (
    <section id="radar" className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0E433E] via-[#092B28] to-[#0E433E] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
              <Radar size={13} className="text-seagreen-gold" />
              <span>Horizon Radar Telemetry</span>
              <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
              <span className="text-seagreen-gold">Maturity Trajectories</span>
            </div>
            <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06]">
              Future Technology <span className="font-script-accent text-4xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">radar</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-seagreen-seafoam/80 max-w-md leading-relaxed font-sans font-normal">
            Mapping 21 foundational technologies across four horizons of systemic maturity. Click any blip to inspect technical readiness, category, and societal impact.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-white/10 mb-10">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                data-cursor="hover"
                className={`px-4 py-2 rounded-full text-xs font-sans font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border border-seagreen-gold shadow-seagreen'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Radar & Inspector Dual View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Visualization Screen */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-b from-[#0D443F] to-[#06201E] border-2 border-seagreen-primary/40 shadow-2xl p-4 flex items-center justify-center overflow-hidden">
              {/* Concentric Radar Rings */}
              {rings.map((ring) => (
                <div
                  key={ring.id}
                  style={{ width: `${ring.radiusPercent}%`, height: `${ring.radiusPercent}%` }}
                  className="absolute rounded-full border border-seagreen-primary/25 pointer-events-none flex items-start justify-center pt-1"
                >
                  <span className="text-[9px] font-mono uppercase tracking-widest text-seagreen-seafoam/50 hidden sm:inline-block">
                    {ring.label}
                  </span>
                </div>
              ))}

              {/* Crosshair Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-seagreen-primary/20" />
                <div className="h-full w-[1px] bg-seagreen-primary/20 absolute" />
                <div className="w-full h-[1px] bg-seagreen-primary/10 rotate-45" />
                <div className="w-full h-[1px] bg-seagreen-primary/10 -rotate-45" />
              </div>

              {/* Sweeping Radar Scanner Line */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-1/2 h-1/2 ml-auto origin-bottom-left bg-gradient-to-tl from-seagreen-primary/30 to-transparent" />
              </motion.div>

              {/* Central Core Bullseye */}
              <div className="w-6 h-6 rounded-full bg-seagreen-gold/30 border border-seagreen-gold flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-seagreen-gold animate-ping" />
              </div>

              {/* Blip Nodes */}
              {filteredItems.map((item, idx) => {
                // Compute radial position based on ring and index
                const ringConfig = {
                  transformative: 0.18,
                  mainstream: 0.38,
                  growing: 0.62,
                  emerging: 0.85
                };
                const radiusFactor = ringConfig[item.ring] || 0.5;
                const angle = (idx * (360 / Math.max(1, filteredItems.length)) + 25) * (Math.PI / 180);
                const x = 50 + (radiusFactor * 45 * Math.cos(angle));
                const y = 50 + (radiusFactor * 45 * Math.sin(angle));
                const isSelected = selectedItem?.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTech(item)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    data-cursor="hover"
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none"
                    title={item.name}
                  >
                    <div className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-seagreen-gold scale-125 ring-4 ring-seagreen-gold/40'
                        : 'bg-seagreen-primary hover:scale-125 hover:bg-seagreen-seafoam'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-seagreen-dark" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inspector Panel for Selected Technology */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedItem && (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#124D46]/95 to-[#0A332F]/95 border border-seagreen-primary/40 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="font-mono text-xs font-bold text-seagreen-gold uppercase tracking-wider">
                      RADAR TARGET: {selectedItem.ring.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-seagreen-primary/20 text-seagreen-seafoam border border-seagreen-primary/30">
                      Readiness {selectedItem.readiness}%
                    </span>
                  </div>

                  <h3 className="editorial-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    {selectedItem.name}
                  </h3>

                  <div className="text-xs font-mono font-semibold text-seagreen-seafoam uppercase tracking-wider mb-4">
                    CATEGORY: {selectedItem.category.toUpperCase()}
                  </div>

                  <p className="text-sm text-white/85 leading-relaxed font-sans mb-6">
                    {selectedItem.desc}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-1.5">
                      <Sparkles size={14} className="text-seagreen-gold" />
                      <span>Maturity Horizon</span>
                    </div>
                    <p className="text-xs text-seagreen-seafoam/80 font-sans">
                      Categorized under the <span className="text-white font-semibold">{selectedItem.ring}</span> tier with estimated deployment readiness benchmark of <span className="text-seagreen-gold font-bold">{selectedItem.readiness}%</span>.
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-white/50 flex items-center gap-2">
                    <Info size={13} className="text-seagreen-gold shrink-0" />
                    <span>Cross-referenced against global IEEE & Nature speculative projections.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
