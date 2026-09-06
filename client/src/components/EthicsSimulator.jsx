import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ETHICS_SCENARIOS } from '../data/futureData';
import sound from '../utils/sound';
import { 
  Scale, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import EthicsSimulator3D from './3d/EthicsSimulator3D';

export default function EthicsSimulator() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [userChoices, setUserChoices] = useState({}); // { [scenarioId]: 'choiceA' | 'choiceB' | 'choiceC' }

  const currentScenario = ETHICS_SCENARIOS[activeScenarioIdx] || ETHICS_SCENARIOS[0];
  const selectedChoiceKey = userChoices[currentScenario.id];
  const selectedChoice = selectedChoiceKey ? currentScenario[selectedChoiceKey] : null;

  const handleSelectChoice = (scenarioId, choiceKey) => {
    sound.playChime();
    setUserChoices(prev => ({ ...prev, [scenarioId]: choiceKey }));
  };

  const handleScenarioChange = (idx) => {
    sound.playClick();
    setActiveScenarioIdx(idx);
  };

  return (
    <section 
      id="ethics" 
      className="py-28 sm:py-40 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0E433E] to-[#0A2F2B] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 -left-28 w-96 h-96 bg-seagreen-primary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/3 -right-28 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-seafoam mb-4 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Scale size={13} className="text-seagreen-gold" />
            <span>08 / Reflect</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Moral Trade-offs</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-5">
            Every future has a <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">cost</span>.
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            Technology is never completely free of consequences. Every breakthrough that makes life faster, easier, or safer carries an unspoken price tag. Step into three high-stakes dilemmas and decide where you draw the line.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/25 border border-white/10 text-xs font-mono text-seagreen-gold">
            <span className="font-bold">CORE FORMULA:</span>
            <span className="text-white">CHOICE</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">BENEFIT</span>
            <span>→</span>
            <span className="text-amber-300 font-bold">CONSEQUENCE</span>
          </div>
        </div>

        {/* 3 Dilemma Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {ETHICS_SCENARIOS.map((sc, idx) => {
            const isCurrent = activeScenarioIdx === idx;
            const hasChosen = !!userChoices[sc.id];
            return (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(idx)}
                data-cursor="hover"
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all border ${
                  isCurrent
                    ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-0.5'
                    : 'bg-white/5 border-white/10 text-seagreen-seafoam/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="font-mono text-xs text-seagreen-gold">0{idx + 1}</span>
                <span>{sc.category}</span>
                {hasChosen && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Scenario Interactive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#124D46]/90 to-[#0A332F]/95 border border-seagreen-primary/30 shadow-2xl backdrop-blur-xl"
          >
            {/* Dilemma Header & Story context */}
            <div className="mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seagreen-primary/20 text-xs font-mono font-bold text-seagreen-gold border border-seagreen-gold/30">
                  <AlertTriangle size={13} />
                  <span>DILEMMA 0{activeScenarioIdx + 1} OF 03</span>
                </div>
                {selectedChoiceKey && (
                  <span className="text-xs font-sans text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 size={13} /> Decision Recorded
                  </span>
                )}
              </div>

              <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                {currentScenario.category}
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans font-normal mb-6">
                {currentScenario.dilemma}
              </p>

              {/* Benefit vs Cost Contrast Callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>The Societal Promise</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                    {currentScenario.benefitHeadline || 'Faster efficiency and predictive quality of life.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
                  <div className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <ShieldAlert size={13} />
                    <span>The Hidden Trade-off</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
                    {currentScenario.costHeadline || 'Potential loss of human control, privacy, or livelihood.'}
                  </p>
                </div>
              </div>

              {/* 3D Real-Time Ethical Grid Telemetry */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold">
                      3D CONSEQUENCE TELEMETRY
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-seagreen-seafoam">
                      Real-Time Autonomous Physics
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-seagreen-seafoam/60 hidden sm:inline">
                    Choice below dynamically adjusts transit speed & checkpoints
                  </span>
                </div>
                <EthicsSimulator3D selectedChoice={selectedChoiceKey || 'choiceA'} height="230px" />
              </div>
            </div>

            {/* 3 Choices */}
            <div className="space-y-4 mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold block">
                CHOOSE YOUR SYSTEMIC MANDATE:
              </span>

              {['choiceA', 'choiceB', 'choiceC'].map((cKey) => {
                const choice = currentScenario[cKey];
                if (!choice) return null;
                const isSelected = selectedChoiceKey === cKey;
                return (
                  <button
                    key={cKey}
                    onClick={() => handleSelectChoice(currentScenario.id, cKey)}
                    data-cursor="hover"
                    className={`w-full p-5 rounded-2xl text-left border transition-all duration-300 font-sans ${
                      isSelected
                        ? 'bg-gradient-to-r from-seagreen-dark/95 to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-0.5'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-base sm:text-lg flex items-center gap-2 text-white">
                        <span className="font-mono text-xs text-seagreen-gold uppercase">[{cKey.replace('choice', 'Option ')}]</span>
                        <span>{choice.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected 
                          ? 'bg-seagreen-gold border-seagreen-gold text-seagreen-deep' 
                          : 'border-white/20 text-transparent'
                      }`}>
                        <CheckCircle2 size={13} strokeWidth={3} />
                      </div>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-seagreen-seafoam' : 'text-white/60'}`}>
                      {choice.action}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Consequence Analysis Reveal (CHOICE -> BENEFIT -> CONSEQUENCE) */}
            <AnimatePresence>
              {selectedChoice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-2xl p-6 sm:p-7 bg-black/45 border border-seagreen-gold/40 shadow-inner"
                >
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold mb-3 flex items-center gap-2">
                    <Sparkles size={14} />
                    <span>SYSTEMIC CONSEQUENCE OF YOUR CHOICE</span>
                  </div>

                  <p className="text-sm sm:text-base text-white/95 leading-relaxed font-sans mb-5 italic border-l-2 border-seagreen-gold pl-4 py-1">
                    "{selectedChoice.consequence}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-sans">
                      <span className="font-bold text-emerald-300 block mb-1 text-sm">✅ Direct Benefit:</span>
                      <span className="text-emerald-100/85 leading-relaxed">{selectedChoice.benefit}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs font-sans">
                      <span className="font-bold text-amber-300 block mb-1 text-sm">⚠️ Consequence / Trade-off:</span>
                      <span className="text-amber-100/85 leading-relaxed">{selectedChoice.concern}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions & Navigation */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-seagreen-seafoam/70 font-sans">
                {Object.keys(userChoices).length} of {ETHICS_SCENARIOS.length} Dilemmas Weighed
              </span>

              <div className="flex items-center gap-3">
                {activeScenarioIdx < ETHICS_SCENARIOS.length - 1 ? (
                  <button
                    onClick={() => handleScenarioChange(activeScenarioIdx + 1)}
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-seagreen-primary/30 hover:bg-seagreen-primary/50 text-seagreen-gold border border-seagreen-gold/40 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Next Dilemma</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <a
                    href="#ai"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-seagreen-gold to-[#E2C78A] text-seagreen-deep font-sans font-bold text-xs uppercase tracking-wider hover:shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <span>Ask the Future AI</span>
                    <ArrowRight size={13} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
