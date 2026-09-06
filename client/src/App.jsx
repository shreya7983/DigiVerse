import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RightRailNav from './components/RightRailNav';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FlowCanvas from './components/FlowCanvas';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Simulator from './pages/Simulator';
import About from './pages/About';
import { Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');
  const [ambientAudio, setAmbientAudio] = useState(false);
  const audioContextRef = React.useRef(null);
  const gainNodeRef = React.useRef(null);

  // Handle ambient calm oceanic background resonance (Web Audio API)
  useEffect(() => {
    if (ambientAudio) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioContextRef.current) {
          const ctx = new AudioContext();
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(116, ctx.currentTime); // Deep resonant ocean tone
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(174, ctx.currentTime); // Harmonic wave

          gain.gain.setValueAtTime(0.022, ctx.currentTime);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();

          audioContextRef.current = ctx;
          gainNodeRef.current = gain;
        } else if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      } catch (e) {
        console.warn('Ambient audio could not initialize:', e);
      }
    } else {
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
    }
  }, [ambientAudio]);

  // Active section scroll spy for Home view
  useEffect(() => {
    if (currentView !== 'home') return;

    const sectionIds = [
      'hero',
      'what-can-you-do',
      'how-it-works',
      'user-value',
      'why-digiverse',
      'personalized',
      'world',
      'home-scenario',
      'health-scenario',
      'education-scenario',
      'mobility-scenario',
      'environment-scenario',
      'transformation',
      'day-in-2040',
      'simulator',
      'ethics',
      'ai',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavigate = (target) => {
    if (target === 'about') {
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'explore-view') {
      setCurrentView('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'simulator-view') {
      setCurrentView('simulator');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      let elementId = target;
      if (target === 'explore') elementId = 'world';
      if (target === 'experience') elementId = 'home-scenario';
      if (target === 'design') elementId = 'simulator';
      if (target === 'reflect') elementId = 'ethics';

      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0E433E] text-white font-sans selection:bg-seagreen-seafoam selection:text-seagreen-dark relative">
      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Global Oceanic Digital Flowing Background */}
      <FlowCanvas />

      {/* Top Floating Glass Navigation */}
      <Navbar
        activeSection={currentView === 'home' ? activeSection : currentView}
        onNavigate={handleNavigate}
        onOpenSimulator={() => handleNavigate('simulator')}
      />

      {/* Right-Side Vertical Navigation Rail (Transforms on scroll) */}
      {currentView === 'home' && (
        <RightRailNav
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main View Content */}
      <main className="flex-1 w-full relative z-10">
        {currentView === 'home' && <Home onNavigateSection={handleNavigate} />}
        {currentView === 'explore' && <Explore onReturnHome={() => handleNavigate('explore')} />}
        {currentView === 'simulator' && <Simulator onReturnHome={() => handleNavigate('simulator')} />}
        {currentView === 'about' && <About onReturnHome={() => handleNavigate('hero')} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Ambient Oceanic Resonance Controller */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAmbientAudio(!ambientAudio)}
          data-cursor="hover"
          className={`p-3.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 flex items-center gap-2 text-xs font-semibold ${
            ambientAudio
              ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-gold'
              : 'bg-white/90 text-seagreen-charcoal border-seagreen-border hover:bg-white'
          }`}
          title={ambientAudio ? 'Mute Oceanic Ambience' : 'Play Oceanic Ambient Resonance'}
        >
          {ambientAudio ? <Volume2 size={16} className="text-seagreen-gold" /> : <VolumeX size={16} />}
          <span className="hidden sm:inline font-mono text-[11px]">
            {ambientAudio ? 'Ocean Tone: On' : 'Ocean Ambience'}
          </span>
        </button>
      </div>
    </div>
  );
}
