import React from 'react';

export default function Footer({ onNavigate }) {
  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'city', label: 'City 24h' },
    { id: 'ai', label: 'Future AI' },
    { id: 'principles', label: 'Principles' },
    { id: 'challenges', label: 'Challenges' },
  ];

  return (
    <footer className="py-20 px-6 sm:px-8 bg-seagreen-charcoal text-white border-t border-seagreen-primary/20 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand info */}
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-seagreen-dark to-seagreen-primary flex items-center justify-center text-white text-[10px] font-bold shadow-seagreen border border-seagreen-gold/40 font-mono">
              DV
            </div>
            <span className="editorial-serif font-bold text-lg tracking-tight text-white">
              DigiVerse
            </span>
          </div>
          <p className="text-xs text-seagreen-seafoam/70 max-w-sm leading-relaxed">
            Designing possibilities for the digital world of tomorrow. A speculative exploration of technology, ethics, and human flourishing.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-seagreen-seafoam/80">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              data-cursor="hover"
              className="hover:text-seagreen-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Legal & Speculative Notice */}
        <div className="flex flex-col md:items-end text-xs text-seagreen-seafoam/50">
          <span>© 2026 DigiVerse · All Rights Reserved</span>
          <span className="text-[10px] text-seagreen-gold/80 mt-1 font-mono">
            Sea-Green Speculative Exhibition Architecture
          </span>
        </div>
      </div>
    </footer>
  );
}
