import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_PERSONAS, PRESET_AI_QUESTIONS } from '../data/futureData';
import sound from '../utils/sound';
import { Sparkles, Send, Bot, User, RotateCcw, Compass, ArrowRight } from 'lucide-react';

export default function FutureAI() {
  const [activePersonaId, setActivePersonaId] = useState('architect');
  const activePersona = AI_PERSONAS.find(p => p.id === activePersonaId) || AI_PERSONAS[0];

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Greetings. I am ${activePersona.name}, specializing in ${activePersona.title}. "${activePersona.motto}" How might we explore and design this speculative horizon together?`,
      source: 'init',
      persona: activePersona.name
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handlePersonaSwitch = (pId) => {
    sound.playClick();
    setActivePersonaId(pId);
    const p = AI_PERSONAS.find(x => x.id === pId);
    if (p) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Perspective synchronized to ${p.name} (${p.title}). "${p.motto}" What would you like to examine through this lens?`,
          source: 'persona-shift',
          persona: p.name
        }
      ]);
    }
  };

  const handleSend = async (queryText) => {
    const text = (queryText || inputValue).trim();
    if (!text || loading) return;

    sound.playClick();
    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          persona: activePersona.name,
          role: activePersona.title 
        }),
      });

      if (response.ok) {
        sound.playChime();
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply || activePersona.knowledge.default,
            source: data.source || 'gemini-live',
            persona: activePersona.name
          },
        ]);
      } else {
        throw new Error('Network error');
      }
    } catch {
      sound.playChime();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: activePersona.knowledge.default ||
            'When we evaluate this horizon, the most crucial truth is that technology is neither an inevitable force nor a passive tool—it is an intentional reflection of human values.',
          source: 'offline-speculative-core',
          persona: activePersona.name
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    sound.playClick();
    setMessages([
      {
        role: 'assistant',
        content: `Dialogue reset with ${activePersona.name}. What aspect of the future shall we design?`,
        source: 'init',
        persona: activePersona.name
      },
    ]);
  };

  return (
    <section
      id="ai"
      className="py-28 sm:py-40 px-6 sm:px-8 bg-gradient-to-b from-[#0A2F2B] via-[#0D3B36] to-[#082421] text-white relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-seagreen-primary/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-10 right-10 w-80 h-80 bg-seagreen-gold/10 blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-seafoam mb-4 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles size={13} className="text-seagreen-gold" />
            <span>09 / Converse</span>
            <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold" />
            <span className="text-seagreen-gold">5 Future Perspectives</span>
          </div>

          <h2 className="editorial-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-4">
            Ask the <span className="font-script-accent text-5xl sm:text-7xl text-seagreen-gold font-normal lowercase inline-block">future</span>.
          </h2>

          <p className="text-base sm:text-lg text-seagreen-seafoam/80 leading-relaxed font-sans font-normal">
            Choose a lens to explore tomorrow. Whether you are curious about the hard science, our living streets, the environment, moral dilemmas, or what your everyday life will feel like—the future answers in plain, human language.
          </p>
        </div>

        {/* 5 Perspective Mode Tabs (Responsive Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {AI_PERSONAS.map((persona) => {
            const isActive = activePersonaId === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => handlePersonaSwitch(persona.id)}
                data-cursor="hover"
                className={`p-3.5 rounded-2xl text-left border transition-all duration-300 font-sans flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-br from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-seagreen -translate-y-1'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-2xl mb-1.5">{persona.icon}</div>
                  <div className="font-bold text-xs sm:text-sm text-white leading-tight mb-1">
                    {persona.name}
                  </div>
                </div>
                <div className={`text-[10px] leading-snug line-clamp-2 ${isActive ? 'text-seagreen-gold' : 'text-seagreen-seafoam/60'}`}>
                  {persona.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Suggested Prompt Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-seagreen-gold/80 mr-1 flex items-center gap-1">
            <Compass size={12} /> Suggested:
          </span>
          {(activePersona.samplePrompts || PRESET_AI_QUESTIONS).map((q, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => handleSend(q)}
              data-cursor="hover"
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-seagreen-seafoam hover:bg-white/15 hover:text-white hover:border-seagreen-gold/50 transition-all font-sans"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Glass Conversation Interface */}
        <div className="rounded-3xl bg-gradient-to-br from-[#124D46]/90 to-[#0A332F]/95 border border-seagreen-primary/40 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col h-[560px]">
          {/* Chat Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">{activePersona.icon}</span>
              <div>
                <span className="text-xs font-bold font-sans text-white block">
                  {activePersona.name}
                </span>
                <span className="text-[10px] font-mono text-seagreen-gold">
                  {activePersona.title}
                </span>
              </div>
            </div>

            <button
              onClick={handleClear}
              data-cursor="hover"
              className="text-xs text-seagreen-seafoam/70 hover:text-white flex items-center gap-1.5 transition-colors font-sans"
              title="Reset conversation"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset Dialogue</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={index}
                  className={`flex gap-3 max-w-[85%] ${
                    isAssistant ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isAssistant
                        ? 'bg-gradient-to-tr from-seagreen-dark to-seagreen-primary text-white border border-seagreen-gold/40 shadow-xs'
                        : 'bg-white/15 border border-white/20 text-white'
                    }`}
                  >
                    {isAssistant ? <Bot size={16} className="text-seagreen-gold" /> : <User size={16} />}
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-sans ${
                      isAssistant
                        ? 'bg-white/10 text-white border border-white/15 shadow-xs backdrop-blur-md'
                        : 'bg-gradient-to-r from-seagreen-primary to-seagreen-deep text-white font-semibold border border-seagreen-gold/30'
                    }`}
                  >
                    {isAssistant && msg.persona && (
                      <div className="text-[10px] font-mono uppercase text-seagreen-gold mb-1 font-bold">
                        {msg.persona}
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {isAssistant && msg.source && (
                      <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-seagreen-gold font-mono">
                        Source: {msg.source === 'gemini-live' ? 'Gemini 1.5 Flash' : 'DigiVerse Speculative Core'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-seagreen-dark to-seagreen-primary text-white flex items-center justify-center shrink-0 border border-seagreen-gold/40">
                  <Bot size={16} className="text-seagreen-gold" />
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-seagreen-seafoam flex items-center gap-2 shadow-xs backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-seagreen-gold animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-2 font-mono text-[11px] text-seagreen-gold">
                    {activePersona.name} is synthesizing speculative horizons...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-white/10 bg-black/20 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask ${activePersona.name} about tomorrow's possibilities...`}
              disabled={loading}
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm text-white placeholder:text-seagreen-seafoam/50 focus:outline-none focus:border-seagreen-gold transition-colors font-sans backdrop-blur-md"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              data-cursor="hover"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-seagreen-primary to-seagreen-deep text-white text-xs font-bold font-sans hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shrink-0 border border-seagreen-gold/40 shadow-seagreen"
            >
              <span className="hidden sm:inline">Ask {activePersona.name.split(' ')[1]}</span>
              <Send size={14} className="text-seagreen-gold" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
