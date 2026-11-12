import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Nav } from './components/Nav';
import { Preloader } from './components/Preloader';
import { Stats } from './components/Stats';
import { Teaching } from './components/Teaching';
import { Work } from './components/Work';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const reduce = prefersReducedMotion();
  const [loading, setLoading] = useState(!reduce);
  const [ready, setReady] = useState(reduce);
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scrolling (skipped for people who ask for reduced motion).
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  // Lock scrolling while the intro plays.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (loading) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  // Same-page links glide to their section instead of jumping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href') ?? '';
      const el = id === '#top' ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement, { offset: -70, duration: 1.4 });
      else (el as HTMLElement).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reduce]);

  const finishIntro = useCallback(() => {
    setLoading(false);
    setTimeout(() => setReady(true), 350);
  }, []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="pre" onDone={finishIntro} />}</AnimatePresence>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Cursor />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Stats />
        <Work />
        <About />
        <Teaching />
      </main>
      <Contact />
    </MotionConfig>
  );
}
