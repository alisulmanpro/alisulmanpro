import { motion } from 'framer-motion';
import { profile } from '../data';
import { Magnetic } from './Magnetic';
import { SplitText } from './SplitText';

export function Contact() {
  const letters = Array.from(profile.name);
  return (
    <footer id="contact" className="wrap contact">
      <div className="eyebrow">Contact</div>
      <h2 className="contact-title">
        <SplitText text="Have a model that needs an interface?" stagger={0.015} />{' '}
        <em><SplitText text="Let’s talk." delay={0.5} /></em>
      </h2>
      <motion.div
        className="contact-ctas"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <Magnetic>
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            {profile.email} <span className="go" aria-hidden="true">→</span>
          </a>
        </Magnetic>
        <Magnetic>
          <a className="btn" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
        </Magnetic>
        <Magnetic>
          <a className="btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </Magnetic>
      </motion.div>

      <div className="foot">
        <span>© 2026 {profile.name} · Punjab, Pakistan</span>
        <nav aria-label="Social">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.links.x} target="_blank" rel="noopener noreferrer">X</a>
          <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
        <a href="#top">Back to top ↑</a>
      </div>

      <motion.div
        className="wordmark"
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {letters.map((ch, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              variants={{ hidden: { y: '100%' }, show: { y: '0%', transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] } } }}
              whileHover={{ y: '-12%', color: '#2F7A52', transition: { type: 'spring', stiffness: 400, damping: 10 } }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </footer>
  );
}
