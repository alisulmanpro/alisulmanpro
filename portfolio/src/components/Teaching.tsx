import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { teachingTopics } from '../data';
import { SplitText } from './SplitText';

/** Green band that opens like a window as it scrolls in, with outlined text sliding behind. */
export function Teaching() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] });
  const inset = useTransform(enter, [0, 1], [10, 0]);
  const radius = useTransform(enter, [0, 1], [48, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px)`);

  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostX = useTransform(pass, [0, 1], ['10%', '-45%']);

  return (
    <motion.section id="teaching" ref={ref} className="teach" style={{ clipPath }}>
      <div className="wrap teach-inner">
        <h2 className="teach-title">
          <SplitText text="I also" /> <em><SplitText text="teach." delay={0.2} /></em>
        </h2>
        <motion.div
          className="teach-copy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <p>
            I run web-development classes and assist in lab seminars at Pakistan Artificial Intelligence Lab. Explaining
            something to a room of beginners is the fastest way I know to find the gaps in my own understanding.
          </p>
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {teachingTopics.map((t, i) => (
              <motion.span
                key={t}
                className="topic"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 260, damping: 16 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div className="teach-ghost" style={{ x: ghostX }} aria-hidden="true">
        HTML · CSS · JavaScript · React · Next.js ·
      </motion.div>
    </motion.section>
  );
}
