import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import FutureSchool3D from './3d/FutureSchool3D';
import { GraduationCap, Sparkles, User, Brain, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function FutureEducation() {
  const [learnerType, setLearnerType] = useState('visual'); // 'visual' | 'builder' | 'thinker'
  const [userChoice, setUserChoice] = useState(null);

  const handleLearnerChange = (type) => {
    sound.playClick();
    setLearnerType(type);
  };

  const handleChoice = (choice) => {
    sound.playChime(620);
    setUserChoice(choice);
  };

  const learnerContent = {
    visual: {
      label: 'Maya (Visual Explorer)',
      subject: 'Quantum Physics & Light',
      adaptation: 'The room transforms into a 3D holographic stellarator where light waves can be gently sculpted with hands.',
      pace: 'Fast visual simulation · Zero text memorization'
    },
    builder: {
      label: 'Leo (Hands-On Maker)',
      subject: 'Planetary Architecture',
      adaptation: 'Leo receives a physical cross-laminated timber block that reveals structural stress lines when held.',
      pace: 'Tactile physical craft · Real-world testing'
    },
    thinker: {
      label: 'Aria (Philosophical Inquirer)',
      subject: 'Ethics of Autonomous Systems',
      adaptation: 'An AI Socrates engages Aria in an interactive moral debate tailored to her counter-arguments.',
      pace: 'Deep dialectic dialogue · Critical discernment'
    }
  };

  const currentLearner = learnerContent[learnerType];

  return (
    <section 
      id="education-scenario" 
      className="py-28 sm:py-36 px-6 sm:px-8 bg-[#F6F3EC] text-[#17201F] relative overflow-hidden transition-colors border-t border-[#176B63]/10"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill Kicker */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#176B63]/10 text-xs font-mono font-bold uppercase tracking-wider text-[#176B63] mb-4 border border-[#176B63]/20">
            <span>03 — LIFELONG MASTERY</span>
            <span>·</span>
            <span>FUTURE EDUCATION</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0E4F4A] mb-4">
            What if every student <span className="font-script-accent text-5xl sm:text-7xl text-[#C8A96B] font-normal lowercase inline-block">learned differently?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#17201F]/70 font-sans max-w-xl mx-auto leading-relaxed">
            Powered by personalized inquiry studios and adaptive AI mentors. Standardized benchmarks disappear and curiosity becomes the curriculum, tailored to each human mind.
          </p>
        </div>

        {/* 3D Future School Cutaway Model */}
        <div className="mb-12 shadow-2xl rounded-3xl overflow-hidden border border-[#176B63]/20">
          <FutureSchool3D height="540px" />
        </div>

        {/* Visual Student Flow Studio */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#176B63]/15 shadow-xl mb-12">
          {/* Learner Switcher Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-[#17201F]/10 mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#176B63]">
              SELECT A STUDENT TO OBSERVE THEIR LESSON:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLearnerChange('visual')}
                data-cursor="hover"
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-sans transition-all ${
                  learnerType === 'visual'
                    ? 'bg-[#176B63] text-white shadow-sm'
                    : 'bg-[#EAF7F4] text-[#0E4F4A] hover:bg-[#176B63]/15'
                }`}
              >
                Visual Explorer
              </button>
              <button
                onClick={() => handleLearnerChange('builder')}
                data-cursor="hover"
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-sans transition-all ${
                  learnerType === 'builder'
                    ? 'bg-[#176B63] text-white shadow-sm'
                    : 'bg-[#EAF7F4] text-[#0E4F4A] hover:bg-[#176B63]/15'
                }`}
              >
                Hands-on Maker
              </button>
              <button
                onClick={() => handleLearnerChange('thinker')}
                data-cursor="hover"
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-sans transition-all ${
                  learnerType === 'thinker'
                    ? 'bg-[#176B63] text-white shadow-sm'
                    : 'bg-[#EAF7F4] text-[#0E4F4A] hover:bg-[#176B63]/15'
                }`}
              >
                Philosophical Inquirer
              </button>
            </div>
          </div>

          {/* Student → Learning System → Lesson Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
            {/* Step 1: Student */}
            <div className="p-6 rounded-2xl bg-[#EAF7F4] border border-[#176B63]/15 text-center">
              <div className="w-12 h-12 rounded-full bg-[#176B63] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                <User size={20} />
              </div>
              <div className="font-bold text-sm text-[#0E4F4A] mb-1">{currentLearner.label}</div>
              <div className="text-xs text-[#17201F]/60">Unique cognitive profile & natural curiosity</div>
            </div>

            {/* Step 2: Learning System */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0E4F4A] to-[#176B63] text-white text-center shadow-md">
              <div className="w-12 h-12 rounded-full bg-white/15 text-seagreen-gold flex items-center justify-center mx-auto mb-3 border border-seagreen-gold/30">
                <Brain size={20} />
              </div>
              <div className="font-bold text-sm text-white mb-1">Adaptive Synthesis System</div>
              <div className="text-xs text-seagreen-seafoam/80">Tailors pacing, sensory medium & depth in real time</div>
            </div>

            {/* Step 3: Personalized Lesson */}
            <AnimatePresence mode="wait">
              <motion.div
                key={learnerType}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-2xl bg-[#C8A96B]/15 border border-[#C8A96B]/40 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#C8A96B] text-[#0E4F4A] flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <BookOpen size={20} />
                </div>
                <div className="font-bold text-sm text-[#0E4F4A] mb-1">{currentLearner.subject}</div>
                <div className="text-xs text-[#17201F]/80 leading-relaxed font-sans">{currentLearner.adaptation}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 rounded-2xl bg-[#F6F3EC] border border-[#176B63]/15 text-xs text-[#0E4F4A] flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold">MEASURED FLOW STATE:</span>
            <span className="font-mono text-[#176B63] font-semibold">{currentLearner.pace}</span>
          </div>
        </div>

        {/* Micro-Choice Decision Box */}
        <div className="p-8 rounded-3xl bg-white border border-[#176B63]/15 shadow-xl max-w-2xl mx-auto text-center">
          <h3 className="editorial-serif text-2xl font-bold text-[#0E4F4A] mb-4">
            Would personalized learning make education better?
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <button
              onClick={() => handleChoice('yes')}
              data-cursor="hover"
              className={`w-full sm:w-auto px-7 py-3 rounded-full font-sans font-bold text-xs sm:text-sm transition-all border ${
                userChoice === 'yes'
                  ? 'bg-[#176B63] text-white border-[#176B63] shadow-md'
                  : 'bg-[#EAF7F4] text-[#0E4F4A] border-[#176B63]/20 hover:bg-[#176B63]/10'
              }`}
            >
              YES — Every child thrives uniquely
            </button>

            <button
              onClick={() => handleChoice('maybe')}
              data-cursor="hover"
              className={`w-full sm:w-auto px-7 py-3 rounded-full font-sans font-bold text-xs sm:text-sm transition-all border ${
                userChoice === 'maybe'
                  ? 'bg-[#176B63] text-white border-[#176B63] shadow-md'
                  : 'bg-[#EAF7F4] text-[#0E4F4A] border-[#176B63]/20 hover:bg-[#176B63]/10'
              }`}
            >
              MAYBE — Human teachers must lead
            </button>

            <button
              onClick={() => handleChoice('no')}
              data-cursor="hover"
              className={`w-full sm:w-auto px-7 py-3 rounded-full font-sans font-bold text-xs sm:text-sm transition-all border ${
                userChoice === 'no'
                  ? 'bg-[#176B63] text-white border-[#176B63] shadow-md'
                  : 'bg-[#EAF7F4] text-[#0E4F4A] border-[#176B63]/20 hover:bg-[#176B63]/10'
              }`}
            >
              NO — Shared curriculum is essential
            </button>
          </div>

          <AnimatePresence>
            {userChoice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-[#17201F]/10 text-xs text-[#17201F]/70"
              >
                <span className="font-bold text-[#176B63]">Behind this experience:</span> Neuro-adaptive Socratic models + project-based human craftsmanship studios.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
