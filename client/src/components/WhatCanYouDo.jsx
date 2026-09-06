import React from 'react';
import { motion } from 'framer-motion';
import sound from '../utils/sound';
import { 
  Compass, 
  Clock, 
  Sliders, 
  Scale, 
  ArrowRight,
  Sparkles,
  Building2,
  Cpu,
  ShieldAlert,
  Sun
} from 'lucide-react';

export default function WhatCanYouDo({ onNavigate }) {
  const experiences = [
    {
      step: '01',
      action: 'EXPLORE',
      title: 'See the future before you live it.',
      desc: 'Explore homes, hospitals, schools, transportation and communities to see how emerging technology could change everyday life.',
      cta: 'EXPLORE THE FUTURE',
      target: 'world',
      accentColor: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'text-emerald-400',
      icon: Compass,
      visualHighlight: (
        <div className="relative w-full h-36 rounded-xl bg-black/40 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-seagreen-seafoam">
            <span>SPATIAL CITY MAP</span>
            <span className="text-emerald-400 font-bold">7 Zones Active</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-sans">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">🏠 Smart Home</div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">🏥 Hospital</div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">🏫 School</div>
          </div>
          <div className="text-[10px] font-mono text-seagreen-gold text-right">
            Interactive 3D Environments →
          </div>
        </div>
      )
    },
    {
      step: '02',
      action: 'EXPERIENCE',
      title: 'Step into a day in 2040.',
      desc: 'Experience a possible future through everyday situations instead of technical explanations.',
      cta: 'LIVE 2040',
      target: 'day-in-2040',
      accentColor: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      badgeColor: 'text-amber-300',
      icon: Clock,
      visualHighlight: (
        <div className="relative w-full h-36 rounded-xl bg-black/40 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-seagreen-seafoam">
            <span>CITIZEN CHRONOLOGY</span>
            <span className="text-amber-300 font-bold">07:00 → 21:00</span>
          </div>
          <div className="flex items-center justify-between gap-1 text-[10px] font-sans px-1">
            <span className="px-2 py-1 rounded bg-white/5">Home</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-white/5">Transit</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-white/5">Work</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-white/5">Plaza</span>
          </div>
          <div className="text-[10px] font-mono text-seagreen-gold text-right">
            6 Chapters of Daily Life →
          </div>
        </div>
      )
    },
    {
      step: '03',
      action: 'DESIGN',
      title: 'Build the future you want.',
      desc: 'Choose how much technology, sustainability, privacy, healthcare, education and human connection your future should have.',
      cta: 'DESIGN YOUR FUTURE',
      target: 'simulator',
      accentColor: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/30',
      badgeColor: 'text-cyan-400',
      icon: Sliders,
      visualHighlight: (
        <div className="relative w-full h-36 rounded-xl bg-black/40 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-seagreen-seafoam">
            <span>RESOURCE ALLOCATOR</span>
            <span className="text-cyan-300 font-bold">100 Points</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="w-3/4 h-full bg-cyan-400 rounded-full" />
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="w-1/2 h-full bg-emerald-400 rounded-full" />
            </div>
          </div>
          <div className="text-[10px] font-mono text-seagreen-gold text-right">
            Procedural 3D City Morphing →
          </div>
        </div>
      )
    },
    {
      step: '04',
      action: 'REFLECT',
      title: 'Every future has consequences.',
      desc: 'Discover the benefits, risks and ethical consequences of the future you designed.',
      cta: 'EXPLORE THE CONSEQUENCES',
      target: 'ethics',
      accentColor: 'from-rose-500/20 to-purple-500/10',
      borderColor: 'border-rose-500/30',
      badgeColor: 'text-rose-300',
      icon: Scale,
      visualHighlight: (
        <div className="relative w-full h-36 rounded-xl bg-black/40 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-seagreen-seafoam">
            <span>MORAL TRADE-OFFS</span>
            <span className="text-rose-300 font-bold">Benefit vs Risk</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
              ✅ Faster Efficiency
            </div>
            <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200">
              ⚠️ Privacy Boundary
            </div>
          </div>
          <div className="text-[10px] font-mono text-seagreen-gold text-right">
            3 High-Stakes Dilemmas →
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      id="what-can-you-do" 
      className="py-24 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-[#0E433E] via-[#0B3834] to-[#0A332F] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-seagreen-gold/30 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold mb-4">
            <Sparkles size={12} className="text-seagreen-gold" />
            <span>THE 4 IMMERSIVE PILLARS</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            What can you do in <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block ml-1">DigiVerse?</span>
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 font-sans max-w-2xl mx-auto leading-relaxed">
            DigiVerse is not a static tech blog. It is an interactive laboratory with four distinct ways to experience, question, and design tomorrow.
          </p>
        </div>

        {/* 4 Large Visual Experience Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#124D46]/80 via-[#0E3D38]/85 to-[#092925]/90 border ${item.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-xl flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-2xl font-bold text-white/40">
                        {item.step}
                      </span>
                      <span className="text-white/20 font-light">—</span>
                      <span className={`text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-white/5 ${item.badgeColor}`}>
                        {item.action}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-seagreen-gold transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-seagreen-seafoam/85 font-sans leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Visual Demonstration Highlight */}
                <div className="mb-6">
                  {item.visualHighlight}
                </div>

                {/* Call to Action Button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate?.(item.target);
                  }}
                  data-cursor="hover"
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between transition-all group-hover:border-seagreen-gold/50 group-hover:bg-gradient-to-r group-hover:from-seagreen-dark group-hover:to-seagreen-deep"
                >
                  <span>{item.cta}</span>
                  <ArrowRight size={15} className="text-seagreen-gold transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
