import { Reveal, StaggerGroup, StaggerItem } from './Motion';

export default function ProcessSection({ content }) {
  const p = content.process;
  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{p.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{p.title}</Reveal>
        <StaggerGroup className="steps">
          {p.steps.map((step) => (
            <StaggerItem className="step" key={step.num}>
              <span className="step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
