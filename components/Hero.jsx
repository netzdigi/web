'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Motion';

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
        <Reveal as="h1">
          {content.hero.titlePrefix}
          <br />
          {content.hero.titleParts.map((part, i) =>
            part.accent ? (
              <span key={i} className="accent">{part.text}</span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </Reveal>
        <Reveal as="p" className="hero-lead" delay={0.05}>{content.hero.lead}</Reveal>
        <Reveal className="hero-actions" delay={0.1}>
          <a href={content.hero.ctaPrimary.href} className="btn btn-primary">{content.hero.ctaPrimary.label}</a>
          <a href={content.hero.ctaSecondary.href} className="btn btn-ghost">{content.hero.ctaSecondary.label}</a>
        </Reveal>
        <Reveal as="p" className="hero-trust" delay={0.15}>{content.hero.trust}</Reveal>
      </div>
    </section>
  );
}
