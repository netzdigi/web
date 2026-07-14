'use client';

import Image from 'next/image';
import { Reveal } from './Motion';
import { ContainerScroll } from './ui/container-scroll-animation';

export default function PortfolioSection({ content }) {
  const p = content.portfolio;
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{p.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{p.title}</Reveal>
      </div>

      {p.items.map((item) => (
        <ContainerScroll
          key={item.url}
          titleComponent={
            <>
              <p className="scroll-showcase-url">{item.url}</p>
              <h3>{item.name}</h3>
              <p className="scroll-showcase-desc">{item.desc}</p>
            </>
          }
        >
          <a
            href={item.href}
            target="_blank"
            rel="noopener"
            aria-label={item.alt}
            className="scroll-showcase-link"
          >
            <Image
              src={`/assets/portfolio/${item.img}`}
              alt={item.alt}
              fill
              sizes="(max-width: 900px) 100vw, 1100px"
            />
          </a>
        </ContainerScroll>
      ))}
    </section>
  );
}
