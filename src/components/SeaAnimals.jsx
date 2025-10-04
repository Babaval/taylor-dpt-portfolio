import React, { useEffect, useMemo } from 'react';

// Simple sea animals animation without external deps.
// Props:
// - count: number of animals
// - duration: total ms for the animation
// - onFinish: callback when animation completes
// - active: boolean to play animation
export default function SeaAnimals({ count = 4, duration = 1500, onFinish = () => {}, active = false }) {
  const animals = useMemo(() => [
    { name: 'fish', emoji: '🐟' },
    { name: 'turtle', emoji: '🐢' },
    { name: 'dolphin', emoji: '🐬' },
    { name: 'whale', emoji: '🐳' },
    { name: 'octopus', emoji: '🐙' },
    { name: 'shrimp', emoji: '🦐' },
  ], []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onFinish && onFinish(), duration + 80);
    return () => clearTimeout(t);
  }, [active, duration, onFinish]);

  if (!active) return null;

  // Generate randomized animal instances
  const instances = Array.from({ length: Math.max(1, Math.min(6, count)) }).map((_, i) => {
    const a = animals[(Math.floor(Math.random() * animals.length) + i) % animals.length];
    const size = 32 + Math.floor(Math.random() * 36); // 32..68px
    const top = 10 + Math.floor(Math.random() * 60); // percent
    const delay = Math.floor(Math.random() * 300); // ms
    const durationMs = duration + Math.floor(Math.random() * 400) - 200; // +-200ms
    const direction = Math.random() > 0.5 ? 1 : -1;
    const leftStart = direction === 1 ? -12 : 112;
    const leftEnd = direction === 1 ? 112 : -12;
    return { id: i, emoji: a.emoji, size, top, delay, durationMs, leftStart, leftEnd, direction };
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {instances.map(inst => (
        <span
          key={inst.id}
          className="sea-animal"
          style={{
            position: 'absolute',
            top: `${inst.top}%`,
            left: `${inst.leftStart}%`,
            fontSize: inst.size,
            transform: `translateX(0) scale(${inst.direction === -1 ? -1 : 1})`,
            transitionProperty: 'transform, left, opacity',
            transitionTimingFunction: 'cubic-bezier(.22,.9,.36,1)',
            transitionDuration: `${inst.durationMs}ms`,
            transitionDelay: `${inst.delay}ms`,
          }}
          onTransitionEnd={() => { /* no-op */ }}
        >
          {inst.emoji}
          <style>{`
            .sea-animal { display: inline-block; will-change: transform, left, opacity; }
          `}</style>
        </span>
      ))}
      <SeaAnimator instances={instances} />
    </div>
  );
}

function SeaAnimator({ instances }) {
  // This hidden component triggers the left property change after mount so CSS transitions run.
  useEffect(() => {
    // run in next tick so initial positions apply
    const raf = requestAnimationFrame(() => {
      instances.forEach((inst) => {
        const el = document.querySelector(`.sea-animal:nth-of-type(${inst.id + 1})`);
        if (!el) return;
        el.style.left = inst.leftEnd + '%';
        el.style.opacity = '1';
        // gentle vertical wiggle using animation
        el.style.animation = `seaWiggle ${inst.durationMs}ms ease-in-out ${inst.delay}ms forwards`;
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [instances]);

  return (
    <style>{`
      @keyframes seaWiggle {
        0% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-6px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(6px); }
        100% { transform: translateY(0); }
      }
    `}</style>
  );
}
