import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import FutureCityCanvas from './3d/FutureCityCanvas';
import { 
  Home as HomeIcon, 
  HeartPulse, 
  GraduationCap, 
  Car, 
  Leaf, 
  Briefcase, 
  Users, 
  Compass, 
  ArrowRight,
  Eye,
  Layers
} from 'lucide-react';

export const WORLD_ZONES = [
  {
    id: 'home',
    title: 'Smart Home',
    subtitle: 'Adaptive Living Habitat',
    icon: HomeIcon,
    emoji: '🏠',
    teaser: 'Your home senses your circadian rhythms, adjusts temperature, and readies your morning routine.',
    scrollTarget: 'home-scenario'
  },
  {
    id: 'health',
    title: 'Future Healthcare',
    subtitle: 'Predictive Vitality Center',
    icon: HeartPulse,
    emoji: '🏥',
    teaser: 'Gentle bio-sensors detect health imbalances months before symptoms ever manifest.',
    scrollTarget: 'health-scenario'
  },
  {
    id: 'education',
    title: 'Curiosity Academy',
    subtitle: 'Adaptive Learning Studio',
    icon: GraduationCap,
    emoji: '🏫',
    teaser: 'No more one-size-fits-all testing. Lessons adapt dynamically to how each student thinks.',
    scrollTarget: 'education-scenario'
  },
  {
    id: 'mobility',
    title: 'Autonomous Mobility',
    subtitle: 'Kinetic Pod & Maglev Grid',
    icon: Car,
    emoji: '🚗',
    teaser: 'On-demand aerodynamic pods arrive in 45 seconds. Zero gridlock, zero traffic accidents.',
    scrollTarget: 'mobility-scenario'
  },
  {
    id: 'environment',
    title: 'Living Biosphere',
    subtitle: 'Regenerative Urban Forest',
    icon: Leaf,
    emoji: '🌱',
    teaser: 'Skyscrapers covered in vertical forests that actively scrub carbon and purify regional rainwater.',
    scrollTarget: 'environment-scenario'
  },
  {
    id: 'work',
    title: 'Creative Commons',
    subtitle: 'AI-Augmented Collaborative Studio',
    icon: Briefcase,
    emoji: '💼',
    teaser: 'Repetitive administration is automated away. Human work elevates to creativity, strategy, and empathy.',
    scrollTarget: 'transformation'
  },
  {
    id: 'community',
    title: 'Civic Agora',
    subtitle: 'Public Gathering & Deliberation',
    icon: Users,
    emoji: '👥',
    teaser: 'Reclaimed streets become pedestrian plazas for festivals, deep conversation, and democratic juries.',
    scrollTarget: 'day-in-2040'
  }
];

export default function FutureWorld({ onSelectZone }) {
  const [activeZoneId, setActiveZoneId] = useState('home');
  const activeZone = WORLD_ZONES.find(z => z.id === activeZoneId) || WORLD_ZONES[0];

  const handleSelectZone = (zone) => {
    sound.playClick();
    setActiveZoneId(zone.id);
  };

  const handle3DBuildingSelect = (buildingData) => {
    const matched = WORLD_ZONES.find(z => z.id === buildingData.id);
    if (matched) {
      setActiveZoneId(matched.id);
    }
  };

  const scrollToScenario = (targetId) => {
    sound.playChime();
    onSelectZone?.(activeZone.id);
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="world" 
      className="py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#0A332F] via-[#0E4F4A] to-[#0A332F] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 bg-seagreen-primary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-seafoam mb-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Compass size={13} className="text-seagreen-gold" />
            <span>Interactive 3D Metropolis</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">
            THIS IS YOUR FUTURE WORLD.
          </h2>

          <h3 className="editorial-serif text-xl sm:text-2xl text-seagreen-gold font-normal italic mb-4">
            Explore it. Change it. Make it yours.
          </h3>

          <p className="text-sm sm:text-base text-seagreen-seafoam/80 font-sans max-w-2xl mx-auto leading-relaxed mb-6">
            This is not a drawing or a static photo. It is a live, navigable 3D digital twin of a human-centered 2040 metropolis.
          </p>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/50 border border-seagreen-gold/50 text-xs font-mono text-white backdrop-blur-md shadow-xl flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <span>👆</span> CLICK A BUILDING TO EXPLORE
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span>🎛️</span> USE THE CONTROLS TO CHANGE THE CITY
            </span>
          </div>
        </div>

        {/* Quick Zone Switcher Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {WORLD_ZONES.map((zone) => {
            const isSelected = activeZoneId === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => handleSelectZone(zone)}
                data-cursor="hover"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-md -translate-y-0.5'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{zone.emoji}</span>
                <span>{zone.title}</span>
              </button>
            );
          })}
        </div>

        {/* Master 3D Future City Viewport */}
        <div className="mb-10 shadow-2xl rounded-3xl overflow-hidden border border-seagreen-gold/30">
          <FutureCityCanvas
            height="640px"
            onSelectBuilding={handle3DBuildingSelect}
            showControls={true}
          />
        </div>

        {/* Active Zone Detail Bar & Scenario Launch CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#145550]/90 to-[#0A332F]/95 border border-seagreen-gold/40 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{activeZone.emoji}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="editorial-serif text-2xl font-bold text-white">
                  {activeZone.title}
                </h3>
                <span className="text-[10px] font-mono text-seagreen-gold uppercase px-2 py-0.5 rounded-full bg-seagreen-primary/30 border border-seagreen-gold/30">
                  {activeZone.subtitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-seagreen-seafoam/90 leading-relaxed font-sans max-w-xl">
                {activeZone.teaser}
              </p>
            </div>
          </div>

          <button
            onClick={() => scrollToScenario(activeZone.scrollTarget)}
            data-cursor="hover"
            className="shrink-0 py-3.5 px-7 rounded-full bg-gradient-to-r from-seagreen-primary via-[#289A8C] to-seagreen-deep text-white font-sans font-bold text-xs sm:text-sm hover:brightness-110 transition-all border border-seagreen-gold/50 shadow-seagreen flex items-center gap-2 group hover:-translate-y-0.5"
          >
            <span>Experience {activeZone.title} in Depth</span>
            <ArrowRight size={14} className="text-seagreen-gold transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
