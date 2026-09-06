import React, { useState } from 'react';
import { DOMAINS } from '../data/futureData';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function Explore({ onReturnHome }) {
  const [activeTab, setActiveTab] = useState(DOMAINS[0].id);
  const currentDomain = DOMAINS.find((d) => d.id === activeTab) || DOMAINS[0];

  return (
    <div className="pt-36 pb-24 px-6 sm:px-8 max-w-7xl mx-auto min-h-screen text-white font-sans">
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

      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-3">
          <Sparkles size={13} className="text-seagreen-gold" />
          <span>Domain Observatory</span>
          <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
          <span className="text-seagreen-gold">Deep Systems Dive</span>
        </div>
        <h1 className="editorial-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-4">
          Six Directions of Tomorrow
        </h1>
        <p className="text-base sm:text-lg text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
          An unhurried exploration into the six core domains shaping our technological and ecological tomorrow.
        </p>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 border-b border-white/10 mb-10">
        {DOMAINS.map((domain) => {
          const isSelected = activeTab === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => setActiveTab(domain.id)}
              data-cursor="hover"
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all font-sans ${
                isSelected
                  ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white shadow-seagreen border border-seagreen-gold'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <span>{domain.number} — {domain.title}</span>
            </button>
          );
        })}
      </div>

      {/* Deep Dive Card */}
      <div className="bg-gradient-to-br from-[#124D46]/95 to-[#0A332F]/95 rounded-3xl p-8 sm:p-12 border border-seagreen-primary/35 shadow-2xl backdrop-blur-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold text-seagreen-gold block mb-1">
              SYSTEM ARCHITECTURE {currentDomain.number}
            </span>
            <h2 className="editorial-serif text-3xl sm:text-4xl font-bold text-white mb-2">
              {currentDomain.title}
            </h2>
            <div className="text-sm font-sans font-semibold text-seagreen-seafoam">
              {currentDomain.subtitle}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-seagreen-seafoam text-xs font-mono font-bold border border-white/15">
              Horizon: {currentDomain.stats.timeline}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-seagreen-primary/30 text-white text-xs font-mono font-bold border border-seagreen-gold/40 shadow-sm">
              Readiness: {currentDomain.stats.readiness}
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-base sm:text-lg italic font-serif text-white/90 mb-10">
          "{currentDomain.tagline}"
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-3">
              Description & Philosophical Core
            </h3>
            <p className="text-base text-white/80 leading-relaxed mb-8 font-sans">
              {currentDomain.description}
            </p>

            <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-3">
              Core Architectural Pillars
            </h3>
            <div className="space-y-2.5">
              {currentDomain.keyTechnologies.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-white shadow-xs"
                >
                  <CheckCircle2 size={16} className="text-seagreen-gold shrink-0" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xs">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-2">
                Long-Term Societal Impact
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {currentDomain.societalImpact}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-seagreen-primary/20 border border-seagreen-primary/40">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-seagreen-seafoam mb-2">
                <ShieldCheck size={16} className="text-seagreen-gold" />
                <span>Ethical Safeguard Imperative</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed font-sans">
                {currentDomain.ethicalDimension}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-seagreen-gold/10 border border-seagreen-gold/30 shadow-gold">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-2">
                <Sparkles size={16} className="text-seagreen-gold" />
                <span>Active Living Pilot Project</span>
              </div>
              <p className="text-sm text-white leading-relaxed font-sans font-semibold">
                {currentDomain.pilotInitiative}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
