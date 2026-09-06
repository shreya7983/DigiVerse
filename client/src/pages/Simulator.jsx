import React, { useState, useEffect } from 'react';
import FutureSimulator from '../components/FutureSimulator';
import { ArrowLeft, Clock } from 'lucide-react';

export default function Simulator({ onReturnHome }) {
  const [recentVisions, setRecentVisions] = useState([]);
  const [loadingVisions, setLoadingVisions] = useState(true);

  useEffect(() => {
    const fetchVisions = async () => {
      try {
        const res = await fetch('/api/simulator/recent');
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data)) {
            setRecentVisions(json.data);
          }
        }
      } catch (err) {
        console.warn('Could not load community visions:', err);
      } finally {
        setLoadingVisions(false);
      }
    };
    fetchVisions();
  }, []);

  return (
    <div className="pt-36 pb-24 px-6 sm:px-8 max-w-7xl mx-auto min-h-screen text-white font-sans">
      {/* Return Button */}
      <div className="mb-8">
        <button
          onClick={onReturnHome}
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-xs font-bold text-seagreen-seafoam hover:text-white transition-colors font-sans"
        >
          <ArrowLeft size={14} className="text-seagreen-gold" />
          <span>Return to Exhibition</span>
        </button>
      </div>

      {/* Simulator Component */}
      <FutureSimulator onExploreMore={onReturnHome} />

      {/* Public Speculative Vault */}
      <div className="mt-20 pt-16 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-2">
              <Clock size={13} className="text-seagreen-gold" />
              <span>Public Speculative Vault</span>
            </div>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Recent Visions Shaped on DigiVerse
            </h3>
          </div>
          <span className="text-xs text-seagreen-gold font-mono font-bold">
            PERSISTED REPOSITORY
          </span>
        </div>

        {loadingVisions ? (
          <div className="text-center py-12 text-xs text-seagreen-seafoam font-mono">
            Loading public vision vault...
          </div>
        ) : recentVisions.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-white/70">
            No public profiles saved yet. Use the simulator above to save the first visionary profile!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentVisions.map((vision) => (
              <div
                key={vision.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#134D46]/85 to-[#0C3833]/95 border border-white/10 shadow-xl backdrop-blur-xl hover:border-seagreen-gold/50 transition-all text-white"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-seagreen-gold uppercase tracking-wide font-sans">
                    {vision.userName || 'Visionary Designer'}
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">
                    {new Date(vision.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="editorial-serif font-bold text-base sm:text-lg text-white mb-1">
                  {vision.archetype?.title}
                </h4>
                <p className="text-xs text-seagreen-seafoam/80 line-clamp-2 mb-4 font-serif italic">
                  "{vision.archetype?.tagline}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-[11px] font-mono text-seagreen-seafoam font-bold">
                  <span>Innov: {vision.scores?.innovation}%</span>
                  <span>·</span>
                  <span>Sust: {vision.scores?.sustainability}%</span>
                  <span>·</span>
                  <span>Human: {vision.scores?.humanImpact}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
