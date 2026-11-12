import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { profile } from '../data';
import { Magnetic } from './Magnetic';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#teaching', label: 'Teaching' },
];

/** Sticky bar that slides away while scrolling down and returns when scrolling up. */
export function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
  });

  return (
    <motion.header
      className="nav"
      initial={{ y: -80 }}
      animate={{ y: ready && !hidden ? 0 : -80 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="wrap nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">{profile.initials}</span>
          {profile.name}
        </a>
        <nav aria-label="Main" className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              <span className="roll" data-text={l.label}>
                {l.label}
              </span>
            </a>
          ))}
          <Magnetic strength={0.25}>
            <a className="btn btn-dark" href="#contact" style={{ marginLeft: 6 }}>
              Let’s talk
            </a>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
  );
}
