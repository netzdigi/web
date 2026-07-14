const ICONS = {
  globe: <path d="M3 5h18M3 12h18M3 19h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  cart: (
    <>
      <path d="M3 7h18l-1.5 11a2 2 0 01-2 1.7H6.5a2 2 0 01-2-1.7L3 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 7V5a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  refresh: (
    <>
      <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  server: (
    <>
      <path d="M4 19V5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4.97-3.5 8-7.03 8-11a8 8 0 10-16 0c0 3.97 3.03 7.5 8 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.1 10.8l7.8-3.6M8.1 13.2l7.8 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  gear: (
    <>
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.4 13a8.1 8.1 0 000-2l2-1.5-2-3.4-2.4 1a7.9 7.9 0 00-1.7-1L14.9 3h-4l-.4 3.1a7.9 7.9 0 00-1.7 1l-2.4-1-2 3.4L6.4 11a8.1 8.1 0 000 2l-2 1.5 2 3.4 2.4-1a7.9 7.9 0 001.7 1l.4 3.1h4l.4-3.1a7.9 7.9 0 001.7-1l2.4 1 2-3.4-2-1.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 01-.6-7.96A5 5 0 0116.9 8.02 4.5 4.5 0 0118 18H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  database: (
    <>
      <path d="M4 6c0-1.1 3.58-2 8-2s8 .9 8 2-3.58 2-8 2-8-.9-8-2z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 6v12c0 1.1 3.58 2 8 2s8-.9 8-2V6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12c0 1.1 3.58 2 8 2s8-.9 8-2" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 7-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {ICONS[name] || null}
    </svg>
  );
}
