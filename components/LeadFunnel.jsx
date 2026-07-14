'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, EASE } from './Motion';
import recommendPackage from '../lib/recommendPackage';

export default function LeadFunnel({ content }) {
  const f = content.funnel;
  const totalSteps = f.steps.length + 1; // + contact step
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [fields, setFields] = useState({ name: '', company: '', email: '', phone: '', availability: '' });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | error | done
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState(null);

  const isContactStep = step === f.steps.length;

  const isStepValid = () => {
    if (!isContactStep) {
      const group = f.steps[step].group;
      return Boolean(answers[group]);
    }
    return Boolean(
      fields.name.trim() && fields.email.trim() && fields.phone.trim() && fields.availability.trim() && consent
    );
  };

  const selectOption = (group, opt) => {
    setAnswers((prev) => ({ ...prev, [group]: { key: opt.value, label: opt.label } }));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const goNext = async () => {
    if (!isStepValid()) return;

    if (!isContactStep) {
      setStep((s) => s + 1);
      return;
    }

    const scoringAnswers = {
      business: answers.business?.key,
      website: answers.website?.key,
      need: answers.need?.key,
    };
    const pkgKey = recommendPackage(scoringAnswers);
    const pkg = f.packages[pkgKey];

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          company: fields.company.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          availability: fields.availability.trim(),
          business: answers.business?.label || '',
          website: answers.website?.label || '',
          need: answers.need?.label || '',
          recommendedPackage: pkg.name,
          lang: content.lang,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setResult({ name: fields.name.trim(), pkg });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(f.submitError);
    }
  };

  const progressPct = ((step + 1) / totalSteps) * 100;

  return (
    <section className="section section-alt" id="lead-funnel">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{f.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{f.title}</Reveal>
        <Reveal as="p" className="section-lead">{f.lead}</Reveal>

        <Reveal className="funnel" id="funnel">
          {status !== 'done' && (
            <>
              <div className="funnel-progress">
                <motion.span
                  className="funnel-progress-bar"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
              <p className="funnel-step-label">
                {f.stepLabelTemplate.replace('{current}', step + 1).replace('{total}', totalSteps)}
              </p>

              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait" initial={false}>
                  {!isContactStep ? (
                    <motion.div
                      className="funnel-step"
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <h3>{f.steps[step].title}</h3>
                      <div className="funnel-options">
                        {f.steps[step].options.map((opt) => {
                          const selected = answers[f.steps[step].group]?.key === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              className={`funnel-option${selected ? ' is-selected' : ''}`}
                              onClick={() => selectOption(f.steps[step].group, opt)}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="funnel-step"
                      key="step-contact"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <h3>{f.contactStep.title}</h3>
                      <div className="funnel-contact-fields">
                        <div className="form-row">
                          <label htmlFor="funnelName">{f.contactStep.nameLabel}</label>
                          <input
                            id="funnelName" type="text" placeholder={f.contactStep.namePlaceholder}
                            value={fields.name} onChange={(e) => setFields((v) => ({ ...v, name: e.target.value }))}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="funnelCompany">{f.contactStep.companyLabel}</label>
                          <input
                            id="funnelCompany" type="text" placeholder={f.contactStep.companyPlaceholder}
                            value={fields.company} onChange={(e) => setFields((v) => ({ ...v, company: e.target.value }))}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="funnelEmail">{f.contactStep.emailLabel}</label>
                          <input
                            id="funnelEmail" type="email" placeholder={f.contactStep.emailPlaceholder}
                            value={fields.email} onChange={(e) => setFields((v) => ({ ...v, email: e.target.value }))}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="funnelPhone">{f.contactStep.phoneLabel}</label>
                          <input
                            id="funnelPhone" type="tel" placeholder={f.contactStep.phonePlaceholder}
                            value={fields.phone} onChange={(e) => setFields((v) => ({ ...v, phone: e.target.value }))}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="funnelAvailability">{f.contactStep.availabilityLabel}</label>
                          <input
                            id="funnelAvailability" type="text" placeholder={f.contactStep.availabilityPlaceholder}
                            value={fields.availability} onChange={(e) => setFields((v) => ({ ...v, availability: e.target.value }))}
                          />
                        </div>
                        <label className="consent-row">
                          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                          <span>
                            {f.contactStep.consentPrefix}
                            <a href={content.privacyHref} target="_blank" rel="noopener">{f.contactStep.consentLink}</a>
                            {f.contactStep.consentSuffix}
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="funnel-nav">
                <button
                  type="button"
                  className={`btn btn-ghost${step === 0 ? ' is-hidden' : ''}`}
                  onClick={goBack}
                >
                  {f.back}
                </button>
                <motion.button
                  type="button"
                  className="btn btn-primary"
                  disabled={!isStepValid() || status === 'sending'}
                  whileTap={{ scale: 0.96 }}
                  onClick={goNext}
                >
                  {status === 'sending' ? f.sending : isContactStep ? f.submit : f.next}
                </motion.button>
              </div>
              <p className="form-hint">{status === 'error' ? errorMsg : ''}</p>
            </>
          )}

          {status === 'done' && result && (
            <motion.div
              className="funnel-result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="funnel-result-icon">✓</div>
              <h3>{f.result.thanksPrefix}{result.name}{f.result.thanksSuffix}</h3>
              <p>{f.result.received}</p>
              <div className="funnel-recommend">
                <p className="funnel-recommend-label">{f.result.recommendLabel}</p>
                <p className="funnel-recommend-name">{result.pkg.name}</p>
                <p className="funnel-recommend-reason">{result.pkg.reason}</p>
                <a href={f.result.cta.href} className="btn btn-primary">{f.result.cta.label}</a>
              </div>
            </motion.div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
