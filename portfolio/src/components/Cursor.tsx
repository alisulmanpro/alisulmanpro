import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Two-part cursor: a dot that follows exactly and a ring that trails behind.
 * Over links the ring grows; over elements with data-cursor="Label" it shows that label.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const [mode, setMode] = useState<{ kind: 'idle' | 'link' | 'label'; label?: string }>({ kind: 'idle' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      const labelled = t?.closest?.('[data-cursor]') as HTMLElement | null;
      if (labelled) setMode({ kind: 'label', label: labelled.dataset.cursor });
      else if (t?.closest?.('a, button')) setMode({ kind: 'link' });
      else setMode({ kind: 'idle' });
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  const ringClass = 'cursor-ring' + (mode.kind === 'link' ? ' is-link' : mode.kind === 'label' ? ' is-label' : '');
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y, opacity: visible && mode.kind !== 'label' ? 1 : 0 }} aria-hidden="true" />
      <motion.div className={ringClass} style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }} aria-hidden="true">
        {mode.kind === 'label' ? mode.label : null}
      </motion.div>
    </>
  );
}
