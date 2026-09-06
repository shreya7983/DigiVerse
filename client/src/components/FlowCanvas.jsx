import React, { useEffect, useRef } from 'react';

export default function FlowCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Oceanic digital filaments and particles
    const particleCount = Math.min(Math.floor((width * height) / 14000), 65);
    const particles = [];

    const colors = [
      'rgba(47, 143, 131, 0.45)', // Sea Green Primary
      'rgba(23, 107, 99, 0.40)',  // Deep Sea Green
      'rgba(216, 240, 234, 0.35)',// Soft Seafoam
      'rgba(200, 169, 107, 0.28)',// Champagne Gold Accent Mote
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Draw subtle oceanic wave lines across the canvas
      ctx.lineWidth = 1;
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const waveY = height * (0.35 + w * 0.25);
        ctx.strokeStyle = `rgba(47, 143, 131, ${0.04 + w * 0.02})`;
        for (let x = 0; x <= width; x += 20) {
          const y = waveY + Math.sin(x * 0.003 + time * 1.2 + w) * 45 + Math.cos(x * 0.0015 + time * 0.8) * 25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Connect nearby particles with gentle filaments
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.18 * particles[i].z;
            ctx.strokeStyle = `rgba(47, 143, 131, ${alpha})`;
            ctx.lineWidth = 0.8 * particles[i].z;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & render particles with fluid current drift
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle mouse interaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = ((mouse.radius - dist) / mouse.radius) * p.z;
          p.x += (dx / (dist || 1)) * force * 1.5;
          p.y += (dy / (dist || 1)) * force * 1.5;
        }

        // Ocean current fluid movement
        p.x += p.vx * p.z + Math.cos(time * 0.8 + p.y * 0.005) * 0.25;
        p.y += p.vy * p.z + Math.sin(time * 0.8 + p.x * 0.005) * 0.25;

        // Wrap boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
