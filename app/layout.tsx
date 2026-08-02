import type { Metadata } from "next";
import { ContactModalProvider } from "./components/ContactModal";
import { RouteScrollReset } from "./components/RouteScrollReset";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const siteUrl =
  "https://nuskalvihasnaps.github.io/navteam-website-concept/";
const title = "NAVTEAM | Professional Marine Electronics";
const description =
  "NAVTEAM supplies, integrates and supports professional marine electronics worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}og-navteam-2026.png`,
        width: 1200,
        height: 630,
        alt: "NAVTEAM professional marine electronics and worldwide support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}og-navteam-2026.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ContactModalProvider>
          <RouteScrollReset />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ContactModalProvider>
      </body>
    </html>
  );
}
