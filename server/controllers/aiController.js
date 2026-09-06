const SPECULATIVE_KNOWLEDGE_BASE = [
  {
    keywords: ['education', 'learn', 'school', 'university', 'student', 'teacher', 'classroom', 'tutor'],
    response: `By 2040, education shifts from standardized batch curriculum toward continuous, personalized knowledge synthesis. Rather than memorizing static information, students collaborate with empathetic AI tutors that adapt pacing to neurodivergent strengths and cognitive flow states. Physical schools evolve into civic collaboration studios where human mentorship, ethical debate, emotional resilience, and hands-on fabrication take center stage.`
  },
  {
    keywords: ['city', 'cities', 'urban', 'transport', 'traffic', 'building', 'infrastructure', 'mobility'],
    response: `Future urban environments operate as living ecological networks. By 2035–2050, static asphalt gives way to kinetic biophilic transit corridors where on-demand autonomous multi-modal pods synchronize effortlessly, virtually eliminating traffic bottlenecks and acoustic pollution. Building facades act as carbon-absorbing porous membranes, generating solar energy by day and cooling micro-climates through passive biomimetic ventilation.`
  },
  {
    keywords: ['healthcare', 'health', 'medicine', 'hospital', 'doctor', 'disease', 'wellness', 'wearable'],
    response: `The future of healthcare transitions from crisis reaction to predictive cellular guardianship. Ambient sensors in textiles and living spaces track metabolic rhythms, micro-inflammatory biomarkers, and sleep architecture non-invasively. When anomalies arise, generative AI models synthesize bespoke molecular therapies before symptoms manifest, returning physicians to empathetic caregiver and preventive strategists.`
  },
  {
    keywords: ['robot', 'work', 'job', 'automate', 'automation', 'labor', 'replace', 'colleague'],
    response: `The human-technology boundary matures into collaborative augmentation rather than wholesale replacement. Routine computational and mechanical strain shifts to autonomous systems, while human roles elevate around architectural judgment, moral stewardship, creative philosophy, and relational care. The vital challenge is not technological capability, but instituting fair economic dividends and dignity in human agency.`
  },
  {
    keywords: ['identity', 'digital identity', 'privacy', 'avatar', 'virtual', 'surveillance', 'data'],
    response: `Digital identity in the next decade demands cryptographic self-sovereignty. Instead of renting identity from centralized corporate platforms, individuals hold decentralized zero-knowledge identity anchors. You verify your qualifications, human uniqueness, or citizenship without ever disclosing granular biometric details or browsing histories, establishing privacy as an architectural default.`
  },
  {
    keywords: ['sustainability', 'energy', 'climate', 'green', 'carbon', 'planet', 'renewable'],
    response: `Sustainable technology in 2030–2050 relies on regenerative computing and closed-loop material cycles. Next-generation data centers are powered by localized geothermal micro-grids and co-located with urban heat-recovery projects, warming residential districts. Technology ceases to treat the natural world as an externality and begins mirroring biological metabolic loops.`
  },
  {
    keywords: ['ai', 'artificial intelligence', 'agi', 'consciousness', 'sentience', 'ethics'],
    response: `The most profound evolution of artificial intelligence is not raw benchmark scaling, but relational alignment with human flourishing. We move past monolithic black-box systems to verifiable, interpretable multi-agent networks designed to respect cultural pluralism, cite foundational reasoning, and defer consequential moral boundaries to deliberative human assemblies.`
  }
];

export const chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message content required' });
    }

    const cleanMsg = message.trim().toLowerCase();

    // Check if Gemini API key is configured
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are the DigiVerse Future AI Assistant — an articulate, calm, intellectually rigorous, human-centered futurist. The theme is "Design the Digital Future".
Tone rules:
- Calm, elegant, thoughtful, philosophical, and optimistic yet balanced with ethical awareness.
- Avoid hollow tech buzzwords or sensationalist sci-fi hype.
- Respond with 2 to 3 concise, impactful paragraphs.
- Keep answers grounded in human dignity, sustainable systems, and responsible innovation.

User question: ${message}`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.json({
              reply: replyText,
              source: 'gemini-live',
            });
          }
        }
      } catch (geminiError) {
        console.warn('Live Gemini API call error, falling back to speculative engine:', geminiError.message);
      }
    }

    // Speculative Knowledge Matcher
    const matched = SPECULATIVE_KNOWLEDGE_BASE.find((entry) =>
      entry.keywords.some((kw) => cleanMsg.includes(kw))
    );

    if (matched) {
      return res.json({
        reply: matched.response,
        source: 'speculative-knowledge-engine',
      });
    }

    // Default nuanced philosophical reply
    const fallbackResponse = `When we envision the horizon of ${cleanMsg.slice(0, 40)}, the most critical realization is that technology is neither an inevitable destiny nor a neutral tool—it is an intentional mirror of our collective priorities. 

If we design with empathy, regenerative principles, and distributed agency, tomorrow's digital infrastructure will protect human solitude, expand cognitive horizons, and restore balance with the natural environment. What specific aspect of this transition matters most to your vision?`;

    return res.json({
      reply: fallbackResponse,
      source: 'speculative-knowledge-engine',
    });
  } catch (error) {
    console.error('Error in AI chat endpoint:', error);
    return res.status(500).json({ error: 'Speculative network connection interrupted' });
  }
};
