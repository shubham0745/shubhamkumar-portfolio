import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { certifications, education, site, skills } from "@/data/site";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const SEO_TITLE = `${site.name} | Software Engineer & AI Trainer`;
const SEO_DESCRIPTION =
  `Explore ${site.name}'s portfolio featuring backend engineering, AI training and evaluation, ` +
  `software projects, technical problem-solving and research.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: SEO_TITLE,
    template: `%s · ${site.name}`,
  },
  description: SEO_DESCRIPTION,
  applicationName: `${site.name} Portfolio`,
  keywords: [
    site.name,
    "software engineer",
    "backend developer",
    "AI trainer",
    "AI evaluator",
    "Python",
    "Django",
    "REST API",
    "PostgreSQL",
    "Redis",
    "portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    siteName: `${site.name} — Portfolio`,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#04050f",
  colorScheme: "dark",
};

/**
 * Person + WebSite structured data.
 *
 * Built from the same `site.ts` values the pages render, so it cannot drift out
 * of sync with what a visitor actually sees. Serialised with JSON.stringify from
 * our own static data — there is no user input anywhere in this object.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: ["Software Engineer", "AI Trainer & Evaluator"],
      description: site.subtitle,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ranchi",
        addressRegion: "Jharkhand",
        addressCountry: "IN",
      },
      alumniOf: education.map((e) => ({
        "@type": "EducationalOrganization",
        name: e.school,
      })),
      hasCredential: certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c,
      })),
      knowsAbout: skills.flatMap((group) => group.items),
      sameAs: [
        site.socials.github,
        site.socials.linkedin,
        site.socials.twitter,
        site.socials.instagram,
      ].filter((url) => url.trim() !== ""),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — Portfolio`,
      description: SEO_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <head>
        {/* Scroll-reveal elements ship hidden; without JS they must still be readable. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <MotionProvider>
          <AmbientBackground />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
