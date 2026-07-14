'use client';

import { motion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

const revealVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
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
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

const staggerContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItemVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
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

export function StaggerItem({ children, as = 'div', className, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag variants={staggerItemVariant} className={className} {...rest}>
      {children}
    </MotionTag>
  );
}
