'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal, StaggerGroup, TiltCard } from './Motion';
import { ContainerScroll } from './ui/container-scroll-animation';

export default function PortfolioSection({ content }) {
  const p = content.portfolio;
  const flagship = p.items[p.flagshipIndex ?? 0];
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{p.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{p.title}</Reveal>
      </div>

      <ContainerScroll
        titleComponent={
          <h3>
            {p.showcaseLead}
            <span className="accent">{flagship.name}</span>
          </h3>
        }
      >
        <Image
          src={`/assets/portfolio/${flagship.img}`}
          alt={flagship.alt}
          fill
          sizes="(max-width: 900px) 100vw, 1100px"
        />
      </ContainerScroll>

      <div className="container">
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
