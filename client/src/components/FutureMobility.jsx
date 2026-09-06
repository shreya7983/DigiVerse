import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import Mobility3DCanvas from './3d/Mobility3DCanvas';
import { Car, UserCheck, ShieldCheck, ArrowRight, CheckCircle2, Zap, Trees } from 'lucide-react';

export default function FutureMobility() {
  const [activeStep, setActiveStep] = useState(0);
  const [userChoice, setUserChoice] = useState(null);

  const journeySteps = [
    {
      step: '01',
      title: 'Person leaves home',
      desc: 'You step out to the curb with zero keys or parking tickets to worry about.',
      icon: '🚶'
    },
    {
      step: '02',
      title: 'Autonomous vehicle arrives',
      desc: 'A silent, aerodynamic pod glides up to the sidewalk within 45 seconds of your thought.',
      icon: '🚗'
    },
    {
      step: '03',
      title: 'Person enters & relaxes',
      desc: 'The interior is a warm wooden lounge with natural morning daylight and soft acoustic shielding.',
      icon: '☕'
    },
    {
      step: '04',
      title: 'Vehicle moves through city',
      desc: 'Magnetic levitation guides the pod along subterranean and green canopy lines at effortless speed.',
      icon: '⚡'
    },
    {
      step: '05',
      title: 'Traffic automatically adapts',
      desc: 'Millions of pods synchronize like a flock of birds. Zero red lights, zero gridlock, zero accidents.',
      icon: '🕊️'
    }
  ];

  const handleStep = (idx) => {
    sound.playClick();
    setActiveStep(idx);
  };

  const handleChoice = (choice) => {
    sound.playChime(640);
    setUserChoice(choice);
  };

  return (
    <section 
      id="mobility-scenario" 
      className="py-28 sm:py-36 px-6 sm:px-8 bg-[#EAF7F4] text-[#17201F] relative overflow-hidden transition-colors border-t border-[#176B63]/10"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill Kicker */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#176B63]/10 text-xs font-mono font-bold uppercase tracking-wider text-[#176B63] mb-4 border border-[#176B63]/20">
            <span>04 — FRICTIONLESS TRANSIT</span>
            <span>·</span>
            <span>AUTONOMOUS MOBILITY</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0E4F4A] mb-4">
            What if your car could <span className="font-script-accent text-5xl sm:text-7xl text-[#C8A96B] font-normal lowercase inline-block">drive itself?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#17201F]/70 font-sans max-w-xl mx-auto leading-relaxed">
            Powered by autonomous kinetic pod networks. Traffic accidents drop to zero, and 35% of land once paved for parking is returned to public parks and human community.
          </p>
        </div>

        {/* 3D Mobility Corridor Viewport */}
        <div className="mb-12 shadow-2xl rounded-3xl overflow-hidden border border-[#176B63]/20">
          <Mobility3DCanvas height="520px" />
        </div>

        {/* Step Animation Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#176B63]/15 shadow-xl mb-12">
          {/* Progress sequence */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {journeySteps.map((s, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={s.step}
                  onClick={() => handleStep(idx)}
                  data-cursor="hover"
                  className={`p-4 rounded-2xl text-left border transition-all duration-300 font-sans ${
                    isCurrent
                      ? 'bg-[#176B63] text-white border-[#176B63] shadow-md -translate-y-1'
                      : 'bg-[#F6F3EC] text-[#17201F]/80 border-transparent hover:border-[#176B63]/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className={`font-mono text-[11px] font-bold ${isCurrent ? 'text-seagreen-gold' : 'text-[#176B63]'}`}>
                    STEP {s.step}
                  </div>
                  <div className="text-xs font-bold truncate">{s.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed step reveal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#F6F3EC] border border-[#176B63]/15 flex items-center justify-between flex-wrap gap-6"
            >
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#176B63] block mb-1">
                  KINETIC POD SEQUENCE: {journeySteps[activeStep].step} OF 05
                </span>
                <h4 className="editorial-serif text-2xl font-bold text-[#0E4F4A] mb-2">
                  {journeySteps[activeStep].title}
                </h4>
                <p className="text-sm text-[#17201F]/80 font-sans max-w-xl">
                  {journeySteps[activeStep].desc}
                </p>
              </div>

              <button
                onClick={() => handleStep((activeStep + 1) % journeySteps.length)}
                data-cursor="hover"
                className="px-5 py-2.5 rounded-full bg-[#176B63] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#0E4F4A] transition-colors"
              >
                <span>Next Movement</span>
                <ArrowRight size={14} className="text-seagreen-gold" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Micro-Choice Decision Box */}
        <div className="p-8 rounded-3xl bg-white border border-[#176B63]/15 shadow-xl max-w-2xl mx-auto text-center">
          <h3 className="editorial-serif text-2xl font-bold text-[#0E4F4A] mb-4">
            Would you give up driving if cities became safer?
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
              YES — Eliminate accidents forever
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
              MAYBE — For daily commute only
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
              NO — I love the freedom of driving
            </button>
          </div>

          <AnimatePresence>
            {userChoice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-[#17201F]/10 text-xs text-[#17201F]/70"
              >
                <span className="font-bold text-[#176B63]">Behind this experience:</span> Synchronized V2X mesh communication + magnetic induction roads + on-demand aerodynamic shared pods.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
