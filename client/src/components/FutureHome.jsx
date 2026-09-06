import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import SmartHome3D from './3d/SmartHome3D';
import { Sun, Coffee, Thermometer, Zap, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export default function FutureHome() {
  const [userChoice, setUserChoice] = useState(null); // 'yes' | 'maybe' | 'no'

  const handleChoice = (choice) => {
    sound.playChime(580);
    setUserChoice(choice);
  };

  return (
    <section 
      id="home-scenario" 
      className="py-28 sm:py-36 px-6 sm:px-8 bg-[#F6F3EC] text-[#17201F] relative overflow-hidden transition-colors"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill Kicker */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#176B63]/10 text-xs font-mono font-bold uppercase tracking-wider text-[#176B63] mb-4 border border-[#176B63]/20">
            <span>01 — DOMESTIC HABITAT</span>
            <span>·</span>
            <span>2040 EVERYDAY LIFE</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0E4F4A] mb-4">
            What if your home could <span className="font-script-accent text-5xl sm:text-7xl text-[#C8A96B] font-normal lowercase inline-block">adapt to you?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#17201F]/70 font-sans max-w-xl mx-auto leading-relaxed">
            Powered by connected devices and local AI. Technology inside the home is invisible, calm, and attuned to your natural body rhythm.
          </p>
        </div>

        {/* 3D Smart Home Cutaway Model */}
        <div className="mb-12 shadow-2xl rounded-3xl overflow-hidden border border-[#176B63]/20">
          <SmartHome3D height="540px" />
        </div>

        {/* Visual Story Card & Interactive Decision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Storyline (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#176B63]/15 shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-[#17201F]/10 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold text-[#176B63]">7:30 AM</span>
                <span className="text-[#17201F]/30">·</span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C8A96B]">CIRCADIAN WAKE SEQUENCE</span>
              </div>
              <Sun size={20} className="text-amber-500 animate-spin-slow" />
            </div>

            {/* 4 Story Beats */}
            <div className="space-y-4 mb-2">
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#EAF7F4] border border-[#176B63]/10">
                <div className="w-10 h-10 rounded-xl bg-[#176B63] text-white flex items-center justify-center shrink-0">
                  <Sun size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0E4F4A]">The curtains open.</h4>
                  <p className="text-xs text-[#17201F]/70">Electrochromic glass channels natural dawn warmth into your room.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#EAF7F4] border border-[#176B63]/10">
                <div className="w-10 h-10 rounded-xl bg-[#2F8F83] text-white flex items-center justify-center shrink-0">
                  <Thermometer size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0E4F4A]">The temperature adjusts.</h4>
                  <p className="text-xs text-[#17201F]/70">Sub-floor geothermal heat calibrates smoothly to your waking body temperature.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#EAF7F4] border border-[#176B63]/10">
                <div className="w-10 h-10 rounded-xl bg-[#C8A96B] text-white flex items-center justify-center shrink-0">
                  <Coffee size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0E4F4A]">Your coffee is ready.</h4>
                  <p className="text-xs text-[#17201F]/70">Brewed at the precise moment you step out of bed, without you pressing a button.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#EAF7F4] border border-[#176B63]/10">
                <div className="w-10 h-10 rounded-xl bg-[#0E4F4A] text-white flex items-center justify-center shrink-0">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0E4F4A]">Your energy usage is optimized.</h4>
                  <p className="text-xs text-[#17201F]/70">Excess solar stored overnight distributes quietly into the neighborhood grid.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Decision Box (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0E4F4A] to-[#176B63] text-white rounded-3xl p-8 border border-white/10 shadow-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-seagreen-gold block mb-2">
              YOUR DECISION
            </span>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mb-6">
              Would you want a home like this?
            </h3>

            {/* 3 Choice Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleChoice('yes')}
                data-cursor="hover"
                className={`w-full py-3.5 px-5 rounded-2xl font-sans font-bold text-sm text-left transition-all flex items-center justify-between border ${
                  userChoice === 'yes'
                    ? 'bg-seagreen-gold text-[#0E4F4A] border-white shadow-gold'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
              >
                <span>YES — I love effortless comfort</span>
                {userChoice === 'yes' && <CheckCircle2 size={16} />}
              </button>

              <button
                onClick={() => handleChoice('maybe')}
                data-cursor="hover"
                className={`w-full py-3.5 px-5 rounded-2xl font-sans font-bold text-sm text-left transition-all flex items-center justify-between border ${
                  userChoice === 'maybe'
                    ? 'bg-seagreen-gold text-[#0E4F4A] border-white shadow-gold'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
              >
                <span>MAYBE — As long as my privacy is safe</span>
                {userChoice === 'maybe' && <CheckCircle2 size={16} />}
              </button>

              <button
                onClick={() => handleChoice('no')}
                data-cursor="hover"
                className={`w-full py-3.5 px-5 rounded-2xl font-sans font-bold text-sm text-left transition-all flex items-center justify-between border ${
                  userChoice === 'no'
                    ? 'bg-seagreen-gold text-[#0E4F4A] border-white shadow-gold'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
              >
                <span>NO — I want manual control</span>
                {userChoice === 'no' && <CheckCircle2 size={16} />}
              </button>
            </div>

            {/* Secondary Reveal */}
            <AnimatePresence>
              {userChoice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-white/15"
                >
                  <div className="p-4 rounded-2xl bg-black/30 border border-seagreen-gold/30 text-xs font-sans text-seagreen-seafoam">
                    <span className="font-mono text-seagreen-gold font-bold block mb-1">
                      BEHIND THIS EXPERIENCE:
                    </span>
                    <span>AI + ambient connected sensors + decentralized zero-emission microgrids.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
