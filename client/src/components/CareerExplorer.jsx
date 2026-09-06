import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAREERS_2040 } from '../data/futureData';
import sound from '../utils/sound';
import { 
  Briefcase, 
  Sparkles, 
  Cpu, 
  Code2, 
  Palette, 
  Building, 
  HeartPulse, 
  Leaf, 
  ShieldCheck, 
  Layers, 
  Flame,
  ArrowRight
} from 'lucide-react';

export default function CareerExplorer() {
  const [activeCareerId, setActiveCareerId] = useState('ai_synthesist');

  const currentCareer = CAREERS_2040.find(c => c.id === activeCareerId) || CAREERS_2040[0];

  const getFieldIcon = (id) => {
    switch (id) {
      case 'ai_synthesist': return <Cpu size={16} />;
      case 'software': return <Code2 size={16} />;
      case 'design': return <Palette size={16} />;
      case 'business': return <Building size={16} />;
      case 'health': return <HeartPulse size={16} />;
      case 'environment': return <Leaf size={16} />;
      default: return <Briefcase size={16} />;
    }
  };

  const handleSelectCareer = (id) => {
    sound.playClick();
    setActiveCareerId(id);
  };

  return (
    <section 
      id="careers" 
      className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0E433E] to-[#0C3E3A] text-white relative overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/4 -left-28 w-96 h-96 bg-seagreen-primary/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -right-28 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Briefcase size={13} className="text-seagreen-gold" />
            <span>Workforce Evolution</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Careers in 2040</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            Your Profession in <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">2040</span>
          </h2>

          <p className="text-base sm:text-xl text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            As repetitive cognitive tasks are automated, work does not disappear—it elevates into judgment, creative vision, and relational care. Discover how primary industries transform.
          </p>
        </div>

        {/* Industry Pill Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {CAREERS_2040.map((career) => {
            const isActive = activeCareerId === career.id;
            return (
              <button
                key={career.id}
                onClick={() => handleSelectCareer(career.id)}
                data-cursor="hover"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-0.5'
                    : 'bg-white/5 border-white/10 text-seagreen-seafoam/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={isActive ? 'text-seagreen-gold' : ''}>{getFieldIcon(career.id)}</span>
                <span>{career.field.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Career Evolution Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCareer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#124D46]/90 to-[#0A332F]/95 border border-seagreen-primary/30 shadow-2xl backdrop-blur-xl"
          >
            {/* Role Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seagreen-primary/20 text-xs font-mono font-bold text-seagreen-gold mb-3 border border-seagreen-gold/30">
                  <span>EVOLVED FUTURE ROLE</span>
                  <span>·</span>
                  <span>{currentCareer.field}</span>
                </div>
                <h3 className="editorial-serif text-3xl sm:text-4xl font-bold text-white">
                  {currentCareer.role}
                </h3>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-seagreen-gold self-start md:self-auto">
                {getFieldIcon(currentCareer.id)}
              </div>
            </div>

            {/* Evolution Narrative */}
            <div className="mb-8 p-6 rounded-2xl bg-black/30 border border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold block mb-2">
                STRUCTURAL EVOLUTION FROM 2026 TO 2040
              </span>
              <p className="text-base text-white/90 leading-relaxed font-sans font-normal">
                {currentCareer.evolution}
              </p>
            </div>

            {/* 3 Skill & Tech Grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Future Skills */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold mb-3">
                  <Sparkles size={14} />
                  <span>2040 Technical Skills</span>
                </div>
                <ul className="space-y-2">
                  {currentCareer.futureSkills.map((sk, idx) => (
                    <li key={idx} className="text-xs text-seagreen-seafoam flex items-center gap-2 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Leveraged */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold mb-3">
                  <Layers size={14} />
                  <span>Primary Tech Stack</span>
                </div>
                <ul className="space-y-2">
                  {currentCareer.technologies.map((tech, idx) => (
                    <li key={idx} className="text-xs text-white/80 flex items-center gap-2 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-seagreen-primary" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evergreen Human Skills (Irreplaceable) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-seagreen-dark/40 to-seagreen-deep/60 border border-seagreen-gold/40">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold mb-3">
                  <Flame size={14} className="text-seagreen-gold" />
                  <span>Evergreen Human Capabilities</span>
                </div>
                <ul className="space-y-2">
                  {currentCareer.evergreenHumanSkills.map((eh, idx) => (
                    <li key={idx} className="text-xs text-seagreen-seafoam font-semibold flex items-center gap-2 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
                      <span>{eh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-seagreen-seafoam/70 font-sans">
                Human intuition remains the irreplaceable catalyst of every profession.
              </span>
              <a
                href="#simulator"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold hover:text-white transition-colors"
              >
                <span>Shape Your Profile</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
