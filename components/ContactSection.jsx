'use client';

import { useState } from 'react';
import { Reveal } from './Motion';

export default function ContactSection({ content }) {
  const c = content.contact;
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [hint, setHint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !consent) return;

    const subject = c.subjectTemplate.replace('{name}', name.trim());
    const bodyLines = [
      `${c.bodyNameLabel}: ${name.trim()}`,
      company.trim() ? `${c.bodyCompanyLabel}: ${company.trim()}` : null,
      '',
      message.trim(),
    ].filter(Boolean);

    const mailto = `mailto:n.nedkov97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    setHint(c.mailOpening);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-inner">
        <Reveal as="p" className="section-eyebrow">{c.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{c.title}</Reveal>
        <Reveal as="p" className="contact-lead">{c.lead}</Reveal>

        <div className="contact-grid">
          <Reveal as="form" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">{c.nameLabel}</label>
              <input id="name" type="text" required placeholder={c.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="company">{c.companyLabel}</label>
              <input id="company" type="text" placeholder={c.companyPlaceholder} value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="message">{c.messageLabel}</label>
              <textarea id="message" rows="5" required placeholder={c.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <label className="consent-row">
              <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>
                {c.consentPrefix}
                <a href={content.privacyHref} target="_blank" rel="noopener">{c.consentLink}</a>
                {c.consentSuffix}
              </span>
            </label>
            <button type="submit" className="btn btn-primary btn-block">{c.submit}</button>
            <p className="form-hint">{hint}</p>
          </Reveal>

          <Reveal className="contact-card" delay={0.1}>
            <h3>{c.directTitle}</h3>
            <p>{c.directText}</p>
            <a className="contact-email" href="mailto:n.nedkov97@gmail.com">n.nedkov97@gmail.com</a>
            <p className="contact-small">{c.smallText}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
