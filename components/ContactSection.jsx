'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, EASE } from './Motion';

export default function ContactSection({ content }) {
  const c = content.contact;
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | error | done

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || !consent) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          message: message.trim(),
          lang: content.lang,
          source: 'contact',
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('done');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-inner">
        <Reveal as="p" className="section-eyebrow">{c.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{c.title}</Reveal>
        <Reveal as="p" className="contact-lead">{c.lead}</Reveal>

        <div className="contact-grid">
          <Reveal className="contact-form">
            {status === 'done' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h3>{c.successTitle}</h3>
                <p>{c.successText}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="name">{c.nameLabel}</label>
                  <input id="name" type="text" required placeholder={c.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-row">
                  <label htmlFor="company">{c.companyLabel}</label>
                  <input id="company" type="text" placeholder={c.companyPlaceholder} value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div className="form-row">
                  <label htmlFor="email">{c.emailLabel}</label>
                  <input id="email" type="email" required placeholder={c.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} />
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
                <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
                  {status === 'sending' ? c.sending : c.submit}
                </button>
                <p className="form-hint">{status === 'error' ? c.submitError : ''}</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
