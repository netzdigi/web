'use client';

import { useEffect } from 'react';

// German-speaking countries we route to the /de version by default.
const GERMAN_SPEAKING = ['DE', 'AT', 'CH', 'LI'];

// Runs once on the Bulgarian homepage: if the visitor has no language
// preference yet, ask the server for their country and send German-speaking
// visitors to /de. Any failure just leaves them on the Bulgarian page.
export default function LanguageRedirect() {
  useEffect(() => {
    if (/(?:^|;\s*)lang=(bg|de)/.test(document.cookie)) return;

    let cancelled = false;
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : { country: '' }))
      .then(({ country }) => {
        if (cancelled) return;
        const lang = GERMAN_SPEAKING.includes(country) ? 'de' : 'bg';
        document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
        if (lang === 'de') window.location.replace('/de');
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
