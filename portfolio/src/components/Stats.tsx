import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { stats, type Stat } from '../data';

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, stat.value, {
      duration: 2.2,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(stat.decimals ?? 0);
      },
    });
    return () => c.stop();
  }, [inView, stat]);

  return (
    <span aria-label={`${stat.prefix ?? ''}${stat.value}${stat.suffix ?? ''}`}>
      {stat.prefix}
      <span ref={ref} aria-hidden="true">
        0
      </span>
      {stat.suffix}
    </span>
  );
}

export function Stats() {
  return (
    <div className="wrap">
      <section className="stats" aria-label="Numbers">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.div
              className="stat-line"
              style={{ background: s.accent ? 'var(--green)' : undefined }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.7, 0, 0.2, 1] }}
            />
            <div className="stat-num" style={{ color: s.accent ? 'var(--green)' : undefined }}>
              <CountUp stat={s} />
            </div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </section>
      <p className="footnote">* Measured on a synthetic test set; real-world accuracy is still being collected.</p>
    </div>
  );
}
