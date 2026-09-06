import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import { 
  Clock, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Heart
} from 'lucide-react';

export const DAY_CHAPTERS = [
  {
    time: '7:00 AM',
    title: 'Wake up.',
    period: 'Morning',
    icon: '🌅',
    headline: 'The environment has already adapted to you.',
    story: 'No abrasive alarm. Electrochromic glass softens from nocturnal deep teal to golden morning sunlight. Air microbiome filters infuse subtle mountain cedar.',
    choicePrompt: 'How do you want to begin your morning?',
    choiceA: { label: 'Listen to ambient dawn birdsong', outcome: 'Your nervous system eases into calm wakefulness with zero dopamine spike.' },
    choiceB: { label: 'Listen to gentle spoken briefing', outcome: 'Your audio copilot summarizes high-priority research in warm, natural prose.' }
  },
  {
    time: '8:15 AM',
    title: 'Your transport arrives.',
    period: 'Morning',
    icon: '🚗',
    headline: 'Silent kinetic pod at your doorstep.',
    story: 'You step outside onto a tree-lined pedestrian avenue. An aerodynamic shared pod glides silently to the curb with zero traffic horns or exhaust.',
    choicePrompt: 'Choose your in-transit environment:',
    choiceA: { label: 'Quiet meditation lounge', outcome: 'Soft acoustic damping creates a tranquil space to organize your thoughts.' },
    choiceB: { label: 'Panoramic skyroof studio', outcome: 'Electrochromic ceiling turns clear, revealing the vertical botanical skyscrapers above.' }
  },
  {
    time: '10:30 AM',
    title: 'AI handles repetitive work.',
    period: 'Midday',
    icon: '🧠',
    headline: 'Liberating human time for strategy and craft.',
    story: 'Your cognitive copilot reconciles complex municipal data, drafts regulatory filings, and runs simulation models in the background without tedious clicking.',
    choicePrompt: 'How will you direct your liberated hours?',
    choiceA: { label: 'Lead high-level ethical deliberation', outcome: 'You guide team members in aligning algorithmic decisions with citizen welfare.' },
    choiceB: { label: 'Hands-on creative prototyping', outcome: 'You spend unhurried hours sketching physical architectural materials in the maker studio.' }
  },
  {
    time: '1:00 PM',
    title: 'Your health system notices unusual stress.',
    period: 'Afternoon',
    icon: '🥗',
    headline: 'Subtle cellular detection before fatigue sets in.',
    story: 'Continuous metabolic smart textiles note a subtle spike in cortisol and suggest a restorative break before mental fatigue degrades your focus.',
    choicePrompt: 'How do you respond to the wellness prompt?',
    choiceA: { label: 'Take a 15-minute garden walk', outcome: 'Fresh oxygen from rooftop pollinator gardens resets your autonomic nervous system.' },
    choiceB: { label: 'Enjoy nutrient-dense botanical tea', outcome: 'Custom bio-available electrolytes are dispensed at the district greenhouse cafe.' }
  },
  {
    time: '6:00 PM',
    title: 'You return home.',
    period: 'Evening',
    icon: '🏡',
    headline: 'A peaceful sanctuary welcoming you back.',
    story: 'The pod glides back to your residential courtyard. Vehicle lanes are underground; streets above are vibrant with children playing and neighbors sharing dinner.',
    choicePrompt: 'How will you spend your evening?',
    choiceA: { label: 'Cook dinner with vertical garden produce', outcome: 'Crisp heirloom vegetables harvested less than 20 meters from your kitchen.' },
    choiceB: { label: 'Join neighborhood deliberative assembly', outcome: 'You deliberate with neighbors on civic planning under warm bioluminescent lighting.' }
  },
  {
    time: '9:00 PM',
    title: 'Your digital assistant asks:',
    period: 'Night',
    icon: '🌙',
    headline: '"Would you like to disconnect?"',
    story: 'As ambient city lighting dims for dark-sky star observation, your interface offers total air-gapped solitude. No algorithmic notifications, no tracking.',
    choicePrompt: 'Make your final decision for the day:',
    choiceA: { label: 'YES — Engage Sovereign Solitude', outcome: 'Hardware air-gap engaged. Your mind rests, sovereign and completely unmonetized.' },
    choiceB: { label: 'Keep subtle ambient safety monitors', outcome: 'Essential emergency signals remain active while all advertising and feeds are silenced.' }
  }
];

