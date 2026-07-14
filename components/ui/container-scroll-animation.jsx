'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// Ported from the 21st.dev/Aceternity "Container Scroll Animation" component
// (original in TypeScript); types stripped and Tailwind classes replaced with
// plain CSS (see .scroll-showcase-* in globals.css) to match this codebase.
export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="scroll-showcase" ref={containerRef}>
      <div className="scroll-showcase-inner">
        <Header translate={prefersReducedMotion ? 0 : translate} titleComponent={titleComponent} />
        <Card rotate={prefersReducedMotion ? 0 : rotate} scale={prefersReducedMotion ? 1 : scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({ translate, titleComponent }) {
  return (
    <motion.div style={{ translateY: translate }} className="scroll-showcase-header">
      {titleComponent}
    </motion.div>
  );
}

function Card({ rotate, scale, children }) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="scroll-showcase-card"
    >
      <div className="scroll-showcase-frame">{children}</div>
    </motion.div>
  );
}
