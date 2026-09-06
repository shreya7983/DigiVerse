import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_EVENTS } from '../data/futureData';
import sound from '../utils/sound';
import { Clock, CheckCircle, Sparkles, AlertCircle, Compass, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import TimelineCityCanvas from './3d/TimelineCityCanvas';

export default function Timeline() {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  const currentEvent = TIMELINE_EVENTS[activeYearIndex];

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'ai', label: 'AI & Computation' },
    { id: 'cities', label: 'Smart Cities' },
    { id: 'health', label: 'Healthcare' },
    { id: 'environment', label: 'Environment' },
    { id: 'society', label: 'Ethics & Society' },
  ];

  const handleYearChange = (idx) => {
    sound.playClick();
    setActiveYearIndex(idx);
  };

  const handleCategoryChange = (catId) => {
    sound.playClick();
    setActiveCategory(catId);
  };

  const prevYear = () => {
    sound.playClick();
    setActiveYearIndex(prev => Math.max(0, prev - 1));
  };

  const nextYear = () => {
    sound.playChime();
    setActiveYearIndex(prev => Math.min(TIMELINE_EVENTS.length - 1, prev + 1));
  };

  // Filter breakthroughs if a specific domain is selected
  const filteredBreakthroughs = currentEvent.breakthroughs.filter(b => {
    if (activeCategory === 'all') return true;
    const text = b.toLowerCase();
    if (activeCategory === 'ai' && (text.includes('ai') || text.includes('silicon') || text.includes('algorithmic') || text.includes('twin'))) return true;
    if (activeCategory === 'cities' && (text.includes('transit') || text.includes('pod') || text.includes('urban') || text.includes('battery') || text.includes('grid'))) return true;
    if (activeCategory === 'health' && (text.includes('health') || text.includes('cardio') || text.includes('immunotherapy') || text.includes('cellular'))) return true;
    if (activeCategory === 'environment' && (text.includes('renewable') || text.includes('carbon') || text.includes('geothermal') || text.includes('desalination') || text.includes('ecological'))) return true;
    if (activeCategory === 'society' && (text.includes('treaties') || text.includes('schools') || text.includes('rights') || text.includes('ethical') || text.includes('human'))) return true;
    return false;
  });

  const displayBreakthroughs = filteredBreakthroughs.length > 0 ? filteredBreakthroughs : currentEvent.breakthroughs;

  return (
    <section
      id="timeline"
      className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0E433E] via-[#0C433F] to-[#0A332F] text-white relative overflow-hidden"
    >
      {/* Luminous atmospheric sea-green / gold bloom */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-seagreen-primary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 right-10 w-80 h-80 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-gold mb-4">
            <Clock size={13} />
            <span>Speculative Trajectory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span>2026—2050</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            A Glimpse Beyond <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">today</span>
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            The timeline is not an immutable prophecy. It is a speculative trajectory mapping how early experiments today scale into systemic cultural realities tomorrow.
          </p>

          {/* Speculative Notice */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-seagreen-gold/30 text-xs text-seagreen-seafoam/90 shadow-sm backdrop-blur-md">
            <AlertCircle size={13} className="text-seagreen-gold" />
            <span>Speculative model based on ethical design milestones and regenerative physics</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                data-cursor="hover"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-0.5'
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Cinematic Horizontal Era Track */}
        <div className="max-w-3xl mx-auto mb-14 relative">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/10 -translate-y-1/2 rounded-full z-0 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-seagreen-primary to-seagreen-gold rounded-full"
              initial={false}
              animate={{ width: `${(activeYearIndex / (TIMELINE_EVENTS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            {TIMELINE_EVENTS.map((item, idx) => {
              const isSelected = activeYearIndex === idx;
              return (
                <button
                  key={item.year}
                  onClick={() => handleYearChange(idx)}
                  data-cursor="hover"
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-serif font-bold text-sm sm:text-base transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-seagreen-deep via-seagreen-primary to-seagreen-gold text-white shadow-gold scale-110 border border-seagreen-gold'
                        : 'bg-seagreen-dark/90 border border-white/20 text-seagreen-seafoam/70 hover:border-seagreen-gold hover:text-white'
                    }`}
                  >
                    {item.year}
                  </div>
                  <span
                    className={`text-[11px] font-sans font-semibold tracking-wider uppercase mt-2.5 hidden sm:block transition-colors ${
                      isSelected ? 'text-seagreen-gold' : 'text-seagreen-seafoam/50'
                    }`}
                  >
                    {item.phase.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Temporal City Morphing Viewport */}
        <div className="mb-12">
          <TimelineCityCanvas
            height="480px"
            selectedEraIndex={activeYearIndex}
            onSelectEra={handleYearChange}
          />
        </div>

        {/* Detailed Timeline Stage Card in Deep Teal with Gold Accents */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.year + activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#124D46]/90 to-[#0A332F]/95 border border-seagreen-gold/30 shadow-2xl backdrop-blur-2xl"
          >
            {/* Top Info Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-white/10 gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-seagreen-gold">
                    {currentEvent.year}
                  </span>
                  <span className="text-white/20 font-light text-2xl">/</span>
                  <span className="editorial-serif text-2xl sm:text-3xl font-bold text-white">
                    {currentEvent.phase}
                  </span>
                </div>
                <p className="text-sm font-sans font-medium text-seagreen-seafoam/80">
                  {currentEvent.subtitle}
                </p>
              </div>

              <div className="self-start sm:self-auto px-4 py-2 rounded-full bg-white/10 border border-seagreen-gold/40 text-xs font-semibold text-seagreen-gold flex items-center gap-2 shadow-gold">
                <Sparkles size={13} className="text-seagreen-gold" />
                <span>{currentEvent.confidence}</span>
              </div>
            </div>

            {/* Overview Narrative */}
            <div className="mb-10 text-base sm:text-lg text-seagreen-aqua/90 leading-relaxed font-sans font-normal">
              {currentEvent.overview}
            </div>

            {/* Grid: Breakthroughs & Human Experience Vignette */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Breakthroughs */}
              <div className="space-y-3 flex flex-col justify-center">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-1">
                  Key Systemic Breakthroughs {activeCategory !== 'all' && `(${categories.find(c => c.id === activeCategory)?.label})`}
                </h4>
                {displayBreakthroughs.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-seagreen-seafoam shadow-xs"
                  >
                    <CheckCircle size={16} className="text-seagreen-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* The Human Experience Vignette */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-seagreen-gold/25 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-seagreen-gold mb-3">
                    <Compass size={15} />
                    <span>The Everyday Human Experience</span>
                  </div>
                  <p className="editorial-serif text-base sm:text-lg text-seagreen-seafoam leading-relaxed italic">
                    "{currentEvent.humanExperience}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-seagreen-gold font-mono">
                  HISTORICAL SPECULATION NODE #{activeYearIndex + 1}
                </div>
              </div>
            </div>

            {/* Step Controls */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                disabled={activeYearIndex === 0}
                onClick={prevYear}
                data-cursor="hover"
                className={`text-xs font-semibold px-5 py-2.5 rounded-full border border-white/20 transition-colors flex items-center gap-1.5 ${
                  activeYearIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white shadow-xs'
                }`}
              >
                <ChevronLeft size={14} />
                <span>Previous Horizon</span>
              </button>

              <span className="text-xs text-seagreen-gold font-mono">
                0{activeYearIndex + 1} / 0{TIMELINE_EVENTS.length}
              </span>

              <button
                disabled={activeYearIndex === TIMELINE_EVENTS.length - 1}
                onClick={nextYear}
                data-cursor="hover"
                className={`text-xs font-semibold px-5 py-2.5 rounded-full border border-seagreen-gold/40 transition-colors flex items-center gap-1.5 ${
                  activeYearIndex === TIMELINE_EVENTS.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-seagreen-primary to-seagreen-deep text-white shadow-seagreen'
                }`}
              >
                <span>Next Horizon</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
