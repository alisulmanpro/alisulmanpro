import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { marqueeBottom, marqueeTop } from '../data';

/**
 * A row that scrolls forever. Scrolling the page speeds it up,
 * and scrolling up flips its direction.
 */
function VelocityRow({ children, baseVelocity, className }: { children: ReactNode; baseVelocity: number; className?: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  return (
    <motion.div className={`marquee-row ${className ?? ''}`} style={{ x }}>
      {children}
      {children}
    </motion.div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-label={`Technologies: ${marqueeTop.join(', ')}`}>
      <VelocityRow baseVelocity={-2.5}>
        {marqueeTop.map((t) => (
          <span key={t} style={{ display: 'contents' }}>
            <span aria-hidden="true">{t}</span>
            <span className="star" aria-hidden="true">✳</span>
          </span>
        ))}
      </VelocityRow>
      <VelocityRow baseVelocity={2} className="outline">
        {marqueeBottom.map((t) => (
          <span key={t} style={{ display: 'contents' }}>
            <span className="t" aria-hidden="true">{t}</span>
            <span aria-hidden="true">●</span>
          </span>
        ))}
      </VelocityRow>
    </div>
  );
}
