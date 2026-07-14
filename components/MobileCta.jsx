'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from './Motion';

export default function MobileCta({ content }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hidden while the hero (own CTA + stats row) or the funnel/contact
    // sections are in view — avoids a redundant floating button right next
    // to an identical CTA, and stops it overlapping the hero on short
    // mobile viewports.
    const targets = ['hero', 'lead-funnel', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setHidden(anyVisible);
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="mobile-cta"
          initial={{ y: '120%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '120%', opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <a href={content.mobileCta.href} className="btn btn-primary btn-block">{content.mobileCta.label}</a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
