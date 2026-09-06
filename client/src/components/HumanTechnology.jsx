import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, ShieldCheck, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HumanTechnology() {
  const principles = [
    {
      number: '01',
      icon: HeartHandshake,
      title: 'Human-Centered',
      tagline: 'Technology should serve people, not subjugate them.',
      desc: 'Computational tools exist to liberate human beings from tedious friction, opening space for empathy, deep intellectual curiosity, artistic expression, and intergenerational connection.',
      pillars: ['Cognitive agency over engagement traps', 'Preservation of physical community life', 'Dopamine-neutral user experiences']
    },
    {
      number: '02',
      icon: ShieldCheck,
      title: 'Responsible & Ethical',
      tagline: 'Innovation must consider privacy, provenance, and dignity.',
      desc: 'Every technological milestone brings an ethical obligation. We advocate for cryptographic neuro-rights, transparent algorithmic accountability, and sovereign personal data vaults.',
      pillars: ['Non-delegable moral accountability', 'Zero-knowledge private identity', 'Open deliberative civic oversight']
    },
    {
      number: '03',
      icon: Leaf,
      title: 'Regenerative & Sustainable',
      tagline: 'The digital future must protect and heal the physical world.',
      desc: 'Silicon advances cannot continue at the expense of planetary boundaries. We champion circular compute architectures, biodegradable circuit boards, and data centers functioning as district heat batteries.',
      pillars: ['Closed-loop electronic manufacturing', 'Carbon-negative geothermal compute', 'Real-time planetary biosphere stewardship']
    }
  ];

  return (
    <section id="principles" className="py-32 sm:py-44 px-6 sm:px-8 bg-seagreen-cream text-white border-t border-seagreen-primary/25 relative overflow-hidden">
      {/* Soft emerald light diffusers */}
      <div className="pointer-events-none absolute top-1/4 -right-24 w-96 h-96 bg-seagreen-primary/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 -left-24 w-80 h-80 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-seagreen-seafoam mb-4">
            <Sparkles size={13} className="text-seagreen-gold" />
            <span>Ethical Foundation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">Core Axioms</span>
          </div>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6">
            Technology should amplify humanity,
            <span className="block font-normal text-seagreen-seafoam italic">not replace it.</span>
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            When innovation divorces itself from human dignity and ecological limits, it ceases to be progress. We establish three non-negotiable principles for every digital architecture.
          </p>
        </div>

        {/* 3 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                data-cursor="card"
                className="rounded-3xl p-8 bg-gradient-to-b from-[#134D46]/85 to-[#0C3833]/95 border border-white/10 hover:border-seagreen-gold/50 shadow-xl backdrop-blur-xl hover:shadow-[0_12px_32px_rgba(47,143,131,0.25)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between text-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-seagreen-gold">
                      AXIOM {p.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-seagreen-gold border border-seagreen-gold/30 shadow-xs">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="editorial-serif text-2xl font-bold tracking-tight text-white mb-2">
                    {p.title}
                  </h3>

                  <div className="text-xs font-sans font-semibold uppercase tracking-wider text-seagreen-gold/90 mb-4 italic">
                    "{p.tagline}"
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed font-sans font-normal mb-8">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-2.5">
                  {p.pillars.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-seagreen-seafoam font-sans">
                      <CheckCircle2 size={14} className="text-seagreen-gold shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
