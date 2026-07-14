'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerGroup, StaggerItem } from './Motion';
import { EASE } from './Motion';

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <StaggerItem className="faq-item">
      <button
        type="button"
        className="faq-summary"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.q}
        <motion.span
          className="faq-plus"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </StaggerItem>
  );
}

export default function FaqSection({ content }) {
  const f = content.faq;
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal as="p" className="section-eyebrow">{f.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{f.title}</Reveal>
        <StaggerGroup className="faq-list">
          {f.items.map((item) => <FaqItem item={item} key={item.q} />)}
        </StaggerGroup>
      </div>
    </section>
  );
}
