'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Header({ content }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsScrolled(y > 8);
  });

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      className={`site-header${isScrolled ? ' is-scrolled' : ''}`}
      id="header"
    >
      <div className="container header-inner">
        <a href="#top" className="logo">
          Web<span>Craft</span> <small>Bulgaria</small>
        </a>
        <nav className={`nav${isOpen ? ' is-open' : ''}`} id="nav">
          {content.nav.items.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a href={content.nav.cta.href} className="nav-cta" onClick={closeMenu}>
            {content.nav.cta.label}
          </a>
          <a href={content.nav.switch.href} className="lang-switch" hrefLang={content.nav.switch.hreflang}>
            {content.nav.switch.label}
          </a>
        </nav>
        <button
          className="nav-toggle"
          aria-label={content.nav.ariaOpenMenu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </motion.header>
  );
}
