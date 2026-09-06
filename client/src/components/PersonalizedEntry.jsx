import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import { Sparkles, ArrowRight, CheckCircle2, Trees, Heart, Cpu, Building, ShieldCheck, Stars } from 'lucide-react';

export const FUTURE_INTENTS = [
  {
    id: 'greener',
    title: 'A Greener Future',
    icon: '🌱',
    sub: 'Planetary Regeneration',
    desc: 'Cities that clean the air, buildings covered in living forests, and clean closed-loop energy.',
    visualBg: 'from-[#0E4F4A] via-[#145550] to-[#0A332F]',
    accentColor: '#34D399',
    badge: 'Ecological Restoration',
    focusDomain: 'environment'
  },
  {
    id: 'human',
    title: 'A More Human Future',
    icon: '❤️',
    sub: 'Empathy & Human Agency',
    desc: 'Technology that protects quiet contemplation, deep presence, and authentic face-to-face connection.',
    visualBg: 'from-[#176B63] via-[#0E4F4A] to-[#14423D]',
    accentColor: '#F472B6',
    badge: 'Human Flourishing',
    focusDomain: 'community'
  },
  {
    id: 'smarter',
    title: 'A Smarter Future',
    icon: '🤖',
    sub: 'Cognitive Synergy',
    desc: 'Intelligent systems handling repetitive drudgery so humans can dedicate time to discovery and art.',
    visualBg: 'from-[#0D403C] via-[#176B63] to-[#092B28]',
    accentColor: '#60A5FA',
    badge: 'Intelligent Co-Creation',
    focusDomain: 'work'
  },
  {
    id: 'connected',
    title: 'A Connected Future',
    icon: '🏙️',
    sub: 'Kinetic 15-Minute Cities',
    desc: 'Quiet magnetic pods, pedestrian streetscapes, and zero traffic congestion across living communities.',
    visualBg: 'from-[#124E47] via-[#0E433E] to-[#082623]',
    accentColor: '#FBBF24',
    badge: 'Walkable Living',
    focusDomain: 'mobility'
  },
  {
    id: 'private',
    title: 'A More Private Future',
    icon: '🔐',
    sub: 'Neuro-Sovereignty',
    desc: 'Zero surveillance, client-side encryption, and complete control over your personal biometric world.',
    visualBg: 'from-[#0A332F] via-[#114943] to-[#072421]',
    accentColor: '#A78BFA',
    badge: 'Guaranteed Privacy',
    focusDomain: 'home'
  },
  {
    id: 'imagined',
    title: 'A Future Not Yet Imagined',
    icon: '✨',
    sub: 'Uncharted Horizons',
    desc: 'Bold experimentation, spatial creativity, and curious synthesis beyond current paradigms.',
    visualBg: 'from-[#176B63] via-[#0E4F4A] to-[#2F8F83]',
    accentColor: '#FDE047',
    badge: 'Open Horizon',
    focusDomain: 'education'
  }
];

export default function PersonalizedEntry({ onSelectIntent }) {
  const [selectedId, setSelectedId] = useState('greener');

  const handleSelect = (intent) => {
    sound.playChime(660);
    setSelectedId(intent.id);
    onSelectIntent?.(intent.id);

    // Smooth scroll to the Future World
    setTimeout(() => {
      const el = document.getElementById('world') || document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const currentSelection = FUTURE_INTENTS.find(i => i.id === selectedId) || FUTURE_INTENTS[0];

  return (
    <section 
      id="personalized" 
      className="py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#0C3E3A] via-[#0E4F4A] to-[#0A332F] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-seagreen-secondary/15 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Sparkles size={13} className="text-seagreen-gold" />
            <span>Personalized Entry</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Make Your Choice</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            What kind of <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">future</span> do you want to live in?
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Choose what matters most to you. Your decision will shape the atmosphere, customize your journey, and guide your speculative world.
          </p>
        </div>

        {/* 6 Large Visual Choices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FUTURE_INTENTS.map((intent) => {
            const isSelected = selectedId === intent.id;
            return (
              <motion.button
                key={intent.id}
                onClick={() => handleSelect(intent)}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="hover"
                className={`p-6 sm:p-8 rounded-3xl text-left border transition-all duration-300 relative overflow-hidden font-sans flex flex-col justify-between min-h-[220px] group ${
                  isSelected
                    ? 'bg-gradient-to-br ' + intent.visualBg + ' border-seagreen-gold shadow-2xl shadow-seagreen-secondary/25 ring-2 ring-seagreen-gold/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Decorative corner glow */}
                <div 
                  className="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: intent.accentColor }}
                />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl sm:text-4xl">{intent.icon}</span>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isSelected 
                        ? 'bg-seagreen-gold/20 text-seagreen-gold border-seagreen-gold/40' 
                        : 'bg-white/10 text-white/70 border-white/15'
                    }`}>
                      {intent.badge}
                    </span>
                  </div>

                  <h3 className="editorial-serif text-2xl font-bold text-white mb-2">
                    {intent.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-seagreen-seafoam' : 'text-white/70'}`}>
                    {intent.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-seagreen-gold flex items-center gap-1.5">
                    {isSelected ? (
                      <>
                        <CheckCircle2 size={15} />
                        <span>Chosen Path</span>
                      </>
                    ) : (
                      <span className="text-white/40 group-hover:text-white transition-colors">Select this vision →</span>
                    )}
                  </span>
                  <span className="text-xs font-serif italic text-white/50">{intent.sub}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Selection Confirmation Banner */}
        <motion.div
          key={currentSelection.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#176B63]/80 to-[#0E4F4A]/90 border border-seagreen-gold/40 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl">{currentSelection.icon}</span>
            <div>
              <div className="text-xs font-mono font-bold text-seagreen-gold uppercase tracking-wider mb-0.5">
                ACTIVE FOCUS: {currentSelection.title}
              </div>
              <p className="text-sm text-white/90 font-sans">
                Atmosphere calibrated. Enter the world to see how {currentSelection.title.toLowerCase()} transforms everyday living.
              </p>
            </div>
          </div>

          <a
            href="#world"
            onClick={() => sound.playClick()}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-seagreen-primary to-seagreen-secondary text-white font-sans font-semibold text-xs sm:text-sm hover:brightness-110 transition-all border border-seagreen-gold/40 shadow-seagreen"
          >
            <span>Step into the Future World</span>
            <ArrowRight size={14} className="text-seagreen-gold" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
