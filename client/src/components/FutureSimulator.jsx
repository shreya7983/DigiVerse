import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FutureProfileResult from './FutureProfileResult';
import SimulatorCity3D from './3d/SimulatorCity3D';
import FutureProfile3D from './3d/FutureProfile3D';
import sound from '../utils/sound';
import { 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  Trees, 
  Heart, 
  Cpu, 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  Car, 
  Users,
  ArrowRight,
  Box,
  Layers
} from 'lucide-react';

export default function FutureSimulator({ onExploreMore, initialIntent }) {
  // 100 Future Points distribution across 8 dimensions
  const [points, setPoints] = useState({
    environment: 25,
    wellbeing: 15,
    technology: 15,
    health: 15,
    education: 10,
    privacy: 10,
    mobility: 5,
    community: 5,
  });

  React.useEffect(() => {
    if (!initialIntent) return;
    const intentPresets = {
      greener: { environment: 35, wellbeing: 15, technology: 10, health: 15, education: 10, privacy: 5, mobility: 5, community: 5 },
      human: { wellbeing: 30, community: 20, health: 15, education: 15, privacy: 10, environment: 5, technology: 5, mobility: 0 },
      smarter: { technology: 35, education: 15, mobility: 15, health: 15, environment: 10, privacy: 5, wellbeing: 5, community: 0 },
      connected: { mobility: 25, community: 20, technology: 15, environment: 15, health: 10, education: 5, privacy: 5, wellbeing: 5 },
      private: { privacy: 35, wellbeing: 15, environment: 15, health: 15, education: 10, technology: 5, community: 5, mobility: 0 },
    };
    if (intentPresets[initialIntent]) {
      setPoints(intentPresets[initialIntent]);
    }
  }, [initialIntent]);

  const [generatedProfile, setGeneratedProfile] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'schematic'

  const totalPointsUsed = useMemo(() => {
    return Object.values(points).reduce((sum, val) => sum + val, 0);
  }, [points]);

  const handleSliderChange = (key, value) => {
    sound.playClick();
    const numVal = Math.max(0, Math.min(50, Number(value)));
    setPoints(prev => {
      const currentOthers = Object.entries(prev)
        .filter(([k]) => k !== key)
        .reduce((sum, [, v]) => sum + v, 0);

      // If exceeding 100, clamp to remaining budget
      const allowedVal = Math.min(numVal, 100 - currentOthers);
      return { ...prev, [key]: Math.max(0, allowedVal) };
    });
  };

  const handleRandomize = () => {
    sound.playClick();
    const presets = [
      { environment: 30, wellbeing: 20, technology: 10, health: 15, education: 10, privacy: 5, mobility: 5, community: 5 },
      { environment: 10, wellbeing: 10, technology: 30, health: 15, education: 10, privacy: 5, mobility: 15, community: 5 },
      { environment: 15, wellbeing: 25, technology: 10, health: 10, education: 15, privacy: 15, mobility: 5, community: 5 },
      { environment: 10, wellbeing: 10, technology: 10, health: 10, education: 10, privacy: 35, mobility: 5, community: 10 },
      { environment: 20, wellbeing: 15, technology: 15, health: 15, education: 10, privacy: 10, mobility: 10, community: 5 },
    ];
    const picked = presets[Math.floor(Math.random() * presets.length)];
    setPoints(picked);
  };

  const handleReset = () => {
    sound.playClick();
    setPoints({
      environment: 25,
      wellbeing: 15,
      technology: 15,
      health: 15,
      education: 10,
      privacy: 10,
      mobility: 5,
      community: 5,
    });
    setGeneratedProfile(null);
  };

  const computeProfile = () => {
    sound.playSynthesis();

    // Calculated Scores (0-100%)
    const sustainability = Math.min(100, Math.max(30, Math.round(points.environment * 2.6 + points.health * 0.8 + points.community * 0.6 + 10)));
    const wellbeing = Math.min(100, Math.max(30, Math.round(points.wellbeing * 2.8 + points.health * 1.2 + points.education * 0.8 + points.community * 0.8 + 8)));
    const technology = Math.min(100, Math.max(30, Math.round(points.technology * 2.8 + points.mobility * 2.2 + points.education * 0.8 + 10)));
    const privacy = Math.min(100, Math.max(25, Math.round(points.privacy * 4.0 + (30 - points.technology) * 0.8 + 12)));
    const connectivity = Math.min(100, Math.max(30, Math.round(points.mobility * 3.2 + points.technology * 1.6 + points.community * 1.8 + 10)));

    // Derive 1 of the 5 Archetypes
    let archetype;
    if (points.environment >= 24 && points.environment >= points.technology) {
      archetype = {
        title: 'THE GREEN ARCHITECT',
        badge: '🌱 Ecological Harmony',
        tagline: 'You envision cities in symbiotic balance with the biosphere, where infrastructure actively heals the Earth.',
        explanation: 'You believe technology must reverse human carbon footprints. In your future, skyscrapers breathe as vertical forests, data centers heat public greenhouses, and clean closed-loop energy powers every community.',
        strengths: ['Planetary systems awareness', 'Closed-loop material design', 'Long-term ecological stewardship']
      };
    } else if (points.wellbeing + points.community >= 24 && points.wellbeing > points.technology) {
      archetype = {
        title: 'THE HUMAN-CENTRIC FUTURIST',
        badge: '❤️ Human Flourishing',
        tagline: 'You believe technology should improve human life without replacing what makes us human.',
        explanation: 'Your future is anchored in authentic connection, emotional wellbeing, and preserving quiet space for contemplation. Algorithms exist solely to protect human dignity, health, and face-to-face joy.',
        strengths: ['Deep psychological presence', 'Empathy for community welfare', 'Resistance to manipulative automation']
      };
    } else if (points.technology >= 24) {
      archetype = {
        title: 'THE TECHNOLOGY OPTIMIST',
        badge: '🤖 Cognitive Acceleration',
        tagline: 'You see computational synergy as humanity\'s greatest partner in unlocking discovery and eliminating tedium.',
        explanation: 'You embrace bold technological velocity. Intelligent systems handle administrative friction, synthetic biology resolves chronic disease, and human minds are liberated for cosmic exploration and art.',
        strengths: ['Visionary problem-solving', 'Confidence in human-AI synergy', 'High ambition for scientific breakthroughs']
      };
    } else if (points.privacy >= 18 || (points.privacy >= 14 && points.technology <= 12)) {
      archetype = {
        title: 'THE DIGITAL MINIMALIST',
        badge: '🔐 Sovereign Solitude',
        tagline: 'You advocate for sovereign solitude, quiet spaces, and keeping digital systems strictly in service of human agency.',
        explanation: 'You recognize that unmonitored human reflection is a fundamental sacred right. Your future enforces zero-knowledge encryption, air-gapped homes, and interfaces designed to be closed rather than addictive.',
        strengths: ['Uncompromising data sovereignty', 'Protection of mental focus', 'Clarity on ethical boundaries']
      };
    } else {
      archetype = {
        title: 'THE BALANCED FUTURIST',
        badge: '⚖️ Harmonic Synthesis',
        tagline: 'You balance technological progress with ecological guardianship, creating equitable harmony for all.',
        explanation: 'You reject false extremes. You recognize that humanity needs clean technology, vibrant communities, and ethical privacy working in unison to build a resilient and joyful tomorrow.',
        strengths: ['Holistic systems thinking', 'Fairness across societal layers', 'Pragmatic, resilient foresight']
      };
    }

    setGeneratedProfile({
      id: `profile-${Date.now()}`,
      archetype,
      scores: {
        sustainability,
        wellbeing,
        technology,
        privacy,
        connectivity,
      },
      points,
    });
  };

  const sliderMeta = [
    { key: 'environment', label: 'Environment', icon: '🌱', iconEl: Trees, desc: 'Parks, living green facades, clean air & solar' },
    { key: 'wellbeing', label: 'Human Wellbeing', icon: '❤️', iconEl: Heart, desc: 'Restorative solitude, mental health & calm paces' },
    { key: 'technology', label: 'Technology', icon: '🤖', iconEl: Cpu, desc: 'AI co-creation, smart infrastructure & automation' },
    { key: 'health', label: 'Healthcare', icon: '🏥', iconEl: HeartPulse, desc: 'Predictive cellular diagnostics & longevity twins' },
    { key: 'education', label: 'Education', icon: '📚', iconEl: GraduationCap, desc: 'Individualized curiosity & lifelong inquiry studios' },
    { key: 'privacy', label: 'Privacy', icon: '🔐', iconEl: ShieldCheck, desc: 'Zero-knowledge encryption & neuro-sovereignty' },
    { key: 'mobility', label: 'Mobility', icon: '🚇', iconEl: Car, desc: 'Quiet kinetic pods, pedestrian streets & zero crashes' },
    { key: 'community', label: 'Community', icon: '🤝', iconEl: Users, desc: 'Public plazas, maker gardens & civic gathering' },
  ];

  return (
    <section 
      id="simulator" 
      className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0E4F4A] to-[#0A332F] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 -right-24 w-96 h-96 bg-seagreen-secondary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -left-24 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Sliders size={13} className="text-seagreen-gold" />
            <span>Interactive Simulator</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">100 Future Points</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Now design <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">your future.</span>
          </h2>

          <p className="text-base sm:text-xl text-seagreen-seafoam/80 font-sans max-w-2xl mx-auto leading-relaxed">
            You have <span className="text-white font-bold">100 Future Points</span>. Distribute them across what you believe matters most. Watch the visual city on screen actively transform in real time.
          </p>
        </div>

        {/* Dynamic Studio: Simulator vs Result View */}
        <AnimatePresence mode="wait">
          {!generatedProfile ? (
            <motion.div
              key="simulator-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: 100 Points Allocator Sliders (7 cols) */}
              <div className="lg:col-span-7 bg-gradient-to-br from-[#124E47]/95 via-[#0E433E]/95 to-[#0A332F] rounded-3xl p-6 sm:p-8 border border-seagreen-secondary/35 shadow-2xl backdrop-blur-xl">
                {/* Budget Header Ribbon */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-seagreen-gold block">
                      RESOURCE ALLOCATOR
                    </span>
                    <h3 className="editorial-serif text-2xl font-bold text-white">
                      Your 100 Future Points
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRandomize}
                      data-cursor="hover"
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-seagreen-gold transition-colors"
                      title="Try a speculative preset"
                    >
                      <Shuffle size={16} />
                    </button>
                    <button
                      onClick={handleReset}
                      data-cursor="hover"
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                      title="Reset to default points"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <div className="text-right pl-3 border-l border-white/10">
                      <span className="font-mono text-xl font-bold text-seagreen-gold">
                        {totalPointsUsed} / 100
                      </span>
                      <span className="text-[9px] font-mono text-seagreen-seafoam/70 block uppercase">
                        Points Used
                      </span>
                    </div>
                  </div>
                </div>

                {/* 8 Slider Rows */}
                <div className="space-y-4 mb-8">
                  {sliderMeta.map((item) => {
                    const val = points[item.key];
                    return (
                      <div key={item.key} className="p-3.5 rounded-2xl bg-black/20 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-bold text-sm text-white font-sans">{item.label}</span>
                          </div>
                          <span className="font-mono text-sm font-bold text-seagreen-gold px-2.5 py-0.5 rounded-lg bg-white/5 border border-seagreen-gold/30">
                            {val} pts
                          </span>
                        </div>

                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={val}
                          onChange={(e) => handleSliderChange(item.key, e.target.value)}
                          data-cursor="hover"
                          className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#C8A96B] mb-1"
                        />

                        <div className="text-[11px] text-seagreen-seafoam/60 font-sans truncate">
                          {item.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Synthesize Button */}
                <button
                  onClick={computeProfile}
                  data-cursor="hover"
                  className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-seagreen-primary via-seagreen-secondary to-seagreen-primary text-white font-sans font-bold text-sm sm:text-base hover:brightness-110 transition-all border border-seagreen-gold shadow-gold flex items-center justify-center gap-3 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  <span>Synthesize Your Future Profile</span>
                  <Sparkles size={16} className="text-seagreen-gold transition-transform group-hover:scale-125" />
                </button>
              </div>

              {/* Right Column: Dynamic Visual City Canvas (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#145550]/95 via-[#0E433E]/95 to-[#0A332F] rounded-3xl p-6 sm:p-8 border border-seagreen-gold/40 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
                {/* Visual City Header */}
                <div className="pb-4 border-b border-white/10 mb-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-seagreen-gold block">
                      DYNAMIC VISUAL METROPOLIS
                    </span>
                    <h4 className="editorial-serif text-xl font-bold text-white">
                      Your Evolving 2040 City
                    </h4>
                  </div>
                  
                  {/* 3D vs 2D Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/15">
                    <button
                      onClick={() => { sound.playClick(); setViewMode('3d'); }}
                      data-cursor="hover"
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        viewMode === '3d'
                          ? 'bg-gradient-to-r from-seagreen-primary to-seagreen-secondary text-white shadow-xs border border-seagreen-gold/50'
                          : 'text-white/60 hover:text-white'
                      }`}
                      title="Switch to Interactive 3D City"
                    >
                      <Box size={12} />
                      <span>3D</span>
                    </button>
                    <button
                      onClick={() => { sound.playClick(); setViewMode('schematic'); }}
                      data-cursor="hover"
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        viewMode === 'schematic'
                          ? 'bg-gradient-to-r from-seagreen-primary to-seagreen-secondary text-white shadow-xs border border-seagreen-gold/50'
                          : 'text-white/60 hover:text-white'
                      }`}
                      title="Switch to 2D Blueprint Schematic"
                    >
                      <Layers size={12} />
                      <span>2D</span>
                    </button>
                  </div>
                </div>

                {/* Viewport: 3D City Canvas OR 2D SVG Schematic */}
                <div className="relative py-2 flex items-center justify-center flex-1">
                  {viewMode === '3d' ? (
                    <SimulatorCity3D points={points} height="360px" />
                  ) : (
                    <svg viewBox="0 0 400 320" className="w-full h-auto max-h-[320px]">
                      {/* Sky Tint based on Environment points */}
                      <rect
                        x="0"
                        y="0"
                        width="400"
                        height="320"
                        rx="16"
                        fill={points.environment >= 20 ? 'rgba(52, 211, 153, 0.12)' : 'rgba(234, 179, 8, 0.08)'}
                      />

                      {/* Sun / Energy Source */}
                      <circle cx="340" cy="50" r={22 + points.environment * 0.4} fill="#FBBF24" opacity="0.8" />

                      {/* DYNAMIC LAYER 1: Buildings & Technology Infrastructure */}
                      <rect x="50" y="90" width="55" height="150" fill="#0E4F4A" stroke="#2F8F83" strokeWidth="1.5" rx="4" />
                      <rect x="130" y="60" width="70" height="180" fill="#176B63" stroke="#2F8F83" strokeWidth="1.5" rx="4" />
                      <rect x="230" y="100" width="60" height="140" fill="#0E4F4A" stroke="#2F8F83" strokeWidth="1.5" rx="4" />
                      <rect x="310" y="130" width="50" height="110" fill="#124E47" stroke="#2F8F83" strokeWidth="1.5" rx="4" />

                      {/* DYNAMIC LAYER 2: Technology Points -> Smart Grid Telemetry & Pod Tracks */}
                      {points.technology >= 15 && (
                        <g>
                          <line x1="50" y1="120" x2="360" y2="120" stroke="#C8A96B" strokeWidth="2" strokeDasharray="6 4" opacity="0.8" />
                          <circle cx="165" cy="120" r="4" fill="#38BDF8" />
                          <circle cx="260" cy="120" r="4" fill="#38BDF8" />
                        </g>
                      )}

                      {/* DYNAMIC LAYER 3: Mobility Points -> Kinetic Transit Pod Line */}
                      {points.mobility >= 5 && (
                        <g>
                          <rect x="20" y="220" width="360" height="6" rx="3" fill="#2F8F83" />
                          <rect x="180" y="214" width="30" height="14" rx="4" fill="#C8A96B" />
                          <circle cx="195" cy="221" r="2" fill="#0E4F4A" />
                        </g>
                      )}

                      {/* DYNAMIC LAYER 4: Environment Points -> Greenery Canopies & Vertical Forests */}
                      {points.environment >= 10 && (
                        <g>
                          <circle cx="55" cy="115" r="7" fill="#34D399" />
                          <circle cx="100" cy="135" r="7" fill="#10B981" />
                          <circle cx="135" cy="90" r="8" fill="#34D399" />
                          <circle cx="195" cy="105" r="8" fill="#10B981" />
                          <circle cx="235" cy="130" r="7" fill="#34D399" />
                          <circle cx="285" cy="150" r="7" fill="#10B981" />
                        </g>
                      )}
                      {points.environment >= 25 && (
                        <g>
                          <circle cx="55" cy="160" r="9" fill="#10B981" />
                          <circle cx="135" cy="135" r="9" fill="#34D399" />
                          <circle cx="195" cy="150" r="9" fill="#10B981" />
                          <circle cx="235" cy="175" r="8" fill="#34D399" />
                          {/* Street Level Trees */}
                          <circle cx="90" cy="245" r="10" fill="#34D399" />
                          <circle cx="220" cy="245" r="12" fill="#10B981" />
                          <circle cx="310" cy="245" r="10" fill="#34D399" />
                        </g>
                      )}

                      {/* DYNAMIC LAYER 5: Privacy Points -> Sovereign Privacy Rings */}
                      {points.privacy >= 10 && (
                        <g>
                          <circle cx="165" cy="60" r="12" fill="none" stroke="#A78BFA" strokeWidth="2" strokeDasharray="3 3" />
                          <circle cx="75" cy="90" r="10" fill="none" stroke="#A78BFA" strokeWidth="2" strokeDasharray="3 3" />
                        </g>
                      )}

                      {/* Ground Street Promenade */}
                      <rect x="0" y="240" width="400" height="80" fill="#0A332F" />

                      {/* DYNAMIC LAYER 6: Community & Wellbeing -> Gathering Pedestrians */}
                      {points.community >= 5 && (
                        <g>
                          {/* People in public spaces */}
                          <circle cx="120" cy="265" r="3" fill="#D8F0EA" />
                          <line x1="120" y1="268" x2="120" y2="276" stroke="#D8F0EA" strokeWidth="2" />
                          <circle cx="130" cy="266" r="3" fill="#C8A96B" />
                          <line x1="130" y1="269" x2="130" y2="276" stroke="#C8A96B" strokeWidth="2" />

                          <circle cx="270" cy="265" r="3" fill="#34D399" />
                          <line x1="270" y1="268" x2="270" y2="276" stroke="#34D399" strokeWidth="2" />
                          <circle cx="280" cy="266" r="3" fill="#D8F0EA" />
                          <line x1="280" y1="269" x2="280" y2="276" stroke="#D8F0EA" strokeWidth="2" />
                        </g>
                      )}
                      {points.community >= 15 && (
                        <g>
                          <circle cx="190" cy="265" r="3.5" fill="#F472B6" />
                          <line x1="190" y1="268" x2="190" y2="278" stroke="#F472B6" strokeWidth="2" />
                          <circle cx="200" cy="266" r="3.5" fill="#C8A96B" />
                          <line x1="200" y1="269" x2="200" y2="278" stroke="#C8A96B" strokeWidth="2" />
                        </g>
                      )}
                    </svg>
                  )}
                </div>

                {/* Dynamic Real-Time Consequences Badge */}
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs font-sans text-seagreen-seafoam mt-4">
                  <span className="font-mono text-seagreen-gold font-bold block mb-1">
                    LIVE VISUAL STATE:
                  </span>
                  <span>
                    {points.environment >= 20 ? '• Lush vertical forests cooling streets. ' : '• Standard urban layout. '}
                    {points.technology >= 15 ? '• Smart cognitive grid active. ' : ''}
                    {points.community >= 10 ? '• High human gathering in plazas. ' : ''}
                    {points.privacy >= 15 ? '• Sovereign privacy shields engaged.' : ''}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <FutureProfile3D
                profileData={{
                  archetype: generatedProfile.archetype.title,
                  motto: generatedProfile.archetype.tagline,
                  scores: generatedProfile.scores,
                  rawPoints: points,
                }}
                onRedesign={handleReset}
              />
              <FutureProfileResult
                profile={generatedProfile}
                onReset={handleReset}
                onExploreMore={onExploreMore}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
