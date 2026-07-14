'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal, StaggerGroup, TiltCard } from './Motion';

export default function PortfolioSection({ content }) {
  const p = content.portfolio;
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{p.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{p.title}</Reveal>
        <StaggerGroup className="grid grid-3 portfolio-grid">
          {p.items.map((item) => (
            <TiltCard className="portfolio-card" key={item.url} href={item.href} target="_blank" rel="noopener">
              <span className="portfolio-shot">
                <motion.span
                  style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={`/assets/portfolio/${item.img}`}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </motion.span>
              </span>
              <span className="portfolio-info">
                <span className="portfolio-name">{item.name}</span>
                <span className="portfolio-url">{item.url}</span>
                <span className="portfolio-desc">{item.desc}</span>
              </span>
            </TiltCard>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
