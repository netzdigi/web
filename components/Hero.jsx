'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE, Reveal } from './Motion';

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const headlineWord = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const CTA_SPRING = { type: 'spring', stiffness: 400, damping: 17 };

// Non-accent text animates word by word; accent phrases animate as one
// chunk so their gradient stays continuous across the whole phrase.
// Every token is followed by exactly one space, so the parts' own
// leading/trailing spaces can be dropped safely.
function HeadlineWords({ text }) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => (
      <span key={i}>
        <motion.span variants={headlineWord} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>{' '}
      </span>
    ));
}

export default function Hero({ content }) {
  const { scrollY } = useScroll();
  const glow1Y = useTransform(scrollY, [0, 800], [0, 800 * 0.18]);
  const glow2Y = useTransform(scrollY, [0, 800], [0, 800 * -0.12]);

  return (
    <section className="hero">
      <motion.div className="hero-glow hero-glow-1" style={{ y: glow1Y }} />
      <motion.div className="hero-glow hero-glow-2" style={{ y: glow2Y }} />
      <div className="container hero-inner">
        <Reveal as="p" className="eyebrow">{content.hero.eyebrow}</Reveal>
        <motion.h1 variants={headlineContainer} initial="hidden" animate="visible">
          <HeadlineWords text={content.hero.titlePrefix} />
          <br />
          {content.hero.titleParts.map((part, i) =>
            part.accent ? (
              <span key={i}>
                <motion.span
                  className="accent"
                  variants={headlineWord}
                  style={{ display: 'inline-block' }}
                >
                  {part.text.trim()}
                </motion.span>{' '}
              </span>
            ) : (
              <HeadlineWords key={i} text={part.text} />
            )
          )}
        </motion.h1>
        <Reveal as="p" className="hero-lead" delay={0.35}>{content.hero.lead}</Reveal>
        <Reveal className="hero-actions" delay={0.45}>
          <motion.a
            href={content.hero.ctaPrimary.href}
            className="btn btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={CTA_SPRING}
          >
            {content.hero.ctaPrimary.label}
          </motion.a>
          <motion.a
            href={content.hero.ctaSecondary.href}
            className="btn btn-ghost"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={CTA_SPRING}
          >
            {content.hero.ctaSecondary.label}
          </motion.a>
        </Reveal>
        <Reveal as="p" className="hero-trust" delay={0.55}>{content.hero.trust}</Reveal>
      </div>
    </section>
  );
}
