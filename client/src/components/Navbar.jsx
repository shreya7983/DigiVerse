import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/sound';
import { Menu, X, ArrowUpRight, Sparkles, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onOpenSimulator }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'explore', label: 'Explore' },
    { id: 'experience', label: 'Experience' },
    { id: 'design', label: 'Design' },
    { id: 'reflect', label: 'Reflect' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (id) => {
    sound.playClick();
    setMobileMenuOpen(false);
    onNavigate?.(id);
  };

  const handleToggleSound = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) sound.playChime();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        isScrolled
          ? 'py-3 bg-[#0E4F4A]/85 backdrop-blur-2xl border-b border-seagreen-secondary/25 shadow-2xl'
          : 'py-5 bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          data-cursor="hover"
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0E4F4A] via-[#176B63] to-[#2F8F83] flex items-center justify-center text-white border border-seagreen-gold/40 shadow-seagreen transition-transform duration-300 group-hover:scale-105">
            <span className="text-[12px] font-bold tracking-wider font-mono">DV</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight text-white group-hover:text-seagreen-seafoam transition-colors">
              DIGIVERSE
            </span>
            <span className="text-[9px] tracking-widest text-seagreen-seafoam/70 uppercase hidden sm:inline-block font-sans font-semibold">
              Design the <span className="font-script-accent text-sm normal-case text-seagreen-gold">future</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/20 border border-white/10 backdrop-blur-xl"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                data-cursor="hover"
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 font-sans ${
                  isActive
                    ? 'text-white'
                    : 'text-seagreen-seafoam/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTopNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-seagreen-primary to-seagreen-secondary rounded-full border border-seagreen-gold/40 shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Audio Feedback Mute Toggle */}
          <button
            onClick={handleToggleSound}
            data-cursor="hover"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-seagreen-gold border border-white/15 transition-colors shadow-xs"
            title={isMuted ? 'Unmute Audio Experience' : 'Mute Audio Experience'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (onOpenSimulator) {
                onOpenSimulator();
              } else {
                handleLinkClick('design');
              }
            }}
            data-cursor="hover"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full bg-gradient-to-r from-seagreen-primary via-seagreen-secondary to-seagreen-primary text-white hover:brightness-110 transition-all duration-300 shadow-seagreen border border-seagreen-gold/40 hover:-translate-y-0.5 group font-sans"
          >
            <span>Design Your Future</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-seagreen-gold"
            />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor="hover"
            className="md:hidden p-2.5 rounded-2xl bg-white/10 text-white border border-white/15 backdrop-blur-lg transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-full bg-[#0E4F4A]/98 backdrop-blur-2xl border-b border-seagreen-secondary/30 shadow-2xl px-6 py-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-colors text-left font-sans ${
                      isActive
                        ? 'bg-seagreen-primary text-white border border-seagreen-gold/40'
                        : 'text-seagreen-seafoam hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-seagreen-gold font-mono">→</span>
                  </button>
                );
              })}
              <div className="pt-4 mt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenSimulator) {
                      onOpenSimulator();
                    } else {
                      handleLinkClick('design');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-seagreen-primary to-seagreen-secondary text-white text-sm font-semibold border border-seagreen-gold/40 shadow-lg font-sans"
                >
                  <span>Design Your Future</span>
                  <ArrowUpRight size={16} className="text-seagreen-gold" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
