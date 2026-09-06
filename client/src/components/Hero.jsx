import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sound from '../utils/sound';
import HeroCity3D from './3d/HeroCity3D';
import { 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  Compass, 
  Trees, 
  Cpu, 
  Zap, 
  Footprints,
  Eye,
  Layers
} from 'lucide-react';

export default function Hero({ onEnterFuture, onExplorePossibilities, onSeeHowItWorks }) {
  const [heroMode, setHeroMode] = useState('greenery');

  const handleModeChange = (mode) => {
    sound.playClick();
    setHeroMode(mode);
  };

  const modeButtons = [
    { id: 'greenery', label: 'More Greenery', icon: Trees, color: 'emerald' },
    { id: 'ai', label: 'More AI', icon: Cpu, color: 'cyan' },
    { id: 'clean_energy', label: 'Clean Energy', icon: Zap, color: 'amber' },
    { id: 'car_free', label: 'Car-Free Streets', icon: Footprints, color: 'teal' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-6 sm:px-8 bg-gradient-to-b from-[#07221E] via-[#0A332F] to-[#0E433E] text-white overflow-hidden"
    >
      {/* Luminous Atmospheric Background Blooms */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[350px] bg-seagreen-primary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
        
        {/* Left Column: Clear Product Identity & Purpose (7 cols) */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
          {/* Badge: ENTER DIGIVERSE */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-seagreen-gold/40 text-xs font-mono font-bold text-seagreen-gold uppercase tracking-widest mb-4 backdrop-blur-md shadow-xs"
          >
            <Sparkles size={12} className="text-seagreen-gold" />
            <span>ENTER DIGIVERSE</span>
          </motion.div>

          {/* Main Title: Explore the future. Shape it yourself. */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-5 text-balance"
          >
            Explore the future. <br className="hidden sm:inline" />
            <span className="font-script-accent text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-seagreen-gold font-normal lowercase inline-block -rotate-1 mt-1">
              Shape it yourself.
            </span>
          </motion.h1>

          {/* Concrete 1-Sentence Definition */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-seagreen-seafoam/90 leading-relaxed font-sans font-normal max-w-xl mb-8"
          >
            <strong className="text-white font-semibold">DigiVerse</strong> lets you explore possible futures, discover how technology could change everyday life, and design the future you want to live in.
          </motion.p>

          {/* 3 Simple Action Cards (EXPLORE, DESIGN, DISCOVER) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8"
          >
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-seagreen-gold/40 transition-all backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-1">
                <span>🌎</span>
                <span>EXPLORE</span>
              </div>
              <p className="text-xs text-white/80 leading-snug font-sans">
                See what everyday life could look like in the future.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-seagreen-gold/40 transition-all backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-1">
                <span>🎛️</span>
                <span>DESIGN</span>
              </div>
              <p className="text-xs text-white/80 leading-snug font-sans">
                Make choices about technology, green cities, and privacy.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-seagreen-gold/40 transition-all backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 mb-1">
                <span>✨</span>
                <span>DISCOVER</span>
              </div>
              <p className="text-xs text-white/80 leading-snug font-sans">
                See what your choices create — and what they mean for society.
              </p>
            </div>
          </motion.div>

          {/* Primary & Secondary Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
          >
            <button
              onClick={() => {
                sound.playClick();
                onEnterFuture?.();
              }}
              data-cursor="hover"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-seagreen-primary via-seagreen-secondary to-seagreen-primary text-white font-sans font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 hover:brightness-110 transition-all shadow-seagreen border border-seagreen-gold/40 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span>START EXPLORING</span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 text-seagreen-gold" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSeeHowItWorks?.();
              }}
              data-cursor="hover"
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-sans font-medium text-sm sm:text-base flex items-center justify-center gap-2 border border-white/20 transition-all backdrop-blur-md hover:-translate-y-0.5"
            >
              <Compass size={17} className="text-seagreen-gold" />
              <span>SEE HOW IT WORKS</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Live Interactive 3D Future City Demonstration (6 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col gap-3"
        >
          {/* Live 3D Model Viewport */}
          <div className="relative">
            <HeroCity3D activeMode={heroMode} height="430px" />
          </div>

          {/* Interactive Bar: "Choose what you want to change" */}
          <div className="p-4 rounded-2xl bg-[#0A332F]/90 border border-seagreen-gold/40 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-seagreen-gold flex items-center gap-1.5">
                <Sliders size={12} />
                <span>CHOOSE WHAT YOU WANT TO CHANGE:</span>
              </span>
              <span className="text-[10px] font-mono text-seagreen-seafoam/70">
                Live 3D Response
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {modeButtons.map((btn) => {
                const isActive = heroMode === btn.id;
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.id}
                    onClick={() => handleModeChange(btn.id)}
                    data-cursor="hover"
                    className={`px-3 py-2.5 rounded-xl text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                      isActive
                        ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-sm -translate-y-0.5'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={13} className={isActive ? 'text-seagreen-gold' : 'text-white/60'} />
                    <span className="truncate">{btn.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-seagreen-seafoam/80 font-sans mt-2.5 text-center sm:text-left">
              {heroMode === 'greenery' && '🌱 Trees and vertical sky gardens actively expand across the cityscape.'}
              {heroMode === 'ai' && '🤖 Autonomous pod fleets deploy into synchronized low-friction corridors.'}
              {heroMode === 'clean_energy' && '⚡ Clean wind turbines and rooftop solar generation arrays activate.'}
              {heroMode === 'car_free' && '🚶 Streets convert into peaceful botanical promenades for pedestrians.'}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
