import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e) => {
      const target = e.target.closest('button, a, input[type="range"], [data-cursor]');
      if (!target) {
        setCursorState('default');
        return;
      }

      const customType = target.getAttribute('data-cursor');
      if (customType) {
        setCursorState(customType);
      } else if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a') {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-seagreen-primary shadow-sm"
        style={{
          transform: 'translate(-50%, -50%)',
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Smooth Sea-Green / Gold Follower Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full transition-colors backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (cursorState === 'hover' ? 24 : cursorState === 'card' ? 32 : 14),
          y: mousePosition.y - (cursorState === 'hover' ? 24 : cursorState === 'card' ? 32 : 14),
          width: cursorState === 'hover' ? 48 : cursorState === 'card' ? 64 : 28,
          height: cursorState === 'hover' ? 48 : cursorState === 'card' ? 64 : 28,
          backgroundColor:
            cursorState === 'hover'
              ? 'rgba(47, 143, 131, 0.18)'
              : cursorState === 'card'
              ? 'rgba(200, 169, 107, 0.12)'
              : 'rgba(47, 143, 131, 0.08)',
          borderColor:
            cursorState === 'hover'
              ? 'rgba(200, 169, 107, 0.65)'
              : cursorState === 'card'
              ? 'rgba(47, 143, 131, 0.55)'
              : 'rgba(47, 143, 131, 0.35)',
        }}
        style={{ borderWidth: '1px' }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 320,
          mass: 0.2,
        }}
      />
    </>
  );
}
