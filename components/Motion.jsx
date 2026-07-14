'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

const LIFT_SPRING = { type: 'spring', stiffness: 300, damping: 22 };

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Single element reveal-on-scroll, mirrors the site's old CSS .reveal class.
export function Reveal({ children, delay = 0, as = 'div', className, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      variants={revealVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

const staggerContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const staggerItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Grid/list container whose children cascade in one after another.
export function StaggerGroup({ children, className, as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      variants={staggerContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// `lift` replaces the CSS :hover translate — framer keeps an inline
// transform on animated elements, so CSS hover transforms never fire.
export function StaggerItem({ children, as = 'div', className, lift = false, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      variants={staggerItemVariant}
      whileHover={lift ? { y: -6 } : undefined}
      transition={lift ? LIFT_SPRING : undefined}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// Card that tilts in 3D toward the cursor, used for portfolio entries.
// Participates in a parent StaggerGroup via the shared item variants.
export function TiltCard({ children, className, maxTilt = 4, as = 'a', ...rest }) {
  const MotionTag = motion[as] || motion.a;
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  function handlePointerMove(event) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt);
    rotateX.set(-py * maxTilt);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <MotionTag
      ref={ref}
      variants={staggerItemVariant}
      whileHover={{ y: -6 }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
