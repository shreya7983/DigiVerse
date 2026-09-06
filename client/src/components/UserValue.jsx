import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  Brain, 
  Building2, 
  Trophy, 
  Scale,
  ArrowRight
} from 'lucide-react';
import sound from '../utils/sound';

export default function UserValue({ onDesignFuture }) {
  const values = [
    {
      icon: '🔮',
      iconEl: Compass,
      title: 'A Future Experience',
      tagline: 'Explore possible versions of everyday life.',
      desc: 'Step into cutaway homes, hospitals, and transit grids to visually observe how technology functions in everyday moments.',
      badge: 'Sensory Immersion',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      icon: '🧠',
      iconEl: Brain,
      title: 'A Better Understanding',
      tagline: 'Understand emerging tech through real-life situations.',
      desc: 'No confusing tech jargon. See artificial intelligence as an adaptive home assistant or medical diagnostics as continuous cellular care.',
      badge: 'Human-First Clarity',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      icon: '🏙️',
      iconEl: Building2,
      title: 'Your Own Future',
      tagline: 'Design your preferred city and lifestyle.',
      desc: 'Actively allocate resources across 8 societal dimensions and watch a procedural 3D metropolis shape itself to your values.',
      badge: 'Active Agency',
      badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    },
    {
      icon: '📊',
      iconEl: Trophy,
      title: 'Your Future Profile',
      tagline: 'Receive a personalized profile based on your choices.',
      desc: 'Discover your speculative archetype, equilibrium scores, and download or share your 3D digital future with friends.',
      badge: 'Tailored Artifact',
      badgeColor: 'text-seagreen-gold border-seagreen-gold/40 bg-seagreen-gold/10',
    },
    {
      icon: '⚖️',
      iconEl: Scale,
      title: 'A Different Perspective',
      tagline: 'Understand the social and ethical consequences of those choices.',
      desc: 'Recognize that every technological speed-up carries an unspoken trade-off in privacy, autonomy, or human control.',
      badge: 'Ethical Foresight',
      badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
  ];

  return (
    <section
      id="user-value"
      className="py-24 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-[#0E433E] via-[#0C3B37] to-[#0A332F] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-seagreen-gold/30 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold mb-4">
            <Sparkles size={12} className="text-seagreen-gold" />
            <span>TANGIBLE USER VALUE</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            What do I get from <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block ml-1">DigiVerse?</span>
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 font-sans max-w-2xl mx-auto leading-relaxed">
            You don't leave with generic information. You leave with an immersive experience, a deeper perspective, and your own personalized digital future.
          </p>
        </div>

        {/* 5 User Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {values.slice(0, 3).map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-gradient-to-br from-[#124D46]/80 to-[#0A332F]/90 border border-white/10 hover:border-seagreen-gold/40 shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="editorial-serif text-2xl font-bold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-seagreen-gold mb-3">
                  {item.tagline}
                </p>
                <p className="text-xs sm:text-sm text-seagreen-seafoam/80 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom 2 Centered Large Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {values.slice(3, 5).map((item, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="p-7 rounded-3xl bg-gradient-to-br from-[#145550]/80 to-[#0A332F]/90 border border-seagreen-gold/30 shadow-xl hover:border-seagreen-gold transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="editorial-serif text-2xl font-bold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-seagreen-gold mb-3">
                  {item.tagline}
                </p>
                <p className="text-xs sm:text-sm text-seagreen-seafoam/80 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
