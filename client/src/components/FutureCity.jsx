import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITY_HOTSPOTS } from '../data/futureData';
import { Sun, Sunset, Moon, Sunrise, MapPin, X, Sparkles, Building } from 'lucide-react';

export default function FutureCity() {
  const [activeTime, setActiveTime] = useState('morning');
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const timeData = CITY_HOTSPOTS[activeTime];

  const timeOptions = [
    { id: 'morning', label: 'Morning', icon: Sunrise, time: '06:00 – 10:00' },
    { id: 'afternoon', label: 'Afternoon', icon: Sun, time: '11:00 – 16:00' },
    { id: 'evening', label: 'Evening', icon: Sunset, time: '17:00 – 21:00' },
    { id: 'night', label: 'Night', icon: Moon, time: '22:00 – 05:00' },
  ];

  const ambientStyles = {
    morning: 'from-[#0A3D38] via-[#0D4B44] to-[#125A52] border-seagreen-primary/30 text-white',
    afternoon: 'from-[#0D4B44] via-[#125D55] to-[#186D63] border-seagreen-primary/40 text-white',
    evening: 'from-[#0B3A36] via-[#0E433E] to-[#174D46] border-seagreen-gold/30 text-white',
    night: 'from-[#061F1E] via-[#082A28] to-[#0D3835] border-seagreen-gold/40 text-white',
  };

  return (
    <section id="city" className="py-32 sm:py-44 px-6 sm:px-8 bg-seagreen-cream text-white border-t border-seagreen-primary/25 relative overflow-hidden">
      {/* Soft ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 -left-24 w-96 h-96 bg-seagreen-primary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/3 -right-24 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
              <Building size={13} className="text-seagreen-gold" />
              <span>Living Urban Metabolism</span>
              <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
              <span className="text-seagreen-gold">24-Hour Speculative Cycle</span>
            </div>
            <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06]">
              A Day in the Future
            </h2>
          </div>
          <p className="text-sm sm:text-base text-seagreen-seafoam/80 max-w-md leading-relaxed font-sans font-normal">
            Cities are living organisms. Explore how biophilic buildings, kinetic transit, and decentralized energy grids calibrate across day and night.
          </p>
        </div>

        {/* Time Phase Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          {timeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeTime === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setActiveTime(opt.id);
                  setSelectedHotspot(null);
                }}
                data-cursor="hover"
                className={`flex items-center gap-3.5 p-4 rounded-2xl text-left border transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-0.5'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-white/15 text-seagreen-gold' : 'bg-white/10 text-seagreen-seafoam'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm font-sans text-white">{opt.label}</div>
                  <div className={`text-[11px] font-mono ${isSelected ? 'text-seagreen-gold' : 'text-seagreen-seafoam/70'}`}>
                    {opt.time}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Ambient Interactive City Viewport with Day/Night Tones */}
        <div
          className={`relative rounded-3xl p-8 sm:p-14 min-h-[490px] bg-gradient-to-br transition-all duration-700 shadow-2xl border overflow-hidden ${ambientStyles[activeTime]}`}
        >
          {/* Subtle Oceanic Grid Backdrop */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="city-ambient-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#city-ambient-grid)" />
            </svg>
          </div>

          {/* Minimalist City Skyline Outline Graphic */}
          <div className="absolute bottom-0 inset-x-0 h-48 opacity-25 pointer-events-none flex items-end justify-between px-10">
            <div className="w-24 h-40 border-t border-r border-current rounded-t-xl" />
            <div className="w-36 h-48 border-t border-l border-r border-current rounded-t-3xl" />
            <div className="w-24 h-32 border-t border-l border-current rounded-t-lg" />
            <div className="w-44 h-44 border-t border-l border-r border-current rounded-t-2xl" />
            <div className="w-32 h-36 border-t border-r border-current rounded-t-xl" />
          </div>

          {/* Header Inside Stage */}
          <div className="relative z-10 max-w-xl mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider mb-2.5 text-seagreen-gold">
              <span>{timeData.time}</span>
              <span>·</span>
              <span>Civic Pulse</span>
            </div>
            <h3 className="editorial-serif text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">
              {timeData.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed font-sans text-seagreen-seafoam/85">
              {timeData.summary}
            </p>
          </div>

          {/* Interactive Hotspots Over the Canvas */}
          <div className="relative z-10 my-8">
            <div className="text-[11px] uppercase tracking-widest font-bold font-sans mb-4 text-seagreen-gold">
              Select a Civic Layer to Inspect:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {timeData.hotspots.map((spot) => {
                const isSelected = selectedHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    data-cursor="hover"
                    className={`p-5 rounded-2xl text-left border backdrop-blur-md transition-all duration-200 font-sans ${
                      isSelected
                        ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-gold'
                        : 'bg-black/20 border-white/10 text-white hover:bg-black/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <MapPin size={14} className={isSelected ? 'text-seagreen-gold' : 'text-seagreen-primary'} />
                        <span>{spot.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-seagreen-seafoam border border-white/10">
                        {spot.metric}
                      </span>
                    </div>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isSelected
                          ? 'text-white/95'
                          : 'text-seagreen-seafoam/75'
                      }`}
                    >
                      {spot.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hotspot Inspection Integrated Sea-Green Panel */}
          <AnimatePresence>
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 sm:p-8 rounded-2xl border shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#092B28]/95 text-white border-seagreen-gold/40 backdrop-blur-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-seagreen-primary/20 flex items-center justify-center text-seagreen-gold shrink-0 mt-0.5 shadow-sm border border-seagreen-gold/30">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="editorial-serif font-bold text-lg sm:text-xl mb-1 text-white">
                      {selectedHotspot.name}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed font-sans text-seagreen-seafoam/85">
                      {selectedHotspot.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-seagreen-primary/30 text-seagreen-gold border border-seagreen-gold/30 shadow-xs">
                    {selectedHotspot.metric}
                  </span>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    data-cursor="hover"
                    className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
