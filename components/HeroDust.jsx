'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// three.js is heavy, so the shader bundle loads lazily on the client only.
const MagicDust = dynamic(
  () => import('./ui/magic-dust-shader').then((m) => m.MagicDust),
  { ssr: false }
);

// Particle backdrop for the hero. Skipped entirely for visitors who
// prefer reduced motion; fewer particles on small screens.
export default function HeroDust({ sequence }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const small = window.matchMedia('(max-width: 768px)').matches;
    setConfig({ particleCount: small ? 3500 : 7000 });
  }, []);

  if (!config) return null;

  return (
    <div className="hero-dust" aria-hidden="true">
      <MagicDust
        sequence={sequence}
        particleCount={config.particleCount}
        particleColor="#a78bfa"
        holdDuration={2.5}
        scatterRadius={14}
      />
    </div>
  );
}
