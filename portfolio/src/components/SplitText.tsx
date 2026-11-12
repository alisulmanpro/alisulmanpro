import { motion, type Variants } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  /** Seconds before the first letter moves. */
  delay?: number;
  /** Seconds between letters. */
  stagger?: number;
  /** 'mount' plays when `play` is true; 'view' plays when scrolled into view. */
  trigger?: 'mount' | 'view';
  play?: boolean;
};

const charVariants: Variants = {
  hidden: { y: '110%', rotate: 6 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } },
};

/**
 * Splits text into letters that rise from behind a mask, one after another.
 * Screen readers get the whole sentence once, from a visually hidden copy.
 */
export function SplitText({ text, className, delay = 0, stagger = 0.025, trigger = 'view', play = true }: Props) {
  const words = text.split(' ');
  const container: Variants = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };
  const animateProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: play ? 'show' : 'hidden' }
      : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <motion.span className={`split ${className ?? ''}`} variants={container} {...animateProps}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span className="split-word" key={wi} aria-hidden="true">
          {Array.from(word).map((ch, ci) => (
            <span className="split-mask" key={ci}>
              <motion.span className="split-char" variants={charVariants}>
                {ch}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  );
}
