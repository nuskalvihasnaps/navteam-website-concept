"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { assetPath } from "../lib/site";

const navigation = [
  { href: "/products", label: "Products & Brands" },
  { href: "/service", label: "Service & Support" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/service") return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0 });

    const restoreFrame = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(restoreFrame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname]);

  return (
    <header className="site-header">
      <Link
        className="header-brand"
        href="/"
        onClick={() => setMenuOpen(false)}
      >
        <span className="header-logo-crop">
          <img
            src={assetPath("navteam-logo.png")}
            alt="NAVTEAM – Professional Marine Electronics"
          />
        </span>
      </Link>

      <button
        className="menu-button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">Toggle navigation</span>
      </button>

      <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""}>
        {navigation.map((item) => (
          <Link
            className={pathname === item.href ? "active" : ""}
            href={item.href}
            key={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          className="nav-contact"
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
