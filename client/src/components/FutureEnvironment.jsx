import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import { Sun, Trees, Droplets, Bike, Recycle, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function FutureEnvironment() {
  const [toggles, setToggles] = useState({
    solar: true,
    greenery: true,
    water: false,
    carFree: true,
    waste: false,
  });

  const handleToggle = (key) => {
    sound.playClick();
    setToggles(prev => {
      const nextVal = !prev[key];
      if (nextVal) sound.playChime(680);
      return { ...prev, [key]: nextVal };
    });
  };

  const toggleOptions = [
    {
      key: 'solar',
      label: 'Solar Energy',
      icon: '☀️',
      desc: 'Kinetic solar shading leaves capture maximum clean power',
      activeVisual: 'Photovoltaic canopies glowing with clean radiant wattage'
    },
    {
      key: 'greenery',
      label: 'Green Buildings',
      icon: '🌳',
      desc: 'Vertical botanical forests cool structures by 10°C',
      activeVisual: 'Living green facades filtering air and sheltering native songbirds'
    },
    {
      key: 'water',
      label: 'Water Recycling',
      icon: '💧',
      desc: 'Atmospheric mist condensers supply pure drinking water',
      activeVisual: 'Subterranean bio-wetlands recharging natural freshwater aquifers'
    },
    {
      key: 'carFree',
      label: 'Car-Free Zones',
      icon: '🚲',
      desc: 'Streets belong entirely to walkers, cyclists, and outdoor dining',
      activeVisual: 'Asphalt replaced with permeable brick promenades and cafe terraces'
    },
    {
      key: 'waste',
      label: 'Smart Waste',
      icon: '♻️',
      desc: 'Sub-surface pneumatic tubes remove all waste silently',
      activeVisual: 'Zero surface garbage trucks; 100% closed-loop organic recycling'
    },
  ];

  const activeCount = Object.values(toggles).filter(Boolean).length;
  const ecoScore = Math.round((activeCount / 5) * 100);

  return (
    <section 
      id="environment-scenario" 
      className="py-32 sm:py-40 px-6 sm:px-8 bg-gradient-to-b from-[#0E4F4A] via-[#176B63] to-[#0A332F] text-white relative overflow-hidden"
    >
      {/* Ambient background bloom */}
      <div className="pointer-events-none absolute top-1/4 -left-28 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -right-28 w-96 h-96 bg-seagreen-gold/15 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Trees size={13} className="text-emerald-400" />
            <span>Regenerative Ecology</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Interactive City</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            A city that <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">heals</span> the planet.
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Toggle ecological technologies below. Watch the city visually transform in real time as clean systems activate.
          </p>
        </div>

        {/* 2-Column Interactive Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Interactive Toggles (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-2">
              <span className="text-xs font-mono font-bold text-seagreen-gold uppercase">
                CITY INFRASTRUCTURE TOGGLES
              </span>
              <span className="text-xs font-mono text-emerald-300 font-bold">
                {activeCount} / 5 ACTIVE
              </span>
            </div>

            {toggleOptions.map((opt) => {
              const isOn = toggles[opt.key];
              return (
                <button
                  key={opt.key}
                  onClick={() => handleToggle(opt.key)}
                  data-cursor="hover"
                  className={`w-full p-4 rounded-2xl text-left border transition-all duration-300 font-sans flex items-center justify-between group ${
                    isOn
                      ? 'bg-gradient-to-r from-seagreen-dark/95 to-seagreen-secondary/90 border-seagreen-gold text-white shadow-seagreen -translate-y-0.5'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-white">{opt.label}</div>
                      <div className={`text-xs ${isOn ? 'text-seagreen-seafoam' : 'text-white/50'}`}>
                        {opt.desc}
                      </div>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all shrink-0 ml-3 ${
                    isOn
                      ? 'bg-seagreen-gold border-seagreen-gold text-[#0E4F4A]'
                      : 'border-white/20 text-transparent'
                  }`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Living Dynamic City Visual Transformation Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#124E47]/95 via-[#0E433E]/95 to-[#0A332F] rounded-3xl p-6 sm:p-8 border border-seagreen-gold/40 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
            {/* Top Vitality Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15 relative z-10">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-seagreen-gold block">
                  URBAN METABOLISM SIMULATION
                </span>
                <span className="font-serif text-xl font-bold text-white">
                  Living Eco-Metropolis
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono font-bold text-seagreen-gold">
                  {ecoScore}%
                </span>
                <span className="text-[10px] font-mono text-emerald-300 block uppercase">
                  Regeneration Index
                </span>
              </div>
            </div>

            {/* Dynamic City Graphic SVG that actively transforms */}
            <div className="relative py-6 flex items-center justify-center">
              <svg viewBox="0 0 500 240" className="w-full h-auto max-h-[220px]">
                {/* Sky Atmosphere Color depends on ecoScore */}
                <rect 
                  x="0" 
                  y="0" 
                  width="500" 
                  height="240" 
                  rx="16"
                  fill={ecoScore > 60 ? 'rgba(52, 211, 153, 0.08)' : 'rgba(245, 158, 11, 0.05)'} 
                />

                {/* Sun & Solar Arrays */}
                <circle cx="420" cy="45" r="28" fill="#FBBF24" opacity={toggles.solar ? 0.9 : 0.4} />
                {toggles.solar && (
                  <g>
                    {/* Glowing solar panels on rooftops */}
                    <rect x="85" y="65" width="50" height="8" rx="2" fill="#C8A96B" />
                    <rect x="190" y="45" width="60" height="8" rx="2" fill="#C8A96B" />
                    <rect x="315" y="85" width="45" height="8" rx="2" fill="#C8A96B" />
                  </g>
                )}

                {/* City Buildings (Base Geometry) */}
                <rect x="80" y="70" width="60" height="130" fill="#0E4F4A" stroke="#2F8F83" strokeWidth="1.5" rx="4" />
                <rect x="180" y="50" width="80" height="150" fill="#176B63" stroke="#2F8F83" strokeWidth="1.5" rx="4" />
                <rect x="310" y="90" width="55" height="110" fill="#0E4F4A" stroke="#2F8F83" strokeWidth="1.5" rx="4" />

                {/* Green Buildings Toggle Active: Vertical Forests */}
                {toggles.greenery && (
                  <g>
                    {/* Vertical terrace foliage */}
                    <circle cx="85" cy="100" r="8" fill="#34D399" />
                    <circle cx="135" cy="115" r="8" fill="#10B981" />
                    <circle cx="85" cy="140" r="7" fill="#34D399" />
                    <circle cx="185" cy="80" r="9" fill="#10B981" />
                    <circle cx="255" cy="95" r="9" fill="#34D399" />
                    <circle cx="185" cy="130" r="8" fill="#10B981" />
                    <circle cx="315" cy="120" r="7" fill="#34D399" />
                    <circle cx="360" cy="145" r="8" fill="#10B981" />
                  </g>
                )}

                {/* Ground Street Level */}
                <rect x="0" y="200" width="500" height="40" fill="#0A332F" />

                {/* Car-Free Zones Toggle: Pedestrian Promenade vs Asphalt */}
                {toggles.carFree ? (
                  <g>
                    {/* Brick Promenade & Trees */}
                    <rect x="0" y="200" width="500" height="8" fill="#C8A96B" opacity="0.3" />
                    <circle cx="150" cy="195" r="6" fill="#34D399" />
                    <circle cx="280" cy="195" r="6" fill="#34D399" />
                    <circle cx="400" cy="195" r="6" fill="#34D399" />
                    {/* People walking */}
                    <circle cx="220" cy="190" r="3" fill="#D8F0EA" />
                    <line x1="220" y1="193" x2="220" y2="200" stroke="#D8F0EA" strokeWidth="2" />
                    <circle cx="230" cy="191" r="3" fill="#C8A96B" />
                    <line x1="230" y1="194" x2="230" y2="200" stroke="#C8A96B" strokeWidth="2" />
                  </g>
                ) : (
                  <g>
                    {/* Vehicle road with dividing lines */}
                    <line x1="0" y1="206" x2="500" y2="206" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="8 6" opacity="0.4" />
                  </g>
                )}

                {/* Water Recycling Toggle: Sparkling Fountains & Mist */}
                {toggles.water && (
                  <g>
                    <path d="M 245 198 Q 250 180 255 198" stroke="#38BDF8" strokeWidth="2" fill="none" />
                    <path d="M 248 198 Q 250 174 252 198" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
                    <circle cx="250" cy="172" r="2" fill="#38BDF8" />
                  </g>
                )}

                {/* Smart Waste Toggle: Subterranean Capsule Line */}
                {toggles.waste && (
                  <g>
                    <line x1="0" y1="225" x2="500" y2="225" stroke="#34D399" strokeWidth="3" strokeDasharray="12 8" />
                    <circle cx="260" cy="225" r="4" fill="#C8A96B" />
                  </g>
                )}
              </svg>
            </div>

            {/* Dynamic Status Readout */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs font-sans text-seagreen-seafoam flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <Sparkles size={14} className="text-seagreen-gold" />
                <span>
                  {ecoScore === 100 
                    ? 'Maximum Ecological Regeneration: City operates as a net-positive biosphere!'
                    : `${5 - activeCount} ecological systems waiting to be activated.`}
                </span>
              </span>
              <span className="font-mono text-seagreen-gold font-semibold">
                CO2: -{activeCount * 18}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
