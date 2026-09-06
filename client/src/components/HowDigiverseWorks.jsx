import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  Sliders, 
  Cpu, 
  Trees, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  AlertTriangle
} from 'lucide-react';

export default function HowDigiverseWorks({ onDesignFuture }) {
  const [demoChoice, setDemoChoice] = useState('ai'); // 'ai' | 'greenery' | 'privacy'

  const handleChoiceChange = (choice) => {
    sound.playClick();
    setDemoChoice(choice);
  };

  const steps = [
    {
      num: '01',
      title: 'EXPLORE',
      sub: 'Discover possible futures.',
      desc: 'Browse through 3D cities, futuristic homes, hospitals, and transit corridors without technical jargon.'
    },
    {
      num: '02',
      title: 'EXPERIENCE',
      sub: 'See how technology changes real life.',
      desc: 'Witness how automated medical care, personalized schools, and kinetic transit shape a typical day.'
    },
    {
      num: '03',
      title: 'DESIGN',
      sub: 'Make your own choices.',
      desc: 'Allocate 100 societal points to balance environmental restoration, AI acceleration, and privacy.'
    },
    {
      num: '04',
      title: 'DISCOVER',
      sub: 'See the future you created.',
      desc: 'Receive your personalized Future Archetype and uncover the real ethical trade-offs of your world.'
    }
  ];

  const demoScenarios = {
    ai: {
      label: 'More AI & Automation',
      icon: Cpu,
      step1Desc: 'You allocate 40 points to Autonomous Systems & Cognitive Acceleration.',
      step2Visual: {
        title: 'Autonomous Swarm Grid Deployed',
        tags: ['Self-routing pods (120 km/h)', 'Adaptive energy distribution', 'Subterranean robotic logistics'],
        color: 'cyan'
      },
      step3Profile: {
        archetype: 'The Technology Optimist',
        scores: { tech: '91%', efficiency: '88%', humanControl: '52%', privacy: '46%' },
        tradeoffTitle: 'The Societal Trade-off',
        tradeoffText: 'Your city runs with near-zero friction and 0 traffic deaths — but depends heavily on continuous data telemetry and algorithmic decision-making.'
      }
    },
    greenery: {
      label: 'More Ecological Regeneration',
      icon: Trees,
      step1Desc: 'You allocate 40 points to Biophilic Rewilding & Circular Materials.',
      step2Visual: {
        title: 'Vertical Biosphere & Carbon-Negative Streets',
        tags: ['Skyward botanical terraces', 'Pedestrian forest greenways', 'Passive geothermal temperature control'],
        color: 'emerald'
      },
      step3Profile: {
        archetype: 'The Green Architect',
        scores: { tech: '58%', efficiency: '68%', humanControl: '84%', privacy: '78%' },
        tradeoffTitle: 'The Societal Trade-off',
        tradeoffText: 'Streets are peaceful and ambient temperatures drop by 4°C — but autonomous transit speeds are restricted to preserve botanical wildlife corridors.'
      }
    },
    privacy: {
      label: 'More Privacy & Sovereignty',
      icon: ShieldCheck,
      step1Desc: 'You allocate 40 points to Zero-Knowledge Encryption & Data Sovereignty.',
      step2Visual: {
        title: 'Air-Gapped Sovereign Sanctuaries',
        tags: ['Local edge computing only', 'Zero centralized biometric storage', 'Physical mechanical overrides'],
        color: 'purple'
      },
      step3Profile: {
        archetype: 'The Digital Minimalist',
        scores: { tech: '62%', efficiency: '54%', humanControl: '95%', privacy: '96%' },
        tradeoffTitle: 'The Societal Trade-off',
        tradeoffText: 'Your mental tranquility and biometric identity are entirely inviolable — but civic services require manual confirmation rather than instant anticipation.'
      }
    }
  };

  const activeDemo = demoScenarios[demoChoice];

  return (
    <section 
      id="how-it-works"
      className="py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#092B27] to-[#0E433E] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-seagreen-gold/30 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold mb-4">
            <Sliders size={12} className="text-seagreen-gold" />
            <span>SIMPLE USER JOURNEY</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            How DigiVerse <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block ml-1">works.</span>
          </h2>

          <p className="text-base sm:text-xl text-seagreen-gold font-serif italic max-w-xl mx-auto mb-2">
            “You don't need to understand technology first. Just explore it.”
          </p>
          <p className="text-sm text-seagreen-seafoam/70 font-sans">
            Designed for anyone curious about tomorrow. Follow the 4-stage progression:
          </p>
        </div>

        {/* 4 Enormous Numbered Journey Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 relative">
          {steps.map((st, idx) => (
            <div
              key={st.num}
              className="p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 relative flex flex-col justify-between hover:border-seagreen-gold/40 transition-all backdrop-blur-md"
            >
              <div>
                <span className="font-mono text-5xl sm:text-6xl font-black text-seagreen-gold/30 block mb-3">
                  {st.num}
                </span>
                <h3 className="editorial-serif text-2xl font-bold text-white mb-1">
                  {st.title}
                </h3>
                <p className="text-xs font-mono font-bold text-seagreen-seafoam uppercase tracking-wider mb-3">
                  {st.sub}
                </p>
                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-seagreen-primary text-white border border-seagreen-gold/50 flex items-center justify-center text-xs">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* LIVE 3-STAGE DEMONSTRATION: "SEE HOW IT WORKS" */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#124E47]/95 via-[#0E433E]/95 to-[#072421] border border-seagreen-gold/40 shadow-2xl backdrop-blur-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold block mb-2">
              INTERACTIVE DEMO
            </span>
            <h3 className="editorial-serif text-2xl sm:text-4xl font-bold text-white mb-2">
              See how it works in 3 seconds.
            </h3>
            <p className="text-xs sm:text-sm text-seagreen-seafoam/80 font-sans">
              Pick a priority below and watch how choice transforms into visual city reality and social consequence.
            </p>

            {/* 3 Choice Switcher Buttons */}
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              {Object.entries(demoScenarios).map(([key, sc]) => {
                const isSelected = demoChoice === key;
                const Icon = sc.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleChoiceChange(key)}
                    data-cursor="hover"
                    className={`px-4 py-2 rounded-full text-xs font-sans font-bold flex items-center gap-2 transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-sm -translate-y-0.5'
                        : 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={14} className={isSelected ? 'text-seagreen-gold' : 'text-white/60'} />
                    <span>{sc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Step Interactive Card Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={demoChoice}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
            >
              {/* STEP 1: YOU CHOOSE */}
              <div className="p-6 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[10px] font-mono font-bold text-seagreen-gold uppercase mb-3">
                    <span>STEP 1: YOU CHOOSE</span>
                  </div>
                  <h4 className="editorial-serif text-xl font-bold text-white mb-2">
                    {activeDemo.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-seagreen-seafoam/90 leading-relaxed font-sans mb-4">
                    {activeDemo.step1Desc}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-seagreen-gold flex items-center justify-between">
                  <span>Input Registered:</span>
                  <span className="font-bold">+40 PTS</span>
                </div>
              </div>

              {/* STEP 2: YOUR CITY CHANGES */}
              <div className="p-6 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/20 text-[10px] font-mono font-bold text-cyan-300 uppercase mb-3 border border-cyan-500/30">
                    <span>STEP 2: YOUR CITY CHANGES</span>
                  </div>
                  <h4 className="editorial-serif text-xl font-bold text-white mb-2">
                    {activeDemo.step2Visual.title}
                  </h4>
                  <div className="space-y-2 mt-3 mb-4">
                    {activeDemo.step2Visual.tags.map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-seagreen-seafoam font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 text-center">
                  ⚡ Real-time 3D Viewport Updates Synchronously
                </div>
              </div>

              {/* STEP 3: DIGIVERSE TELLS YOU YOUR PROFILE & TRADEOFF */}
              <div className="p-6 rounded-2xl bg-black/40 border border-seagreen-gold/50 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-seagreen-gold/20 text-[10px] font-mono font-bold text-seagreen-gold uppercase mb-3 border border-seagreen-gold/30">
                    <span>STEP 3: YOUR FUTURE & TRADEOFF</span>
                  </div>
                  <h4 className="editorial-serif text-xl font-bold text-seagreen-gold mb-1">
                    {activeDemo.step3Profile.archetype}
                  </h4>

                  {/* 4 Score Metrics */}
                  <div className="grid grid-cols-2 gap-2 my-3">
                    <div className="p-2 rounded-lg bg-white/5 text-[11px] font-mono">
                      <span className="text-white/60 block text-[10px]">Technology</span>
                      <span className="font-bold text-cyan-300">{activeDemo.step3Profile.scores.tech}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-[11px] font-mono">
                      <span className="text-white/60 block text-[10px]">Efficiency</span>
                      <span className="font-bold text-emerald-300">{activeDemo.step3Profile.scores.efficiency}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-[11px] font-mono">
                      <span className="text-white/60 block text-[10px]">Human Control</span>
                      <span className="font-bold text-amber-300">{activeDemo.step3Profile.scores.humanControl}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-[11px] font-mono">
                      <span className="text-white/60 block text-[10px]">Privacy</span>
                      <span className="font-bold text-purple-300">{activeDemo.step3Profile.scores.privacy}</span>
                    </div>
                  </div>

                  {/* BUT... Consequence Callout */}
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-100/90 leading-relaxed font-sans">
                    <span className="font-mono font-bold text-amber-300 block mb-0.5">⚠️ THE REAL CONSEQUENCE:</span>
                    <span>{activeDemo.step3Profile.tradeoffText}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    onDesignFuture?.();
                  }}
                  data-cursor="hover"
                  className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-seagreen-primary to-seagreen-secondary text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 transition-all border border-seagreen-gold/40 shadow-xs"
                >
                  <span>DESIGN YOUR OWN FUTURE</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
