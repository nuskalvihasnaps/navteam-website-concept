import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-wordmark" href="/">
        <span className="footer-wordmark-title">
          <strong>NAV</strong>TEAM
        </span>
        <span className="footer-wordmark-subtitle">
          <span>Professional</span>
          <span>Marine</span>
          <span>Electronics</span>
        </span>
      </Link>

      <section className="footer-approved" aria-labelledby="footer-approved-title">
        <h2 id="footer-approved-title">Approved by</h2>
        <ul>
          <li>Lloyd&apos;s Register</li>
          <li>ABS</li>
          <li>ClassNK</li>
          <li>Bureau Veritas</li>
          <li>DNV GL</li>
          <li>RINA</li>
          <li>Danish Maritime Authority</li>
          <li>Maritime &amp; Coastguard Agency</li>
        </ul>
      </section>

      <div className="footer-links">
        <h2>Explore</h2>
        <Link href="/products">Products</Link>
        <Link href="/service">Service & Support</Link>
        <Link href="/about">About</Link>
        <Link href="/job">Job</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="footer-meta">
        <span>Svendborg · Gdansk · Tanjung Pelepas</span>
        <span>Concept website · English first</span>
      </div>
    </footer>
  );
}
