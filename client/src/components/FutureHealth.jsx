import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import FutureHospital3D from './3d/FutureHospital3D';
import { Stethoscope, Activity, AlertTriangle, ShieldCheck, ArrowDown, CheckCircle2, HeartPulse } from 'lucide-react';

export default function FutureHealth() {
  const [userChoice, setUserChoice] = useState(null); // 'yes' | 'maybe' | 'no'

  const handleChoice = (choice) => {
    sound.playChime(600);
    setUserChoice(choice);
  };

  return (
    <section 
      id="health-scenario" 
      className="py-28 sm:py-36 px-6 sm:px-8 bg-[#EAF7F4] text-[#17201F] relative overflow-hidden transition-colors border-t border-[#176B63]/10"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill Kicker */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#176B63]/10 text-xs font-mono font-bold uppercase tracking-wider text-[#176B63] mb-4 border border-[#176B63]/20">
            <span>02 — CELLULAR VITALITY</span>
            <span>·</span>
            <span>PREVENTIVE HEALTHCARE</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0E4F4A] mb-4">
            What if your doctor could detect a problem <span className="font-script-accent text-5xl sm:text-7xl text-[#C8A96B] font-normal lowercase inline-block">before you felt it?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#17201F]/70 font-sans max-w-xl mx-auto leading-relaxed">
            Powered by continuous cellular monitoring and personal health twins. Healthcare shifts from reactive crisis treatment to proactive everyday guardianship.
          </p>
        </div>

        {/* 3D Future Hospital Cutaway Model */}
        <div className="mb-12 shadow-2xl rounded-3xl overflow-hidden border border-[#176B63]/20">
          <FutureHospital3D height="540px" />
        </div>

        {/* Visual Flow Comparison: TODAY vs 2040 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* TODAY Flow */}
          <div className="p-8 rounded-3xl bg-white/80 border border-red-500/20 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#17201F]/10 mb-6">
              <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-wider px-3 py-1 rounded-full bg-red-50 border border-red-200">
                TODAY — REACTIVE SICK-CARE
              </span>
              <AlertTriangle size={18} className="text-red-500" />
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-center gap-3 text-xs sm:text-sm font-semibold text-red-900">
                <span className="font-mono text-red-500">01</span>
                <span>You develop symptoms and feel pain</span>
              </div>
              <div className="flex justify-center text-red-400">
                <ArrowDown size={16} />
              </div>
              <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-center gap-3 text-xs sm:text-sm font-semibold text-red-900">
                <span className="font-mono text-red-500">02</span>
                <span>You schedule an appointment & wait in clinic</span>
              </div>
              <div className="flex justify-center text-red-400">
                <ArrowDown size={16} />
              </div>
              <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-center gap-3 text-xs sm:text-sm font-semibold text-red-900">
                <span className="font-mono text-red-500">03</span>
                <span>Blood tests & diagnostic scans taken</span>
              </div>
              <div className="flex justify-center text-red-400">
                <ArrowDown size={16} />
              </div>
              <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-center gap-3 text-xs sm:text-sm font-semibold text-red-900">
                <span className="font-mono text-red-500">04</span>
                <span>Diagnosis after illness has already advanced</span>
              </div>
            </div>
          </div>

          {/* 2040 Flow */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0E4F4A] to-[#176B63] text-white border border-[#2F8F83]/40 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
              <span className="font-mono text-xs font-bold text-seagreen-gold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-seagreen-gold/30">
                2040 — PREVENTIVE GUARDIANSHIP
              </span>
              <HeartPulse size={18} className="text-seagreen-gold animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                <span className="font-mono text-seagreen-gold">01</span>
                <span>Continuous passive molecular monitoring via smart textiles</span>
              </div>
              <div className="flex justify-center text-seagreen-gold">
                <ArrowDown size={16} />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                <span className="font-mono text-seagreen-gold">02</span>
                <span>Early anomaly detected months before any physical sensation</span>
              </div>
              <div className="flex justify-center text-seagreen-gold">
                <ArrowDown size={16} />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                <span className="font-mono text-seagreen-gold">03</span>
                <span>Your physician is notified with targeted peptide recommendations</span>
              </div>
              <div className="flex justify-center text-seagreen-gold">
                <ArrowDown size={16} />
              </div>
              <div className="p-3.5 rounded-2xl bg-seagreen-gold text-[#0E4F4A] font-bold flex items-center gap-3 text-xs sm:text-sm shadow-gold">
                <span className="font-mono text-[#0E4F4A]">04</span>
                <span>Preventive care cures condition before illness ever starts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Decision Box */}
        <div className="p-8 rounded-3xl bg-white border border-[#176B63]/15 shadow-xl max-w-2xl mx-auto text-center">
          <h3 className="editorial-serif text-2xl font-bold text-[#0E4F4A] mb-4">
            Would you trust technology to monitor your health?
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
              YES — Save lives first
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
              MAYBE — Strict encryption only
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
              NO — Only when I ask
            </button>
          </div>

          {/* Reveal feedback */}
          <AnimatePresence>
            {userChoice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-[#17201F]/10 text-xs font-sans text-[#17201F]/70"
              >
                <span className="font-mono text-[#176B63] font-bold block mb-1">
                  BEHIND THIS EXPERIENCE:
                </span>
                <span>Non-invasive metabolic biosensors + molecular digital twins + personalized therapies.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
