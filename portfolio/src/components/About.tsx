import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { timeline, toolkit } from '../data';
import { Reveal } from './Reveal';

const STATEMENT = 'Most of my repos start as “let me try this idea” — and end up as working systems.';
const HIGHLIGHT_FROM = STATEMENT.split(' ').indexOf('working');

/** One word of the statement: fades from grey to ink as the reader scrolls past. */
function Word({ word, progress, range, accent }: { word: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span className="w" style={{ opacity, y, color: accent ? 'var(--green)' : undefined, fontWeight: accent ? 500 : undefined, fontStyle: accent ? 'italic' : undefined }}>
      {word}
    </motion.span>
  );
}

export function About() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ['start 0.85', 'end 0.45'] });
  const words = STATEMENT.split(' ');

  const tlRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tlProgress } = useScroll({ target: tlRef, offset: ['start 0.8', 'end 0.5'] });

  return (
    <>
      <section id="about" className="wrap section about">
        <div className="about-copy">
          <div className="eyebrow">About me</div>
          <p className="statement" ref={statementRef} aria-label={STATEMENT}>
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={i >= HIGHLIGHT_FROM} />
            ))}
          </p>
          <Reveal>
            <p className="about-p">
              At Pakistan Artificial Intelligence Lab I build Python ML projects — data pipelines, FastAPI model deployment and
              Django back-ends. Before that I spent a year at Systems Limited on document processing, which taught me how messy
              real data is. Now I’m going deeper into deep learning, NLP and MLOps.
            </p>
          </Reveal>
        </div>

        <div className="tl" ref={tlRef}>
          <div className="tl-line" aria-hidden="true">
            <motion.div style={{ scaleY: tlProgress }} />
          </div>
          {timeline.map((t, i) => (
            <Reveal key={t.role} className="tl-item" delay={i * 0.12} y={24}>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-when">{t.when}</div>
              <div className="tl-role">{t.role}</div>
              <div className="tl-where">{t.where}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="wrap">
        <section className="toolkit" aria-label="Toolkit">
          {toolkit.map((t, i) => (
            <motion.div
              key={t.n}
              className={`tool${i === toolkit.length - 1 ? ' dark' : ''}`}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span className="mono">{t.n}</span>
              <h4>{t.title}</h4>
              <p>
                {t.items[0]}
                <br />
                {t.items[1]}
              </p>
            </motion.div>
          ))}
        </section>
      </div>
    </>
  );
}
