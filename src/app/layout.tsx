import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { site } from "@/data/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Backend Developer`,
    template: `%s · ${site.name}`,
  },
  description: `${site.name} — backend developer working in Python, Django, MySQL, Redis and AWS. ${site.tagline}.`,
  keywords: [
    site.name,
    "backend developer",
    "Python",
    "Django",
    "REST API",
    "MySQL",
    "Redis",
    "Celery",
    "portfolio",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — Backend Developer`,
    description: site.tagline,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Backend Developer`,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04050f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <head>
        {/* Scroll-reveal elements ship hidden; without JS they must still be readable. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
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
