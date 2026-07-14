import { Reveal, StaggerGroup, StaggerItem } from './Motion';
import Icon from './Icon';

export default function AutomationSection({ content }) {
  const a = content.automation;
  return (
    <section className="section section-alt" id="automation">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{a.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{a.title}</Reveal>
        <Reveal as="p" className="section-lead">{a.lead}</Reveal>
        <StaggerGroup className="grid grid-3">
          {a.items.map((item) => (
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
