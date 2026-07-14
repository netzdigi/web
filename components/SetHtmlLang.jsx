'use client';

import { useEffect } from 'react';

export default function SetHtmlLang({ lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
  }, [lang]);

  return null;
}
