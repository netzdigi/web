/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/admin.html', destination: '/admin', permanent: true },
      { source: '/de/index.html', destination: '/de/', permanent: true },
      { source: '/de/privacy.html', destination: '/de/privacy', permanent: true },
      { source: '/de/terms.html', destination: '/de/terms', permanent: true },
    ];
  },
};

module.exports = nextConfig;
