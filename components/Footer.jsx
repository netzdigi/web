export default function Footer({ content }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#top" className="logo">Web<span>Craft</span> <small>Bulgaria</small></a>
        <p>&copy; {year} WebCraft Bulgaria. {content.footer.rights}</p>
        <div className="footer-links">
          <a href={content.privacyHref}>{content.footer.privacy}</a>
          <a href={content.termsHref}>{content.footer.terms}</a>
          <a href="mailto:n.nedkov97@gmail.com">n.nedkov97@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
