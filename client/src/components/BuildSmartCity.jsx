import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SMART_CITY_COMPONENTS } from '../data/futureData';
import sound from '../utils/sound';
import { 
  Building2, 
  Sparkles, 
  Check, 
  Plus, 
  RotateCcw, 
  Zap, 
  ShieldCheck, 
  Trees, 
  Activity, 
  Compass,
  ArrowRight
} from 'lucide-react';

export default function BuildSmartCity() {
  const [selectedIds, setSelectedIds] = useState(['housing', 'greenery', 'energy', 'transport']);

  const toggleComponent = (id) => {
    sound.playClick();
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 2) return prev; // keep at least 2
        return prev.filter(x => x !== id);
      } else {
        sound.playChime();
        return [...prev, id];
      }
    });
  };

  const resetSelection = () => {
    sound.playClick();
    setSelectedIds(['housing', 'greenery', 'energy', 'transport']);
  };

  // Calculate Aggregated Scores
  const metrics = useMemo(() => {
    const selected = SMART_CITY_COMPONENTS.filter(c => selectedIds.includes(c.id));
    let sustainability = 0;
    let efficiency = 0;
    let accessibility = 0;
    let innovation = 0;
    let wellbeing = 0;

    selected.forEach(c => {
      sustainability += c.scores.sustainability;
      efficiency += c.scores.efficiency;
      accessibility += c.scores.accessibility;
      innovation += c.scores.innovation;
      wellbeing += c.scores.wellbeing;
    });

    const count = Math.max(1, selected.length);
    // Normalize to 100
    const s = Math.min(100, Math.round((sustainability / (count * 24)) * 100));
    const e = Math.min(100, Math.round((efficiency / (count * 24)) * 100));
    const a = Math.min(100, Math.round((accessibility / (count * 24)) * 100));
    const inn = Math.min(100, Math.round((innovation / (count * 24)) * 100));
    const w = Math.min(100, Math.round((wellbeing / (count * 24)) * 100));
    const overall = Math.round((s + e + a + inn + w) / 5);

    return { s, e, a, inn, w, overall };
  }, [selectedIds]);

  return (
    <section 
      id="city-builder" 
      className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0C3E3A] via-[#0E433E] to-[#0A332F] text-white relative overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/3 -right-32 w-96 h-96 bg-seagreen-primary/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -left-32 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Building2 size={13} className="text-seagreen-gold" />
            <span>Civic Architecture Sandbox</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Interactive Builder</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            Build Your <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">smart city</span>
          </h2>

          <p className="text-base sm:text-xl text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            Assemble biophilic habitats, kinetic transit corridors, and decentralized geothermal energy into a living urban metabolism. Watch systemic scores dynamically calibrate.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Component Assembly Palette (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold">
                SELECTABLE INFRASTRUCTURE BLOCKS ({selectedIds.length} / {SMART_CITY_COMPONENTS.length} ACTIVE)
              </span>
              <button
                onClick={resetSelection}
                data-cursor="hover"
                className="flex items-center gap-1.5 text-xs text-seagreen-seafoam/70 hover:text-white transition-colors"
              >
                <RotateCcw size={13} />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SMART_CITY_COMPONENTS.map((comp) => {
                const isSelected = selectedIds.includes(comp.id);
                return (
                  <button
                    key={comp.id}
                    onClick={() => toggleComponent(comp.id)}
                    data-cursor="hover"
                    className={`p-4 rounded-2xl text-left border transition-all duration-300 relative group font-sans ${
                      isSelected
                        ? 'bg-gradient-to-br from-seagreen-dark/90 to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-0.5'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{comp.icon}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected 
                          ? 'bg-seagreen-gold border-seagreen-gold text-seagreen-deep' 
                          : 'border-white/20 text-transparent'
                      }`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-white mb-1">
                      {comp.name}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-seagreen-seafoam' : 'text-white/50'}`}>
                      {comp.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-seagreen-gold">
                      <span>LOAD CAPACITY</span>
                      <span>{comp.cost} GW/EQ</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Real-Time Urban Simulation Dashboard (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#124D46]/95 to-[#0A332F]/95 rounded-3xl p-6 sm:p-8 border border-seagreen-primary/40 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-seagreen-gold block">
                  METROPOLITAN VITALITY
                </span>
                <h3 className="editorial-serif text-2xl font-bold text-white">
                  Civic Synthesis Matrix
                </h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-seagreen-gold">
                  {metrics.overall}
                  <span className="text-xs text-white/50">/100</span>
                </div>
                <span className="text-[10px] font-mono text-seagreen-seafoam uppercase">
                  Composite Index
                </span>
              </div>
            </div>

            {/* Dynamic Visual City Map Indicator */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 mb-6 relative overflow-hidden">
              <div className="text-[10px] font-mono uppercase text-seagreen-seafoam/70 mb-3 flex items-center justify-between">
                <span>DISTRICT BLUEPRINT</span>
                <span className="flex items-center gap-1 text-seagreen-gold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Synchronized
                </span>
              </div>

              {/* Isometric grid representation */}
              <div className="grid grid-cols-4 gap-2 py-2">
                {SMART_CITY_COMPONENTS.map((comp) => {
                  const active = selectedIds.includes(comp.id);
                  return (
                    <motion.div
                      key={comp.id}
                      animate={{ scale: active ? 1 : 0.85, opacity: active ? 1 : 0.3 }}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        active 
                          ? 'bg-seagreen-primary/40 border-seagreen-gold text-white shadow-xs' 
                          : 'bg-white/5 border-white/5 text-white/40'
                      }`}
                    >
                      <span className="text-lg block mb-0.5">{comp.icon}</span>
                      <span className="text-[9px] font-mono block truncate">{comp.id}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Metric Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-sans mb-1.5">
                  <span className="text-seagreen-seafoam flex items-center gap-1.5">
                    <Trees size={12} className="text-seagreen-gold" /> Ecological Sustainability
                  </span>
                  <span className="font-mono font-bold text-white">{metrics.s}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-seagreen-primary to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.s}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans mb-1.5">
                  <span className="text-seagreen-seafoam flex items-center gap-1.5">
                    <Zap size={12} className="text-seagreen-gold" /> Kinetic Efficiency
                  </span>
                  <span className="font-mono font-bold text-white">{metrics.e}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-seagreen-dark to-seagreen-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.e}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans mb-1.5">
                  <span className="text-seagreen-seafoam flex items-center gap-1.5">
                    <Compass size={12} className="text-seagreen-gold" /> Universal Accessibility
                  </span>
                  <span className="font-mono font-bold text-white">{metrics.a}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-seagreen-primary to-seagreen-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.a}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans mb-1.5">
                  <span className="text-seagreen-seafoam flex items-center gap-1.5">
                    <Sparkles size={12} className="text-seagreen-gold" /> Technical Innovation
                  </span>
                  <span className="font-mono font-bold text-white">{metrics.inn}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-seagreen-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.inn}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans mb-1.5">
                  <span className="text-seagreen-seafoam flex items-center gap-1.5">
                    <Activity size={12} className="text-seagreen-gold" /> Human Wellbeing & Serenity
                  </span>
                  <span className="font-mono font-bold text-white">{metrics.w}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-seagreen-gold to-amber-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.w}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <a
                href="#simulator"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold hover:text-white transition-colors"
              >
                <span>Inject City Specs into Future Simulator</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
