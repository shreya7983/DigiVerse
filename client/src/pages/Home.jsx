import React, { useState } from 'react';
import sound from '../utils/sound';
import Hero from '../components/Hero';
import WhatCanYouDo from '../components/WhatCanYouDo';
import HowDigiverseWorks from '../components/HowDigiverseWorks';
import UserValue from '../components/UserValue';
import WhyDigiverse from '../components/WhyDigiverse';
import PersonalizedEntry from '../components/PersonalizedEntry';
import FutureWorld from '../components/FutureWorld';
import FutureHome from '../components/FutureHome';
import FutureHealth from '../components/FutureHealth';
import FutureEducation from '../components/FutureEducation';
import FutureMobility from '../components/FutureMobility';
import FutureEnvironment from '../components/FutureEnvironment';
import TodayTomorrow from '../components/TodayTomorrow';
import DayIn2040 from '../components/DayIn2040';
import FutureSimulator from '../components/FutureSimulator';
import EthicsSimulator from '../components/EthicsSimulator';
import FutureAI from '../components/FutureAI';
import CTA from '../components/CTA';

export default function Home({ onNavigateSection }) {
  const [activeIntent, setActiveIntent] = useState(null);

  const scrollTo = (id) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectIntent = (intentId) => {
    setActiveIntent(intentId);
    scrollTo('world');
  };

  return (
    <div className="flex flex-col w-full bg-[#07221E] text-white">
      {/* 01. HERO: "ENTER DIGIVERSE — Explore the future. Shape it yourself." */}
      <Hero
        onEnterFuture={() => scrollTo('what-can-you-do')}
        onExplorePossibilities={() => scrollTo('world')}
        onSeeHowItWorks={() => scrollTo('how-it-works')}
      />

      {/* 02. WHAT CAN YOU DO IN DIGIVERSE?: 4 Large Visual Experiences */}
      <WhatCanYouDo onNavigate={(target) => scrollTo(target)} />

      {/* 03. HOW DIGIVERSE WORKS & SEE HOW IT WORKS: 4 Steps + Live 3-Stage Interactive Demo */}
      <HowDigiverseWorks onDesignFuture={() => scrollTo('simulator')} />

      {/* 04. WHAT DO I GET FROM DIGIVERSE?: 5 Tangible User Deliverables */}
      <UserValue onDesignFuture={() => scrollTo('simulator')} />

      {/* 05. WHY DOES DIGIVERSE EXIST? & NORMAL VS DIGIVERSE */}
      <WhyDigiverse onDesignFuture={() => scrollTo('simulator')} />

      {/* 06. PERSONALIZED ENTRY: Speculative Intent Calibrator */}
      <PersonalizedEntry onSelectIntent={handleSelectIntent} />

      {/* 07. THE FUTURE WORLD: Interactive 3D City Centerpiece with Clear Instructions */}
      <FutureWorld onSelectZone={(zoneId) => scrollTo(`${zoneId}-scenario`)} />

      {/* 08. EVERYDAY LIFE IN 2040: Human-Centered Scenarios with Everyday Language */}
      <div id="experience" className="flex flex-col w-full">
        <FutureHome />
        <FutureHealth />
        <FutureEducation />
        <FutureMobility />
        <FutureEnvironment />
      </div>

      {/* 09. TODAY VS TOMORROW: Interactive Before/After Split Comparison */}
      <TodayTomorrow />

      {/* 10. LIVE A DAY IN 2040: Morning to Night Narrative Journey */}
      <DayIn2040 />

      {/* 11. DESIGN YOUR FUTURE: 100-Point Allocator + 3D City Morphing + 3D Profile Pedestal */}
      <FutureSimulator 
        initialIntent={activeIntent}
        onExploreMore={() => scrollTo('world')} 
      />

      {/* 12. EVERY FUTURE HAS CONSEQUENCES: Moral Dilemmas + 3D Consequence Telemetry */}
      <EthicsSimulator />

      {/* 13. ASK THE FUTURE: Conversational AI Across 5 Perspectives */}
      <FutureAI />

      {/* 14. YOUR FUTURE STARTS HERE: Final Manifesto & Primary CTA */}
      <CTA
        onDesignFuture={() => scrollTo('simulator')}
        onExploreDigiverse={() => scrollTo('world')}
      />
    </div>
  );
}
