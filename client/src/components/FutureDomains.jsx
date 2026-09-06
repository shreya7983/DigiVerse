import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOMAINS } from '../data/futureData';
import { ArrowUpRight, X, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

// Bespoke Architectural Line-Art Illustrations with Sea-Green & Gold Radiance
const DomainGraphic = ({ id }) => {
  if (id === 'ai') {
    return (
      <svg className="w-full h-36 stroke-current transition-transform duration-700 group-hover:scale-105" viewBox="0 0 240 120" fill="none">
        <circle cx="120" cy="60" r="40" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="120" cy="60" r="24" strokeWidth="1.5" />
        <circle cx="70" cy="40" r="6" strokeWidth="1.2" />
        <circle cx="170" cy="40" r="6" strokeWidth="1.2" />
        <circle cx="65" cy="80" r="4" strokeWidth="1.2" />
        <circle cx="175" cy="80" r="4" strokeWidth="1.2" />
        <line x1="76" y1="42" x2="100" y2="52" strokeWidth="1" />
        <line x1="164" y1="42" x2="140" y2="52" strokeWidth="1" />
        <line x1="69" y1="80" x2="100" y2="68" strokeWidth="1" />
        <line x1="171" y1="80" x2="140" y2="68" strokeWidth="1" />
        <circle cx="120" cy="60" r="6" fill="#C8A96B" />
      </svg>
    );
  }
  if (id === 'cities') {
    return (
      <svg className="w-full h-36 stroke-current transition-transform duration-700 group-hover:scale-105" viewBox="0 0 240 120" fill="none">
        <rect x="40" y="45" width="28" height="55" rx="4" strokeWidth="1.2" />
        <rect x="76" y="25" width="34" height="75" rx="6" strokeWidth="1.2" />
        <rect x="118" y="38" width="42" height="62" rx="6" strokeWidth="1.2" />
        <rect x="168" y="55" width="30" height="45" rx="4" strokeWidth="1.2" />
        <path d="M 20 100 Q 120 75 220 100" strokeWidth="1.5" />
        <circle cx="139" cy="88" r="4" strokeWidth="1" fill="#C8A96B" />
        <circle cx="93" cy="84" r="4" strokeWidth="1" fill="#C8A96B" />
      </svg>
    );
  }
  if (id === 'healthcare') {
    return (
      <svg className="w-full h-36 stroke-current transition-transform duration-700 group-hover:scale-105" viewBox="0 0 240 120" fill="none">
        <path d="M 50 60 Q 85 25 120 60 T 190 60" strokeWidth="1.5" />
        <path d="M 50 60 Q 85 95 120 60 T 190 60" strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="85" cy="42" r="5" strokeWidth="1.2" />
        <circle cx="155" cy="42" r="5" strokeWidth="1.2" />
        <circle cx="120" cy="60" r="8" strokeWidth="1.5" />
        <line x1="85" y1="47" x2="85" y2="73" strokeWidth="1" />
        <line x1="155" y1="47" x2="155" y2="73" strokeWidth="1" />
        <circle cx="120" cy="60" r="4" fill="#C8A96B" />
      </svg>
    );
  }
  if (id === 'education') {
    return (
      <svg className="w-full h-36 stroke-current transition-transform duration-700 group-hover:scale-105" viewBox="0 0 240 120" fill="none">
        <polygon points="120,25 190,55 120,85 50,55" strokeWidth="1.4" />
        <path d="M 70 65 V 88 Q 120 110 170 88 V 65" strokeWidth="1.2" />
        <line x1="185" y1="58" x2="185" y2="92" strokeWidth="1.5" />
        <circle cx="185" cy="94" r="4" strokeWidth="1" fill="#C8A96B" />
      </svg>
    );
  }
  if (id === 'sustainability') {
    return (
      <svg className="w-full h-36 stroke-current transition-transform duration-700 group-hover:scale-105" viewBox="0 0 240 120" fill="none">
        <path d="M 120 30 C 80 30 65 70 85 90 C 105 110 155 100 155 70 C 155 40 135 30 120 30 Z" strokeWidth="1.4" />
        <path d="M 95 85 Q 120 65 140 45" strokeWidth="1.2" />
        <path d="M 115 65 Q 130 68 135 78" strokeWidth="1" />
        <circle cx="120" cy="30" r="4" fill="#C8A96B" />
      </svg>
    );
  }
  return (
    <svg className="w-full h-36 stroke-current transition-transform duration-700 group-hover:scale-105" viewBox="0 0 240 120" fill="none">
      <circle cx="95" cy="60" r="28" strokeWidth="1.3" />
      <circle cx="145" cy="60" r="28" strokeWidth="1.3" />
      <circle cx="95" cy="60" r="4" strokeWidth="1.2" fill="#C8A96B" />
      <circle cx="145" cy="60" r="4" strokeWidth="1.2" fill="#C8A96B" />
      <path d="M 120 40 V 80" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  );
};

export default function FutureDomains() {
  const [selectedDomain, setSelectedDomain] = useState(null);

  return (
    <section id="explore" className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0E433E] via-[#0A3833] to-[#0E433E] text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
              <span>Domain Architecture</span>
              <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
              <span className="text-seagreen-gold">Systemic Convergence</span>
            </div>
            <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06]">
              Six Directions.
              <span className="block font-normal text-seagreen-seafoam italic">One Unified Future.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-seagreen-seafoam/80 max-w-md leading-relaxed font-sans font-normal">
            True transformation occurs at the intersection of these six domains. Select any area to inspect its architectural readiness, ethical challenges, and living pilot initiatives.
          </p>
        </div>

        {/* 6 Tactile Immersive Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DOMAINS.map((domain, index) => {
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => setSelectedDomain(domain)}
                data-cursor="card"
                className="group cursor-pointer rounded-3xl p-8 bg-gradient-to-b from-[#134D46]/85 to-[#0C3833]/95 border border-white/10 hover:border-seagreen-gold/50 shadow-xl hover:shadow-[0_12px_32px_rgba(47,143,131,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[440px] relative overflow-hidden backdrop-blur-xl"
              >
                {/* Sea-Green Hover Overlay Glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-seagreen-primary/0 via-seagreen-primary/10 to-seagreen-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold tracking-widest text-seagreen-gold group-hover:text-white transition-colors">
                      {domain.number}
                    </span>
                    <span className="text-[10px] font-sans font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-seagreen-primary/25 text-seagreen-seafoam border border-seagreen-primary/30">
                      {domain.stats.timeline}
                    </span>
                  </div>

                  {/* Architectural SVG Line Graphic */}
                  <div className="my-3 py-2 text-seagreen-seafoam group-hover:text-seagreen-gold transition-colors">
                    <DomainGraphic id={domain.id} />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="editorial-serif text-2xl font-bold tracking-tight text-white mb-1.5 transition-colors group-hover:text-seagreen-gold">
                    {domain.title}
                  </h3>
                  <div className="text-xs font-sans font-bold uppercase tracking-wider text-seagreen-seafoam/75 mb-3">
                    {domain.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans font-normal mb-6 line-clamp-3">
                    {domain.description}
                  </p>
                </div>

                {/* Bottom Footer Action */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-seagreen-primary group-hover:bg-seagreen-gold transition-colors" />
                    <span className="text-xs text-white/60 font-medium font-sans">
                      Readiness {domain.stats.readiness}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-seagreen-gold group-hover:text-white transition-all">
                    <span>Inspect</span>
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-seagreen-gold"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Drawer for Detailed Inspection */}
        <AnimatePresence>
          {selectedDomain && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-br from-[#124D46] to-[#0A332F] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 border border-seagreen-primary/40 shadow-2xl relative text-white"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDomain(null)}
                  data-cursor="hover"
                  className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shadow-xs focus:outline-none"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Modal Header */}
                <div className="mb-8 pr-12">
                  <span className="font-mono text-xs font-bold text-seagreen-gold block mb-1 tracking-wider">
                    DOMAIN ARCHITECTURE {selectedDomain.number}
                  </span>
                  <h3 className="editorial-serif text-3xl font-bold tracking-tight text-white mb-2">
                    {selectedDomain.title}
                  </h3>
                  <div className="text-sm font-sans font-semibold text-seagreen-seafoam">
                    {selectedDomain.subtitle}
                  </div>
                </div>

                {/* Tagline Highlight */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/15 mb-8 italic font-serif text-base text-white/95">
                  "{selectedDomain.tagline}"
                </div>

                {/* Detailed Sections */}
                <div className="space-y-6 text-left">
                  {/* Key Technologies */}
                  <div>
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-3">
                      Key Foundational Technologies
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedDomain.keyTechnologies.map((tech, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white shadow-xs"
                        >
                          <CheckCircle2 size={15} className="text-seagreen-gold shrink-0" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Societal Impact */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-xs">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-2">
                      Projected Societal Impact
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed font-sans">
                      {selectedDomain.societalImpact}
                    </p>
                  </div>

                  {/* Ethical Safeguard */}
                  <div className="p-5 rounded-2xl bg-seagreen-primary/20 border border-seagreen-primary/40">
                    <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-seagreen-seafoam mb-2">
                      <Shield size={14} className="text-seagreen-gold" />
                      <span>Ethical Safeguard Dimension</span>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed font-sans">
                      {selectedDomain.ethicalDimension}
                    </p>
                  </div>

                  {/* Pilot Initiative */}
                  <div className="p-5 rounded-2xl bg-seagreen-gold/10 border border-seagreen-gold/30">
                    <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-2">
                      <Sparkles size={14} className="text-seagreen-gold" />
                      <span>Living Pilot Initiative</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed font-sans font-semibold">
                      {selectedDomain.pilotInitiative}
                    </p>
                  </div>
                </div>

                {/* Footer close */}
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setSelectedDomain(null)}
                    data-cursor="hover"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white text-xs font-semibold hover:brightness-110 transition-all shadow-seagreen border border-seagreen-gold/40"
                  >
                    Return to Overview
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
