import { Reveal, StaggerGroup, StaggerItem } from './Motion';

export default function WhyUsSection({ content }) {
  const w = content.whyUs;
  return (
    <section className="section section-alt" id="why-us">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{w.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{w.title}</Reveal>
        <StaggerGroup className="grid grid-2 why-grid">
          {w.items.map((item) => (
            <StaggerItem className="why-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
