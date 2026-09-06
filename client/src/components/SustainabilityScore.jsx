import React from 'react';
import { motion } from 'framer-motion';
import { SUSTAINABILITY_METRICS } from '../data/futureData';
import sound from '../utils/sound';
import { 
  Leaf, 
  Sparkles, 
  Globe, 
  Droplets, 
  Zap, 
  Recycle, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function SustainabilityScore() {
  const { overallScore, grade, motto, indicators } = SUSTAINABILITY_METRICS;

  const getIndicatorIcon = (name) => {
    if (name.includes('Energy')) return <Zap size={18} className="text-seagreen-gold" />;
    if (name.includes('Carbon')) return <Leaf size={18} className="text-emerald-400" />;
    if (name.includes('Circular')) return <Recycle size={18} className="text-seagreen-gold" />;
    if (name.includes('Freshwater')) return <Droplets size={18} className="text-cyan-400" />;
    return <Sparkles size={18} className="text-seagreen-gold" />;
  };

  return (
    <section 
      id="sustainability" 
      className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0E433E] to-[#0C3E3A] text-white relative overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/4 -left-28 w-96 h-96 bg-seagreen-primary/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -right-28 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Leaf size={13} className="text-seagreen-gold" />
            <span>Biosphere Equilibrium</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Planetary Metrics</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            The Sustainability <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">scorecard</span>
          </h2>

          <p className="text-base sm:text-xl text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            Computing cannot thrive on a degraded Earth. Discover how 2040 digital infrastructure actively sequesters carbon, recycles closed-loop silicon, and restores freshwater basins.
          </p>
        </div>

        {/* Hero Composite Score Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#124D46]/90 to-[#0A332F]/95 border border-seagreen-gold/40 shadow-2xl backdrop-blur-xl mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Score Ring */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#C8A96B"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 42}
                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 42) * (1 - overallScore / 100) }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-mono font-bold text-white">{overallScore}</span>
                  <span className="text-xs text-seagreen-gold font-semibold uppercase">/ 100 Index</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={13} /> {grade}
              </span>
            </div>

            {/* Narrative Context */}
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seagreen-primary/20 text-xs font-mono font-bold text-seagreen-gold mb-3 border border-seagreen-gold/30">
                <Globe size={13} />
                <span>PLANETARY TELEMETRY STATUS: BALANCED</span>
              </div>
              <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                Restorative Silicon & Closed-Loop Energy
              </h3>
              <p className="text-sm sm:text-base text-seagreen-seafoam/90 leading-relaxed font-sans font-normal mb-4">
                "{motto}"
              </p>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                By retrofitting data facilities into municipal greenhouse heaters and replacing toxic halogenated flame retardants with mycelium circuit boards, 2040 demonstrates that computational scale does not require biospheric devastation.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Indicator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((ind, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-seagreen-gold/40 transition-all duration-300 font-sans group shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {getIndicatorIcon(ind.name)}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp size={11} />
                  <span>{ind.trend}</span>
                </div>
              </div>

              <h4 className="font-bold text-base text-white mb-1">
                {ind.name}
              </h4>
              <p className="text-xs text-seagreen-seafoam/70 leading-relaxed mb-4">
                {ind.desc}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-white/50">PERFORMANCE</span>
                <span className="font-mono text-lg font-bold text-seagreen-gold">
                  {ind.score} {ind.unit}
                </span>
              </div>
            </div>
          ))}

          {/* Quick link back to simulator */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-seagreen-dark to-seagreen-deep border border-seagreen-gold/40 flex flex-col justify-between shadow-seagreen">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-seagreen-gold block mb-2">
                YOUR SIMULATION
              </span>
              <h4 className="editorial-serif text-xl font-bold text-white mb-2">
                Shape Planetary Priorities
              </h4>
              <p className="text-xs text-seagreen-seafoam leading-relaxed font-sans">
                Adjust the biospheric restoration lever in the 7-step simulator to observe your own ecological contribution.
              </p>
            </div>

            <a
              href="#simulator"
              onClick={() => sound.playClick()}
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold hover:text-white transition-colors"
            >
              <span>Go to Future Simulator</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
