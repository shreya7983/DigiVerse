import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, Leaf, Heart, BookOpen, Building2 } from 'lucide-react';

export default function Introduction({ onProceedToDomains }) {
  const [activeConcept, setActiveConcept] = useState(0);

  const concepts = [
    {
      id: 'live',
      icon: Heart,
      title: 'How We Live',
      question: 'Will our living spaces nurture solitude, or monetize our attention?',
      choiceA: 'Passive algorithmic consumption & fragmented attention loops',
      choiceB: 'Intentional ambient spaces designed for deep restoration & family presence',
    },
    {
      id: 'learn',
      icon: BookOpen,
      title: 'How We Learn',
      question: 'Will education standardize minds, or cultivate distinct human curiosity?',
      choiceA: 'Automated rote curriculum testing memory benchmarks',
      choiceB: 'Socratic co-learning companions that nurture critical thinking & creative joy',
    },
    {
      id: 'work',
      icon: Sparkles,
      title: 'How We Work',
      question: 'Will machines displace human purpose, or elevate our creative agency?',
      choiceA: 'Automated surveillance of human output metrics',
      choiceB: 'Symbiotic tools liberating people for philosophy, craft, and care',
    },
    {
      id: 'cities',
      icon: Building2,
      title: 'How Cities Function',
      question: 'Will urban centers become concrete tracking grids, or living ecosystems?',
      choiceA: 'Car-dominated, heat-trapping asphalt corridors with biometric surveillance',
      choiceB: 'Walkable biophilic corridors powered by quiet kinetic transit & solar canopies',
    },
    {
      id: 'ai',
      icon: Shield,
      title: 'How We Interact With AI',
      question: 'Will AI remain an opaque monopoly, or a transparent civic commons?',
      choiceA: 'Black-box algorithms maximizing engagement and psychological nudges',
      choiceB: 'Interpretable, locally verifiable systems serving human dignity',
    },
    {
      id: 'planet',
      icon: Leaf,
      title: 'How We Protect The Planet',
      question: 'Will computing accelerate resource depletion, or regenerate the biosphere?',
      choiceA: 'Exponential silicon obsolescence and unmanaged toxic e-waste dumps',
      choiceB: 'Circular biodegradable hardware & carbon-negative geothermal computing',
    }
  ];

  return (
    <section
      id="intro"
      className="py-32 sm:py-44 px-6 sm:px-8 bg-seagreen-cream text-white border-t border-seagreen-primary/25 relative overflow-hidden"
    >
      {/* Soft emerald light diffuser */}
      <div className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 bg-seagreen-primary/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -left-24 w-80 h-80 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cinematic Staggered Phrase-by-Phrase Text Reveal */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-6"
          >
            <span>Manifesto</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">The Agency of Choice</span>
          </motion.div>

          <h2 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-4"
            >
              What if
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-4 text-seagreen-seafoam font-normal italic"
            >
              the future
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block sm:inline"
            >
              wasn't predetermined?
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-2xl text-seagreen-seafoam/90 leading-relaxed font-sans font-normal"
          >
            Technology does not simply happen to humanity. Every system, algorithm, and urban streetscape is an artifact of deliberate human choices. When we surrender agency, technology becomes extractive. When we design with intention, it becomes transformative.
          </motion.p>
        </div>

        {/* Split-Screen Interactive Storytelling Rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Concept Choice Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-[11px] uppercase tracking-widest font-bold text-seagreen-seafoam/70 mb-2 font-sans">
              Six Critical Inflection Points
            </span>
            {concepts.map((item, index) => {
              const Icon = item.icon;
              const isSelected = activeConcept === index;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveConcept(index)}
                  data-cursor="hover"
                  className={`group flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-seagreen-dark/95 to-seagreen-deep/80 border border-seagreen-gold/50 shadow-lg -translate-x-1'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-seagreen-gold text-seagreen-dark shadow-sm'
                          : 'bg-white/10 text-seagreen-seafoam group-hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-seagreen-seafoam/70 line-clamp-1">{item.question}</div>
                    </div>
                  </div>
                  <span
                    className={`text-xs transition-transform duration-200 ${
                      isSelected ? 'text-seagreen-gold translate-x-1 font-bold' : 'text-white/30'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Contrast Display Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeConcept}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-br from-[#134D46]/90 to-[#0A332F]/95 rounded-3xl p-8 sm:p-10 border border-seagreen-primary/35 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  {React.createElement(concepts[activeConcept].icon, {
                    size: 22,
                    className: 'text-seagreen-gold'
                  })}
                  <h3 className="editorial-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {concepts[activeConcept].title}
                  </h3>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-seagreen-primary/30 text-seagreen-seafoam font-semibold border border-seagreen-primary/40">
                  0{activeConcept + 1} / 06
                </span>
              </div>

              <div className="text-lg font-serif italic text-white/90 mb-8">
                "{concepts[activeConcept].question}"
              </div>

              {/* The Two Paths Contrast */}
              <div className="space-y-5 mb-8">
                {/* Path A: Default drift */}
                <div className="p-5 rounded-2xl bg-black/25 border border-white/10 text-left">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                    <span className="w-2 h-2 rounded-full bg-white/40" />
                    <span>Path of Passive Drift (Unexamined Tech)</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {concepts[activeConcept].choiceA}
                  </p>
                </div>

                {/* Path B: Intentional sea-green design */}
                <div className="p-5 rounded-2xl bg-seagreen-primary/20 border border-seagreen-gold/40 text-left shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-seagreen-gold">
                    <span className="w-2 h-2 rounded-full bg-seagreen-gold" />
                    <span>Path of DigiVerse Design (Human Flourishing)</span>
                  </div>
                  <p className="text-sm text-seagreen-seafoam font-medium leading-relaxed font-sans">
                    {concepts[activeConcept].choiceB}
                  </p>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-seagreen-seafoam/70 font-sans">
                  Design creates the reality tomorrow will inhabit.
                </span>
                <button
                  onClick={onProceedToDomains}
                  data-cursor="hover"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white text-xs font-semibold hover:brightness-110 transition-all shadow-seagreen border border-seagreen-gold/40"
                >
                  <span>Explore the 6 Directions</span>
                  <ArrowRight size={14} className="text-seagreen-gold" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
