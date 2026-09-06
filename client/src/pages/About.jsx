import React from 'react';
import { ArrowLeft, Feather, Compass, Heart, Shield } from 'lucide-react';

export default function About({ onReturnHome }) {
  return (
    <div className="pt-36 pb-24 px-6 sm:px-8 max-w-5xl mx-auto min-h-screen text-white font-sans">
      {/* Return Button */}
      <div className="mb-8">
        <button
          onClick={onReturnHome}
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-xs font-bold text-seagreen-seafoam hover:text-white transition-colors"
        >
          <ArrowLeft size={14} className="text-seagreen-gold" />
          <span>Return to Exhibition</span>
        </button>
      </div>

      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-3">
          <Feather size={13} className="text-seagreen-gold" />
          <span>Manifesto & Philosophy</span>
        </div>
        <h1 className="editorial-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
          The Philosophy of DigiVerse
        </h1>
        <p className="text-xl text-seagreen-seafoam/85 leading-relaxed font-sans font-normal">
          The future is not a predetermined destination waiting to happen to us. It is an intentional artifact of human imagination, ethical deliberation, and technological design.
        </p>
      </div>

      {/* Core Design Principles */}
      <div className="space-y-12 mb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#134D46]/90 to-[#0C3833]/95 border border-white/10 shadow-2xl backdrop-blur-xl">
          <h2 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mb-4">
            Luxury Craftsmanship + Oceanic Aesthetic + Calm Technology
          </h2>
          <p className="text-base text-white/80 leading-relaxed mb-6 font-sans">
            Too many visions of tomorrow default to dystopian tropes: blinding neon cyan and purple, aggressive holographic interfaces, and digital noise that overwhelms human serenity. DigiVerse departs decisively from this cliché.
          </p>
          <p className="text-base text-white/80 leading-relaxed font-sans">
            We embrace the richness of sea green, teal, and champagne gold, the quiet elegance of editorial serif typography, and the restorative power of unobtrusive computing. Technology should sit quietly in the periphery, serving human joy, restorative sleep, and living ecosystems.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#134D46]/85 to-[#0C3833]/95 border border-white/10 shadow-xl backdrop-blur-xl">
            <Heart size={20} className="text-seagreen-gold mb-3" />
            <h3 className="editorial-serif font-bold text-lg text-white mb-2">Human Centered</h3>
            <p className="text-xs sm:text-sm text-seagreen-seafoam/80 leading-relaxed font-sans">
              Every interface, algorithm, and urban sensor must protect psychological sovereignty, deep focus, and face-to-face warmth.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#134D46]/85 to-[#0C3833]/95 border border-white/10 shadow-xl backdrop-blur-xl">
            <Shield size={20} className="text-seagreen-gold mb-3" />
            <h3 className="editorial-serif font-bold text-lg text-white mb-2">Ethically Anchored</h3>
            <p className="text-xs sm:text-sm text-seagreen-seafoam/80 leading-relaxed font-sans">
              Privacy, algorithmic provenance, and cognitive neuro-rights must be architectural defaults rather than retrofitted compliance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#134D46]/85 to-[#0C3833]/95 border border-white/10 shadow-xl backdrop-blur-xl">
            <Compass size={20} className="text-seagreen-gold mb-3" />
            <h3 className="editorial-serif font-bold text-lg text-white mb-2">Planetary Regeneration</h3>
            <p className="text-xs sm:text-sm text-seagreen-seafoam/80 leading-relaxed font-sans">
              Digital technology cannot thrive on an exhausted planet. Computing must operate within closed loops and heal the biosphere.
            </p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border border-seagreen-gold/40 shadow-gold text-center">
        <blockquote className="editorial-serif text-xl sm:text-3xl italic text-white max-w-2xl mx-auto mb-4">
          “The best way to predict the future is to design it with love, restraint, and reverence for the human spirit.”
        </blockquote>
        <span className="text-xs uppercase tracking-widest font-sans font-bold text-seagreen-gold">
          The DigiVerse Collective · 2026
        </span>
      </div>
    </div>
  );
}
