import { Reveal, StaggerGroup, StaggerItem } from './Motion';
import Icon from './Icon';

export default function ServicesSection({ content }) {
  const s = content.services;
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{s.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{s.title}</Reveal>
        <StaggerGroup className="grid grid-3">
          {s.items.map((item) => (
            <StaggerItem as="article" className="card" key={item.title}>
              <div className="card-icon"><Icon name={item.icon} /></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
