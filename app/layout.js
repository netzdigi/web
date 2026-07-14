import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import MotionProvider from '../components/MotionProvider';

export const metadata = {
  metadataBase: new URL('https://webcraft-bulgaria.vercel.app'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
