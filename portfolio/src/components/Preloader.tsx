import { animate, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../data';

/** Full-screen intro: counts 0 → 100, then the green panel lifts away. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.6, 0, 0.2, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, '0');
        setProgress(v / 100);
      },
      onComplete: () => setTimeout(onDone, 250),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 1, ease: [0.7, 0, 0.2, 1] } }}
      aria-hidden="true"
    >
      <div className="mono" style={{ fontSize: 13, color: '#c7debf' }}>
        Full-stack AI developer · portfolio 2026
      </div>
      <div>
        <div className="preloader-row">
          <div className="preloader-name">
            {Array.from(profile.name).map((ch, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              </span>
            ))}
          </div>
          <span className="preloader-count" ref={countRef}>
            000
          </span>
        </div>
        <div className="preloader-bar">
          <div style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </motion.div>
  );
}
