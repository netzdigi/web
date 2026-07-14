import HomePage from '../components/HomePage';
import LanguageRedirect from '../components/LanguageRedirect';
import content from '../content/bg';

export const metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: {
    canonical: content.meta.url,
    languages: {
      bg: 'https://webcraft-bulgaria.vercel.app/',
      de: 'https://webcraft-bulgaria.vercel.app/de',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'WebCraft Bulgaria',
    title: content.meta.title,
    description: content.meta.ogDescription,
    url: content.meta.url,
    locale: content.meta.locale,
    images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.title,
    description: content.meta.twitterDescription,
    images: ['/assets/og-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'WebCraft Bulgaria',
  description: content.meta.jsonLdDescription,
  url: content.meta.url,
  email: 'n.nedkov97@gmail.com',
  areaServed: content.meta.areaServed,
  address: { '@type': 'PostalAddress', addressCountry: 'BG' },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LanguageRedirect />
      <HomePage content={content} />
    </>
  );
}
