import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FUTURE_WORLD_ZONES } from '../data/futureData';
import { Globe, X, Sparkles, CheckCircle2, AlertTriangle, Layers, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function FutureWorldExplorer() {
  const [activeZone, setActiveZone] = useState(FUTURE_WORLD_ZONES[0]);
  const [inspecting, setInspecting] = useState(false);

  const handleSelectZone = (zone) => {
    sound.playClick();
    setActiveZone(zone);
    setInspecting(true);
  };

  return (
    <section id="world" className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0E433E] via-[#0A3833] to-[#0E433E] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
              <Globe size={13} className="text-seagreen-gold" />
              <span>Interactive Spatial Ecosystem</span>
              <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
              <span className="text-seagreen-gold">Future World 2040</span>
            </div>
            <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06]">
              Explore the <span className="font-script-accent text-4xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">world</span> of tomorrow
            </h2>
          </div>
          <p className="text-sm sm:text-base text-seagreen-seafoam/80 max-w-md leading-relaxed font-sans font-normal">
            Interact with the 7 critical interconnected sectors of the 2040 biophilic metropolis. Click any node to inspect its architectural framework, technologies, and civic challenges.
          </p>
        </div>

        {/* Spatial Interactive Habitat Canvas */}
        <div className="relative rounded-3xl p-6 sm:p-12 min-h-[520px] bg-gradient-to-br from-[#0D443F]/90 to-[#072825]/95 border border-seagreen-primary/35 shadow-2xl backdrop-blur-xl overflow-hidden mb-8">
          {/* Schematic Architectural Grid Overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="world-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="1.5" fill="#D8F0EA" />
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2F8F83" strokeWidth="0.5" strokeDasharray="4 4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#world-grid-pattern)" />
            </svg>
          </div>

          {/* Connected Network Filaments */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 22 35 Q 45 22 48 48 T 74 28 T 80 65 T 52 78 T 26 70 Z"
              fill="none"
              stroke="#2F8F83"
              strokeWidth="0.4"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <line x1="48" y1="48" x2="22" y2="35" stroke="#C8A96B" strokeWidth="0.3" strokeDasharray="1 1" />
            <line x1="48" y1="48" x2="74" y2="28" stroke="#C8A96B" strokeWidth="0.3" strokeDasharray="1 1" />
            <line x1="48" y1="48" x2="80" y2="65" stroke="#C8A96B" strokeWidth="0.3" strokeDasharray="1 1" />
            <line x1="48" y1="48" x2="52" y2="78" stroke="#C8A96B" strokeWidth="0.3" strokeDasharray="1 1" />
            <line x1="48" y1="48" x2="45" y2="22" stroke="#C8A96B" strokeWidth="0.3" strokeDasharray="1 1" />
            <line x1="48" y1="48" x2="26" y2="70" stroke="#C8A96B" strokeWidth="0.3" strokeDasharray="1 1" />
          </svg>

          {/* Interactive Clickable Nodes */}
          <div className="relative w-full h-[400px] sm:h-[480px]">
            {FUTURE_WORLD_ZONES.map((zone) => {
              const isSelected = activeZone.id === zone.id;
              return (
                <div
                  key={zone.id}
                  style={{ top: `${zone.coordinate.y}%`, left: `${zone.coordinate.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => handleSelectZone(zone)}
                    data-cursor="hover"
                    className="group relative flex flex-col items-center focus:outline-none"
                  >
                    {/* Pulsing Aura */}
                    <div className={`absolute -inset-3 rounded-full transition-all duration-500 ${
                      isSelected ? 'bg-seagreen-gold/30 blur-md scale-125 animate-pulse' : 'group-hover:bg-seagreen-primary/20 blur-sm'
                    }`} />

                    {/* Node Capsule */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 shadow-xl border ${
                      isSelected
                        ? 'bg-gradient-to-br from-seagreen-dark to-seagreen-deep border-seagreen-gold scale-110 shadow-gold'
                        : 'bg-gradient-to-br from-[#124D46] to-[#0A332F] border-white/20 group-hover:border-seagreen-gold/60 group-hover:scale-105'
                    }`}>
                      <span>{zone.icon}</span>
                    </div>

                    {/* Node Label Badge */}
                    <div className={`mt-2 px-3 py-1 rounded-full text-[11px] font-sans font-bold whitespace-nowrap transition-all duration-300 border ${
                      isSelected
                        ? 'bg-seagreen-gold text-seagreen-dark border-seagreen-gold font-extrabold shadow-sm'
                        : 'bg-black/60 text-white/90 border-white/10 group-hover:bg-white/15'
                    }`}>
                      {zone.name.split(' ')[0]} {zone.name.split(' ')[1] || ''}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Instruction Overlay */}
          <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2 text-xs font-mono text-seagreen-seafoam/70 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-seagreen-gold animate-ping" />
            <span>Click any habitat node to inspect technologies & systemic impacts</span>
          </div>
        </div>

        {/* Selected Zone Deep-Dive Information Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#124D46]/95 to-[#0A332F]/98 border border-seagreen-primary/40 shadow-2xl backdrop-blur-xl relative"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b border-white/10 gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-seagreen-gold uppercase mb-1">
                  <span>{activeZone.category}</span>
                  <span>·</span>
                  <span>SECTOR OBSERVATORY</span>
                </div>
                <h3 className="editorial-serif text-2xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                  <span>{activeZone.icon}</span>
                  <span>{activeZone.name}</span>
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-serif italic text-seagreen-gold max-w-sm">
                "{activeZone.tagline}"
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-sans mb-8 max-w-4xl">
              {activeZone.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Key Technologies */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-seagreen-gold mb-3 font-sans">
                  <Layers size={14} className="text-seagreen-gold" />
                  <span>Foundational Technologies</span>
                </div>
                <ul className="space-y-2">
                  {activeZone.keyTechnologies.map((tech, idx) => (
                    <li key={idx} className="text-xs text-white/80 flex items-start gap-2 font-sans">
                      <span className="text-seagreen-gold font-bold">•</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-seagreen-seafoam mb-3 font-sans">
                  <CheckCircle2 size={14} className="text-seagreen-primary" />
                  <span>Systemic Human Benefits</span>
                </div>
                <ul className="space-y-2">
                  {activeZone.benefits.map((b, idx) => (
                    <li key={idx} className="text-xs text-white/80 flex items-start gap-2 font-sans">
                      <span className="text-seagreen-primary font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 font-sans">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <span>Ethical & Civic Dilemmas</span>
                </div>
                <ul className="space-y-2">
                  {activeZone.challenges.map((c, idx) => (
                    <li key={idx} className="text-xs text-white/80 flex items-start gap-2 font-sans">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
