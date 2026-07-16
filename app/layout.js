import { Unbounded, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import MotionProvider from '../components/MotionProvider';

// Cyrillic support matters here — Bulgarian is the primary locale, not an
// afterthought — so each face is picked from fonts that ship a real
// cyrillic subset rather than falling back silently for most visitors.
const displayFont = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-display',
});
const bodyFont = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});
const monoFont = IBM_Plex_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata = {
  metadataBase: new URL('https://webcraft-bulgaria.vercel.app'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
