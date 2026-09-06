import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMPACT_MAP_DATA } from '../data/futureData';
import sound from '../utils/sound';
import { 
  Network, 
  Sparkles, 
  Cpu, 
  BookOpen, 
  Stethoscope, 
  Briefcase, 
  Car, 
  Shield, 
  CheckCircle2, 
  AlertOctagon, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

export default function ImpactMap() {
  const [selectedNodeId, setSelectedNodeId] = useState('education');

  const selectedNode = IMPACT_MAP_DATA.nodes.find(n => n.id === selectedNodeId) || IMPACT_MAP_DATA.nodes[0];

  const getNodeIcon = (id) => {
    switch (id) {
      case 'education': return <BookOpen size={18} />;
      case 'healthcare': return <Stethoscope size={18} />;
      case 'employment': return <Briefcase size={18} />;
      case 'transportation': return <Car size={18} />;
      case 'security': return <Shield size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  const handleSelectNode = (id) => {
    sound.playClick();
    setSelectedNodeId(id);
  };

  return (
    <section 
      id="impact-map" 
      className="py-32 sm:py-44 px-6 sm:px-8 bg-gradient-to-b from-[#0C3E3A] via-[#0E433E] to-[#0A332F] text-white relative overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/4 -right-32 w-96 h-96 bg-seagreen-primary/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -left-32 w-96 h-96 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Network size={13} className="text-seagreen-gold" />
            <span>Relational Constellation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Systemic Impact Map</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            The Web of <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">connection</span>
          </h2>

          <p className="text-base sm:text-xl text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            No technology operates in isolation. Artificial intelligence branches into health, learning, mobility, work, and civic ethics. Trace each systemic branch and its human consequence.
          </p>
        </div>

        {/* Constellation & Inspector Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Visual Node Map (6 cols) */}
          <div className="lg:col-span-6 relative aspect-square max-w-[500px] mx-auto w-full flex items-center justify-center p-6 rounded-3xl bg-black/30 border border-white/10 backdrop-blur-xl">
            {/* SVG Connecting Filaments */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              {/* Concentric orbital guide rings */}
              <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(47, 143, 131, 0.2)" strokeDasharray="4,6" />
              <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(200, 169, 107, 0.15)" strokeDasharray="2,4" />

              {/* Connecting lines from center (200, 200) to 5 orbital points */}
              {/* Angles: 5 nodes at -90, -18, 54, 126, 198 degrees */}
              {[
                { x: 200, y: 60, id: 'education' },
                { x: 333, y: 157, id: 'healthcare' },
                { x: 282, y: 313, id: 'employment' },
                { x: 118, y: 313, id: 'transportation' },
                { x: 67, y: 157, id: 'security' },
              ].map(pt => {
                const isSelected = selectedNodeId === pt.id;
                return (
                  <motion.line
                    key={pt.id}
                    x1="200"
                    y1="200"
                    x2={pt.x}
                    y2={pt.y}
                    stroke={isSelected ? '#C8A96B' : 'rgba(47, 143, 131, 0.4)'}
                    strokeWidth={isSelected ? 2.5 : 1}
                    strokeDasharray={isSelected ? 'none' : '4,4'}
                  />
                );
              })}
            </svg>

            {/* Central Node: AI */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-seagreen-dark to-seagreen-deep border-2 border-seagreen-gold flex flex-col items-center justify-center text-center p-2 shadow-gold">
              <Cpu size={22} className="text-seagreen-gold mb-0.5" />
              <span className="font-bold text-[10px] uppercase font-mono tracking-wider text-white">Central AI</span>
              <span className="text-[8px] text-seagreen-gold">Cognitive Hub</span>
            </div>

            {/* 5 Orbiting Nodes */}
            {[
              { id: 'education', top: '15%', left: '50%', label: 'Education' },
              { id: 'healthcare', top: '39%', left: '83%', label: 'Healthcare' },
              { id: 'employment', top: '78%', left: '71%', label: 'Work' },
              { id: 'transportation', top: '78%', left: '29%', label: 'Transit' },
              { id: 'security', top: '39%', left: '17%', label: 'Ethics' },
            ].map(node => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleSelectNode(node.id)}
                  data-cursor="hover"
                  style={{ top: node.top, left: node.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border transition-all duration-300 z-20 font-sans flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-gradient-to-br from-seagreen-gold text-seagreen-deep border-white shadow-gold scale-110'
                      : 'bg-[#124D46]/90 border-seagreen-primary/40 text-white hover:border-seagreen-gold hover:scale-105'
                  }`}
                >
                  {getNodeIcon(node.id)}
                  <span className="text-[10px] font-bold">{node.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Node Inspector (6 cols) */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-gradient-to-br from-[#124D46]/95 to-[#0A332F]/95 rounded-3xl p-6 sm:p-8 border border-seagreen-gold/40 shadow-2xl backdrop-blur-xl"
              >
                {/* Node Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seagreen-primary/20 text-xs font-mono font-bold text-seagreen-gold mb-2 border border-seagreen-gold/30">
                      <span>SYSTEMIC INTERSECTION</span>
                    </div>
                    <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white">
                      {selectedNode.title}
                    </h3>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-seagreen-gold">
                    {getNodeIcon(selectedNode.id)}
                  </div>
                </div>

                <div className="mb-6 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-seagreen-gold">
                  <span className="text-white/50 block mb-0.5">COUPLING MECHANISM:</span>
                  <span className="font-bold">{selectedNode.connection}</span>
                </div>

                {/* 3 Impact Dimensions */}
                <div className="space-y-4 mb-6">
                  {/* Positive Impact */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase mb-1.5">
                      <CheckCircle2 size={14} />
                      <span>Positive Multiplier</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                      {selectedNode.positiveImpact}
                    </p>
                  </div>

                  {/* Potential Risk */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase mb-1.5">
                      <AlertOctagon size={14} />
                      <span>Systemic Fragility & Risk</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
                      {selectedNode.potentialRisk}
                    </p>
                  </div>

                  {/* Human Consideration */}
                  <div className="p-4 rounded-2xl bg-seagreen-gold/10 border border-seagreen-gold/30">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-seagreen-gold uppercase mb-1.5">
                      <HeartHandshake size={14} />
                      <span>Non-Negotiable Human Anchor</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                      {selectedNode.humanConsideration}
                    </p>
                  </div>
                </div>

                {/* Footer Navigation */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-seagreen-seafoam/70 font-sans">
                    Click any node in the constellation to inspect
                  </span>
                  <div className="flex items-center gap-1 font-mono text-seagreen-gold">
                    {IMPACT_MAP_DATA.nodes.map(n => (
                      <button
                        key={n.id}
                        onClick={() => handleSelectNode(n.id)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          selectedNodeId === n.id ? 'bg-seagreen-gold scale-125' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
