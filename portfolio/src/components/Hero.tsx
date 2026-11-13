import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { profile } from '../data';
import { useClock } from '../hooks/useClock';
import { Magnetic } from './Magnetic';
import { NeuralSphere } from './NeuralSphere';
import { SplitText } from './SplitText';

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero({ ready }: { ready: boolean }) {
  const time = useClock(profile.timeZone);
  const ref = useRef<HTMLElement>(null);

  // Mouse parallax, only for a real mouse (touch and trackpad scrolling never trigger it).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 22 });
  const sy = useSpring(my, { stiffness: 80, damping: 22 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my]);
  // Only the small floating chips drift; the arch and the photo never move.
  const frontX = useTransform(sx, (v) => v * 8);
  const frontY = useTransform(sy, (v) => v * 6);

  // Scroll: only the text drifts up and fades. The photo stays where it is.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const show = ready ? 'show' : 'hidden';

  return (
    <section id="top" ref={ref} className="wrap hero">
      <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.div
          className="pill"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <span className="ping" />
          {profile.location} · {time} PKT · open to work
        </motion.div>

        <h1 className="hero-title">
          <span className="line">
            <SplitText text="I turn data" trigger="mount" play={ready} delay={0.2} />
          </span>
          <span className="line">
            <SplitText text="into" trigger="mount" play={ready} delay={0.45} />{' '}
            <em>
              <motion.span
                className="hl"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: ready ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 1.25, ease: [0.7, 0, 0.2, 1] }}
              />
              <SplitText text="products" trigger="mount" play={ready} delay={0.55} />
            </em>
          </span>
          <span className="line">
            <SplitText text="people use." trigger="mount" play={ready} delay={0.75} />
          </span>
        </h1>

        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.1, ease }}
        >
          {profile.intro}
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.25, ease }}
        >
          <Magnetic>
            <a className="btn btn-primary" href="#work">
              See my work <span className="go" aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <div className="hero-visual">
        <div className="layer">
          <motion.div
            className="arch"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: ready ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.7, 0, 0.2, 1] }}
          >
            <NeuralSphere />
          </motion.div>
        </div>

        <div className="layer">
          <motion.img
            className="hero-photo"
            src="/ali.webp"
            alt="Ali Sulman in a dark green shirt"
            width={927}
            height={1200}
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.75, ease }}
          />
        </div>

        <motion.div className="layer" style={{ x: frontX, y: frontY, pointerEvents: 'none' }} initial="hidden" animate={show}>
          <FloatChip top={160} left={0} delay={1.5} label="model" value="Python · scikit-learn" />
          <FloatChip top={320} right={0} delay={1.65} label="api" value="FastAPI · Django" float={-2} />
          <FloatChip bottom={60} left={10} delay={1.8} label="product" value="Next.js · TypeScript" dark float={-3.5} />
          <motion.div
            className="badge"
            style={{ pointerEvents: 'auto' }}
            initial={{ scale: 0, rotate: -90 }}
            animate={ready ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 1.95, type: 'spring', stiffness: 160, damping: 14 }}
          >
            <svg viewBox="0 0 120 120" width="112" height="112" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <circle cx="60" cy="60" r="59" fill="#234536" />
              <text fontFamily="JetBrains Mono, monospace" fontSize="10.5" letterSpacing="2.2" fill="#F3F5F0">
                <textPath href="#badge-circle">OPEN TO WORK · AVAILABLE NOW · </textPath>
              </text>
            </svg>
            <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Message Ali on WhatsApp" data-cursor="Chat">
              ↗
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

type ChipProps = {
  label: string;
  value: string;
  delay: number;
  dark?: boolean;
  float?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

function FloatChip({ label, value, delay, dark, float = 0, ...pos }: ChipProps) {
  return (
    <motion.div
      style={{ position: 'absolute', ...pos }}
      variants={{
        hidden: { opacity: 0, scale: 0.6 },
        show: { opacity: 1, scale: 1, transition: { delay, type: 'spring', stiffness: 220, damping: 14 } },
      }}
    >
      <motion.div
        className={`chip${dark ? ' dark' : ''}`}
        style={{ position: 'relative' }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: float }}
      >
        <small>{label}</small>
        <b>{value}</b>
      </motion.div>
    </motion.div>
  );
}
