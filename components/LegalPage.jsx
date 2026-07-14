import { Reveal } from './Motion';

export default function LegalPage({ data }) {
  return (
    <div className="legal-wrap">
      <a href={data.backHref} className="legal-back">{data.backLabel}</a>
      <h1 className="section-title">{data.title}</h1>
      <p className="legal-updated">{data.updated}</p>

      <Reveal className="legal-card">
        {data.sections.map((section) => (
          <div key={section.h}>
            <h2>{section.h}</h2>
            {section.p.map((para) => <p key={para}>{para}</p>)}
            {section.list && (
              <ul>
                {section.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}
      </Reveal>
    </div>
  );
}
