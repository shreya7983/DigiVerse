import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sound from '../utils/sound';
import { 
  Sparkles, 
  Check, 
  Copy, 
  Share2, 
  Download, 
  RotateCcw, 
  ArrowRight,
  Fingerprint,
  Trees,
  Heart,
  Cpu,
  ShieldCheck,
  Car
} from 'lucide-react';

export default function FutureProfileResult({ profile, onReset, onExploreMore }) {
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const { archetype, scores, points } = profile;

  // Animated Radial Score Metric Component
  const ScoreMeter = ({ label, icon, score, strokeColor }) => {
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 text-center shadow-sm">
        <div className="relative w-20 h-20 flex items-center justify-center mb-2">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="5"
              fill="transparent"
            />
            <motion.circle
              cx="40"
              cy="40"
              r={radius}
              stroke={strokeColor}
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-bold font-mono text-white">{score}%</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-seagreen-seafoam font-sans">
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      </div>
    );
  };

  const handleCopySummary = () => {
    sound.playClick();
    const text = `DigiVerse — YOUR FUTURE
Archetype: ${archetype.title}
"${archetype.tagline}"

Scores:
• 🌱 Sustainability: ${scores.sustainability}%
• ❤️ Human Wellbeing: ${scores.wellbeing}%
• 🤖 Technology: ${scores.technology}%
• 🔐 Privacy: ${scores.privacy}%
• 🏙️ Connectivity: ${scores.connectivity}%

${archetype.explanation}

Created on DigiVerse — The future isn't a destination. It's something we design.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSaveToVault = async () => {
    sound.playClick();
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/simulator/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        sound.playChime();
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleDownloadJSON = () => {
    sound.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `DigiVerse-Future-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-gradient-to-br from-[#124E47]/95 via-[#0E433E]/98 to-[#0A332F] rounded-3xl p-6 sm:p-12 border-2 border-seagreen-gold/50 shadow-2xl backdrop-blur-2xl relative overflow-hidden text-white"
    >
      {/* Decorative watermark stamp */}
      <div className="absolute top-4 right-4 pointer-events-none opacity-5 text-seagreen-gold">
        <Fingerprint size={160} />
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-seagreen-gold/20 text-xs font-mono font-bold text-seagreen-gold mb-3 border border-seagreen-gold/40">
            <Sparkles size={13} />
            <span>YOUR SPECULATIVE RESULT</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
            YOUR FUTURE
          </h2>

          <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-seagreen-gold">
            {archetype.title}
          </h3>

          <p className="text-sm sm:text-base font-serif italic text-seagreen-seafoam mt-1">
            "{archetype.tagline}"
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSaveToVault}
            disabled={saveStatus === 'saving' || saveStatus === 'saved'}
            data-cursor="hover"
            className="px-5 py-2.5 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-sm bg-gradient-to-r from-seagreen-primary via-seagreen-secondary to-seagreen-primary text-white hover:brightness-110 border border-seagreen-gold/40 shadow-seagreen"
          >
            {saveStatus === 'saving' ? (
              <span>Saving...</span>
            ) : saveStatus === 'saved' ? (
              <>
                <Check size={14} className="text-seagreen-gold" />
                <span>Saved to Public Vault</span>
              </>
            ) : (
              <>
                <Share2 size={14} className="text-seagreen-gold" />
                <span>Save to Public Vault</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopySummary}
            data-cursor="hover"
            className="px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold hover:bg-white/20 flex items-center gap-1.5 transition-colors shadow-xs font-sans"
          >
            {copied ? <Check size={14} className="text-seagreen-gold" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Share Result'}</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            data-cursor="hover"
            className="px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold hover:bg-white/20 flex items-center gap-1.5 transition-colors shadow-xs font-sans"
          >
            <Download size={14} className="text-seagreen-gold" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={onReset}
            data-cursor="hover"
            className="p-2.5 rounded-full bg-white/10 border border-white/15 text-white/70 hover:text-white hover:bg-white/20 transition-colors shadow-xs"
            title="Redesign Your Future"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* 2-3 Simple Sentence Explanation */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 mb-10 text-base sm:text-lg text-white/95 leading-relaxed font-sans font-normal shadow-xs">
        {archetype.explanation}
      </div>

      {/* 5 Animated Scores */}
      <div className="mb-10">
        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold mb-5">
          Calculated Systemic Balance (5 Dimensions)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <ScoreMeter
            label="Sustainability"
            icon="🌱"
            score={scores.sustainability}
            strokeColor="#34D399"
          />
          <ScoreMeter
            label="Human Wellbeing"
            icon="❤️"
            score={scores.wellbeing}
            strokeColor="#F472B6"
          />
          <ScoreMeter
            label="Technology"
            icon="🤖"
            score={scores.technology}
            strokeColor="#38BDF8"
          />
          <ScoreMeter
            label="Privacy"
            icon="🔐"
            score={scores.privacy}
            strokeColor="#A78BFA"
          />
          <ScoreMeter
            label="Connectivity"
            icon="🏙️"
            score={scores.connectivity}
            strokeColor="#C8A96B"
          />
        </div>
      </div>

      {/* Core Strengths */}
      <div className="p-6 rounded-2xl bg-black/25 border border-white/10 mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold block mb-3">
          CORE STRENGTHS OF YOUR SPECULATIVE MODEL:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {archetype.strengths.map((st, idx) => (
            <span key={idx} className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white border border-white/15">
              • {st}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-seagreen-seafoam/70 font-sans">
          Speculative profile generated with 100 Future Points allocation.
        </span>

        <a
          href="#ethics"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-seagreen-gold hover:text-white transition-colors"
        >
          <span>Examine the Ethical Consequences</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}
