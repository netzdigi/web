import { Reveal, StaggerGroup, StaggerItem } from './Motion';

export default function PackagesSection({ content }) {
  const p = content.packages;
  return (
    <section className="section section-alt" id="packages">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{p.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{p.title}</Reveal>
        <StaggerGroup className="grid grid-3">
          {p.tiers.map((tier) => (
            <StaggerItem
              as="article"
              className={`pricing-card${tier.featured ? ' pricing-featured' : ''}`}
              key={tier.name}
            >
              {tier.badge && <p className="pricing-badge">{tier.badge}</p>}
              <h3>{tier.name}</h3>
              <p className="pricing-desc">{tier.desc}</p>
              <ul className="pricing-list">
                {tier.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contact" className={`btn btn-${tier.variant} btn-block`}>{tier.cta}</a>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal as="p" className="pricing-note">{p.note}</Reveal>
      </div>
    </section>
  );
}
