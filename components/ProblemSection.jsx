import { Reveal, StaggerGroup, StaggerItem } from './Motion';

export default function ProblemSection({ content }) {
  const p = content.problem;
  return (
    <section className="section section-alt" id="problem">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{p.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{p.title}</Reveal>
        <Reveal as="p" className="section-lead">{p.lead}</Reveal>

        <StaggerGroup className="problem-grid">
          <StaggerItem className="problem-col problem-col-bad">
            <p className="problem-col-label">{p.badLabel}</p>
            <ul className="problem-list problem-list-bad">
              {p.badItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </StaggerItem>
          <StaggerItem className="problem-col problem-col-good">
            <p className="problem-col-label">{p.goodLabel}</p>
            <ul className="problem-list problem-list-good">
              {p.goodItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </StaggerItem>
        </StaggerGroup>

        <Reveal className="problem-cta">
          <a href={p.cta.href} className="btn btn-primary">{p.cta.label}</a>
        </Reveal>
      </div>
    </section>
  );
}