export default function DayIn2040() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userDecisions, setUserDecisions] = useState({}); // { [idx]: 'choiceA' | 'choiceB' }

  const currentChapter = DAY_CHAPTERS[activeIdx];
  const userDecision = userDecisions[activeIdx];

  const handleSelectChapter = (idx) => {
    sound.playClick();
    setActiveIdx(idx);
  };

  const handleMakeDecision = (choiceKey) => {
    sound.playChime(650);
    setUserDecisions(prev => ({ ...prev, [activeIdx]: choiceKey }));
  };

  const prevChapter = () => {
    sound.playClick();
    setActiveIdx(prev => (prev > 0 ? prev - 1 : DAY_CHAPTERS.length - 1));
  };

  const nextChapter = () => {
    sound.playClick();
    setActiveIdx(prev => (prev < DAY_CHAPTERS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section 
      id="day-in-2040" 
      className="py-32 sm:py-40 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0E4F4A] to-[#0A332F] text-white relative overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/3 -right-32 w-96 h-96 bg-seagreen-secondary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/3 -left-32 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Clock size={13} className="text-seagreen-gold" />
            <span>Interactive Storytelling</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">One Fictional Day</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            LIVE A DAY IN <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">2040</span>
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Scroll through one person's day. Make micro-decisions along the journey and feel how subtle, human-aligned technology restores tranquility to daily life.
          </p>
        </div>

        {/* Chronological Timeline Buttons */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 mb-10">
          {DAY_CHAPTERS.map((ch, idx) => {
            const isSelected = activeIdx === idx;
            const hasChosen = !!userDecisions[idx];
            return (
              <button
                key={ch.time}
                onClick={() => handleSelectChapter(idx)}
                data-cursor="hover"
                className={`flex flex-col items-center shrink-0 p-3 rounded-2xl border transition-all duration-300 font-sans min-w-[100px] ${
                  isSelected
                    ? 'bg-gradient-to-br from-seagreen-gold to-[#D4B77C] text-[#0E4F4A] border-white shadow-gold scale-105'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl mb-1">{ch.icon}</span>
                <span className="font-mono text-xs font-bold">{ch.time}</span>
                {hasChosen && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1" />}
              </button>
            );
          })}
        </div>

        {/* Story Narrative & Decision Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.time}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#124E47]/95 via-[#0E433E]/95 to-[#0A332F] border border-seagreen-gold/40 shadow-2xl backdrop-blur-xl"
          >
            {/* Top Chapter Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-seagreen-gold">
                  {currentChapter.time}
                </span>
                <span className="text-white/30 text-2xl">·</span>
                <span className="editorial-serif text-2xl sm:text-3xl font-bold text-white">
                  {currentChapter.title}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={prevChapter}
                  data-cursor="hover"
                  className="p-2 rounded-full bg-white/5 border border-white/15 hover:bg-white/15 text-white transition-colors"
                  aria-label="Previous story beat"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextChapter}
                  data-cursor="hover"
                  className="p-2 rounded-full bg-white/5 border border-white/15 hover:bg-white/15 text-white transition-colors"
                  aria-label="Next story beat"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Headline & Story Text */}
            <div className="mb-8">
              <h4 className="font-serif italic text-xl sm:text-2xl text-seagreen-gold mb-3">
                "{currentChapter.headline}"
              </h4>
              <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed">
                {currentChapter.story}
              </p>
            </div>

            {/* Micro-Choice Interactive Studio */}
            <div className="p-6 rounded-2xl bg-black/25 border border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold block mb-4">
                {currentChapter.choicePrompt}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => handleMakeDecision('choiceA')}
                  data-cursor="hover"
                  className={`p-4 rounded-xl text-left border font-sans text-xs sm:text-sm font-semibold transition-all ${
                    userDecision === 'choiceA'
                      ? 'bg-seagreen-gold text-[#0E4F4A] border-white shadow-gold font-bold'
                      : 'bg-white/5 border-white/15 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>Option A</span>
                    {userDecision === 'choiceA' && <CheckCircle2 size={14} />}
                  </div>
                  <div>{currentChapter.choiceA.label}</div>
                </button>

                <button
                  onClick={() => handleMakeDecision('choiceB')}
                  data-cursor="hover"
                  className={`p-4 rounded-xl text-left border font-sans text-xs sm:text-sm font-semibold transition-all ${
                    userDecision === 'choiceB'
                      ? 'bg-seagreen-gold text-[#0E4F4A] border-white shadow-gold font-bold'
                      : 'bg-white/5 border-white/15 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>Option B</span>
                    {userDecision === 'choiceB' && <CheckCircle2 size={14} />}
                  </div>
                  <div>{currentChapter.choiceB.label}</div>
                </button>
              </div>

              {/* Outcome reveal */}
              {userDecision && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-3 text-xs text-seagreen-seafoam font-sans italic"
                >
                  <span className="font-bold text-seagreen-gold not-italic">Outcome: </span>
                  {currentChapter[userDecision].outcome}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
