import React from 'react';
import { motion } from 'framer-motion';
import sound from '../utils/sound';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  X, 
  Globe, 
  Lightbulb, 
  Flame 
} from 'lucide-react';

export default function WhyDigiverse({ onDesignFuture }) {
  const comparisons = [
    {
      normal: 'Read about the future.',
      digiverse: 'Experience the future.',
      highlight: true
    },
    {
      normal: 'Technology is explained abstractly.',
      digiverse: 'Technology is experienced through everyday life.',
      highlight: false
    },
    {
      normal: 'You passively consume information.',
      digiverse: 'You make decisions and shape the outcome.',
      highlight: false
    },
    {
      normal: 'You leave with generic articles.',
      digiverse: 'You leave with your own 3D Future Profile & archetype.',
      highlight: true
    }
  ];

  return (
    <section 
      id="why-digiverse"
      className="py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0D3F3B] to-[#0A332F] text-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-seagreen-gold/30 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold mb-4">
            <Lightbulb size={12} className="text-seagreen-gold" />
            <span>THE PURPOSE</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Why does DigiVerse <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block ml-1">exist?</span>
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/30 border border-white/10 text-base sm:text-xl text-white/95 font-serif italic leading-relaxed max-w-2xl mx-auto mb-6 shadow-xl">
            “Technology is changing how we live, work, learn, travel and connect. But most people experience these changes as headlines, technical concepts, or distant predictions.”
          </div>

          <p className="text-base sm:text-lg text-seagreen-seafoam/90 font-sans max-w-2xl mx-auto leading-relaxed">
            DigiVerse turns those distant ideas into something you can actually explore.
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 text-xs sm:text-sm font-mono font-bold text-seagreen-gold uppercase tracking-wider flex-wrap">
            <span>See it.</span>
            <span>•</span>
            <span>Experience it.</span>
            <span>•</span>
            <span>Question it.</span>
            <span>•</span>
            <span>Design it.</span>
          </div>
        </div>

        {/* Comparison: Normal Technology Website vs DigiVerse */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#124D46]/90 via-[#0E3D38]/90 to-[#072421] border border-seagreen-gold/40 shadow-2xl backdrop-blur-xl mb-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold block mb-1">
              THE SHIFT IN PARADIGM
            </span>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white">
              How DigiVerse is fundamentally different
            </h3>
          </div>

          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-white/15 text-xs font-mono font-bold uppercase tracking-wider">
              <div className="text-white/40 flex items-center gap-2">
                <X size={14} className="text-rose-400" />
                <span>Normal Technology Website</span>
              </div>
              <div className="text-seagreen-gold flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>The DigiVerse Platform</span>
              </div>
            </div>

            {/* Comparison Rows */}
            {comparisons.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
                  c.highlight 
                    ? 'bg-black/35 border-seagreen-gold/40 shadow-xs' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-white/60 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span>{c.normal}</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-white font-sans font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className={c.highlight ? 'text-seagreen-gold font-bold' : 'text-white'}>
                    {c.digiverse}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-seagreen-seafoam/70 font-sans text-center sm:text-left">
              The future isn't a destination. It's something we design.
            </span>

            <button
              onClick={() => {
                sound.playClick();
                onDesignFuture?.();
              }}
              data-cursor="hover"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-seagreen-primary via-seagreen-secondary to-seagreen-primary text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 transition-all border border-seagreen-gold/40 shadow-seagreen"
            >
              <span>DESIGN YOUR FUTURE NOW</span>
              <ArrowRight size={14} className="text-seagreen-gold" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
