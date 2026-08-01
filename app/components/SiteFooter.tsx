import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="brand" href="/">
        <strong>NAVTEAM</strong>
        <span>Professional Marine Electronics</span>
      </Link>
      <div className="footer-links">
        <Link href="/products">Products</Link>
        <Link href="/service">Service & Support</Link>
        <Link href="/about">About</Link>
        <Link href="/careers">Careers</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="footer-meta">
        <span>Svendborg · Gdansk · Tanjung Pelepas</span>
        <span>Concept website · English first</span>
      </div>
    </footer>
  );
}
