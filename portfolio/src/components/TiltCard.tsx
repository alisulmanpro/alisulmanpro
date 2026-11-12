import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  max?: number;
};

/**
 * A project card that tilts in 3D toward the cursor and opens from a clipped
 * rectangle the first time it scrolls into view.
 */
export function TiltCard({ href, className, children, max = 6 }: Props) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });

  return (
    <div style={{ perspective: 1400 }} className={className}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        data-cursor="View"
        style={{ rotateX, rotateY }}
        initial={{ clipPath: 'inset(14% 8% 14% 8% round 28px)', opacity: 0, y: 60 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
      </motion.a>
    </div>
  );
}
