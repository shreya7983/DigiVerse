import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function CTA({ onDesignFuture, onExploreDigiverse }) {
  return (
    <section className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#082421] via-[#0B2E2A] to-[#061816] text-white border-t border-seagreen-primary/25 relative overflow-hidden text-center">
      {/* Luminous oceanic bloom */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-seagreen-primary/25 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 bg-seagreen-gold/15 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-seagreen-gold/40 shadow-gold text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold mb-8 backdrop-blur-xl">
          <Sparkles size={13} className="text-seagreen-gold" />
          <span>10 / Your Turn · The Manifesto</span>
        </div>

        <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance">
          The future isn't a destination.
          <span className="block mt-2">
            It's something we <span className="font-script-accent text-5xl sm:text-7xl md:text-8xl text-seagreen-gold font-normal tracking-normal lowercase -rotate-2 inline-block ml-1">design</span>.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-seagreen-seafoam/85 max-w-2xl mx-auto leading-relaxed font-sans font-normal mb-12">
          Technology provides the raw possibilities. Our human values, choices, and conscience determine where we go. Step forward and shape your digital horizon.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onDesignFuture}
            data-cursor="hover"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-seagreen-primary via-[#289A8C] to-seagreen-deep text-white font-sans font-bold text-sm sm:text-base flex items-center justify-center gap-3 hover:brightness-110 transition-all duration-300 shadow-seagreen border border-seagreen-gold/50 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span>Design Your Future (100 Pts)</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 text-seagreen-gold" />
          </button>

          <button
            onClick={onExploreDigiverse}
            data-cursor="hover"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 text-white font-sans font-medium text-sm sm:text-base flex items-center justify-center gap-2 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-subtle hover:-translate-y-0.5 backdrop-blur-xl"
          >
            <Compass size={18} className="text-seagreen-seafoam" />
            <span>Explore Future World</span>
          </button>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10 text-xs font-sans text-seagreen-seafoam/50 flex items-center justify-center gap-6 flex-wrap">
          <span>DigiVerse Speculative Intelligence 2040</span>
          <span>•</span>
          <span>Human-Centered Web Experience</span>
          <span>•</span>
          <span>Built for the Digital Future Competition</span>
        </div>
      </div>
    </section>
  );
}
