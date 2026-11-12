import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { moreProjects, profile } from '../data';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { TiltCard } from './TiltCard';

const ease = [0.2, 0.8, 0.2, 1] as const;
const ROUTE = 'M28 150 C 60 110, 85 135, 105 100 S 150 55, 178 72 S 230 40, 238 22';

export function Work() {
  return (
    <section id="work" className="wrap section">
      <Reveal className="section-head">
        <div>
          <div className="eyebrow">Selected work</div>
          <h2 className="h2">
            <SplitText text="Things I’ve" /> <em><SplitText text="shipped." delay={0.25} /></em>
          </h2>
        </div>
        <a className="link-u" href={profile.links.github} target="_blank" rel="noopener noreferrer">
          All 23 repositories ↗
        </a>
      </Reveal>

      <Routify />

      <div className="pair">
        <Rozzy />
        <VuPilot />
      </div>

      <div className="list">
        {moreProjects.map((p, i) => (
          <motion.a
            key={p.n}
            className="row"
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
          >
            <span className="row-n">{p.n}</span>
            <span className="row-title">{p.title}</span>
            <span className="row-text">{p.text}</span>
            <span className="row-arr" aria-hidden="true">↗</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Routify ---------------- */
function Routify() {
  const notes = [
    { t: 'Import a manifest', s: 'PDF, Excel or Word — or speak, type or drop a pin' },
    { t: 'Scan Eircodes & barcodes', s: 'On-device OCR with the camera' },
    { t: 'No signal? Keep working', s: 'SQLite outbox syncs when you’re back online' },
  ];
  return (
    <TiltCard href="https://github.com/alisulmanpro/routify" className="feature" max={3}>
      <div className="card-media">
        <span className="feature-tag" aria-hidden="true">Rider app · iOS &amp; Android</span>
        <div className="phone">
          <div className="phone-screen">
            <div className="phone-head">
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Today</div>
              <div style={{ marginTop: 2, fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Your route</div>
              <div className="phone-badge"><span className="ping" style={{ width: 6, height: 6 }} />Optimised · works offline</div>
            </div>
            <svg viewBox="0 0 266 170" width="266" height="170" role="img" aria-label="Map with an optimised delivery route" style={{ display: 'block', background: '#dde7d8', width: '100%', height: 'auto' }}>
              <g stroke="#F3F5F0" strokeWidth="6" fill="none">
                <path d="M0 40 H266" /><path d="M0 120 H266" /><path d="M70 0 V170" /><path d="M170 0 V170" /><path d="M0 160 L266 10" />
              </g>
              <motion.path
                d={ROUTE}
                fill="none"
                stroke="#234536"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1] }}
                transition={{ duration: 4, times: [0, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
              />
              <circle r="6" fill="#2F7A52" stroke="#fff" strokeWidth="2">
                <animateMotion dur="4s" repeatCount="indefinite" path={ROUTE} />
              </circle>
              <g fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600" textAnchor="middle">
                {[
                  [28, 150, 1, true],
                  [105, 100, 2, true],
                  [178, 72, 3, false],
                  [238, 22, 4, false],
                ].map(([x, y, n, done]) => (
                  <g key={n as number}>
                    <circle cx={x as number} cy={y as number} r="9" fill={done ? '#234536' : '#fff'} stroke="#234536" strokeWidth="2" />
                    <text x={x as number} y={(y as number) + 3} fill={done ? '#F3F5F0' : '#234536'}>{n as number}</text>
                  </g>
                ))}
              </g>
            </svg>
            <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="stop"><span><b>Stop 02</b> · delivered</span><span style={{ color: 'var(--green-2)', fontWeight: 600 }}>✓</span></div>
              <div className="stop next"><span><b>Stop 03</b> · next</span><span className="mono" style={{ fontSize: 11 }}>Navigate →</span></div>
              <div className="stop photo">Take photo · proof of delivery</div>
            </div>
          </div>
        </div>
        <div className="feature-notes">
          {notes.map((n, i) => (
            <motion.div
              key={n.t}
              className="note"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease }}
            >
              <b>{n.t}</b>
              <span>{n.s}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="feature-body">
        <div style={{ flex: '1 1 300px' }}>
          <div className="card-meta">01 · Client project · Ireland</div>
          <h3>Routify</h3>
          <div className="muted" style={{ marginTop: 10, fontSize: 14 }}>In development · 125 commits · CI on every push</div>
        </div>
        <div style={{ flex: '2 1 420px' }}>
          <p>
            Route planning and delivery management for independent couriers. Riders import their parcels, get the best stop
            order for hundreds of stops, record photo proof of delivery and keep working offline. A FastAPI backend with a
            background optimisation worker serves the Expo rider app and a React admin console, with subscriptions through
            the App Store and Google Play.
          </p>
          <div className="tags">Expo · React Native · FastAPI · PostgreSQL · Prisma · RevenueCat</div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ---------------- Rozzy ---------------- */
const SPOKEN = '2 ande 120 rupe dargen k hisab se';

function Rozzy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -20% 0px' });
  const [typed, setTyped] = useState(0);

  // Types the spoken sentence, holds the finished bill, then starts again.
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let hold: ReturnType<typeof setTimeout> | undefined;
    const tick = setInterval(() => {
      i += 1;
      if (i <= SPOKEN.length) setTyped(i);
      else if (!hold) hold = setTimeout(() => { i = 0; hold = undefined; setTyped(0); }, 3200);
    }, 55);
    return () => {
      clearInterval(tick);
      if (hold) clearTimeout(hold);
    };
  }, [inView]);
  const done = typed >= SPOKEN.length;

  return (
    <TiltCard href="https://github.com/alisulmanpro/Rozzy">
      <div className="card-media" ref={ref}>
        <div className="rozzy-media">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="mic" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" />
              </svg>
            </span>
            <div className="wave" aria-hidden="true">
              {Array.from({ length: 9 }, (_, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: done ? 0.25 : [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: done ? 0 : Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>
          <div className="speech" aria-label={`Spoken order: ${SPOKEN}`}>
            “{SPOKEN.slice(0, typed)}
            {!done && <span className="caret" />}
            {done && '”'}
          </div>
          <motion.div className="bill" animate={{ opacity: done ? 1 : 0.25, y: done ? 0 : 10 }} transition={{ duration: 0.5, ease }}>
            <div className="bill-row head"><span>item</span><span>qty</span><span>rate</span><span className="r">total</span></div>
            <div className="bill-row"><span>Anday</span><span>2 pc</span><span>Rs 10/pc</span><span className="total">Rs 20</span></div>
          </motion.div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, fontSize: 13, color: 'var(--sage-ink)' }}>
            <span>Roman Urdu · Punjabi · pao, dozen, dedh, dhai</span>
            <span><b>98.9%</b> sentence match*</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="card-meta">02 · Voice billing · In development</div>
        <h3>Rozzy</h3>
        <p>
          A billing assistant for Pakistani kiryana shops. The shopkeeper says the order the way they speak; a small
          scikit-learn model turns it into structured items, and plain code does the maths so the bill is always exact.
        </p>
        <div className="tags">Expo · FastAPI · scikit-learn &nbsp;·&nbsp; *on a synthetic test set</div>
      </div>
    </TiltCard>
  );
}

/* ---------------- VU Pilot AI ---------------- */
function VuPilot() {
  const rows = [
    { k: 'Assignment', v: 'due in 2 days', c: '#F2B880' },
    { k: 'Quiz', v: 'opens tomorrow', c: '#8FD3A9' },
    { k: 'GDB', v: 'closes Friday', c: '#8E9890' },
  ];
  return (
    <TiltCard href="https://vulms-ai-companion.vercel.app">
      <div className="card-media">
        <div className="vu-media">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontWeight: 600 }}>VU Pilot AI</span>
            <span className="mono" style={{ fontSize: 11, color: '#8E9890' }}>LMS synced</span>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.k}
              className="vu-row"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease }}
            >
              <span>{r.k}</span>
              <span style={{ color: r.c }}>{r.v}</span>
            </motion.div>
          ))}
          <motion.div
            className="toast"
            animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -6] }}
            transition={{ duration: 4.5, times: [0, 0.18, 0.85, 1], repeat: Infinity, repeatDelay: 0.4 }}
          >
            <i aria-hidden="true">✓</i>
            <span>Reminder sent on WhatsApp</span>
          </motion.div>
        </div>
      </div>
      <div className="card-body">
        <div className="card-meta">03 · EdTech · Active development</div>
        <h3>VU Pilot AI</h3>
        <p>
          An academic companion for Virtual University students. It watches VULMS for assignments, quizzes and GDBs and sends
          deadline reminders on WhatsApp, through a web dashboard and a browser extension. AI exam prep is next on the roadmap.
        </p>
        <div className="tags">Next.js · FastAPI · Playwright · PostgreSQL · Redis</div>
      </div>
    </TiltCard>
  );
}
