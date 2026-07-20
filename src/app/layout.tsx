import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shravan Deb",
    template: "%s | Shravan Deb",
  },
  description:
    "AI/ML engineer and product builder. Currently creating intelligent systems that make a difference.",
  keywords: [
    "Shravan Deb",
    "AI Engineer",
    "Machine Learning",
    "Portfolio",
    "Developer",
  ],
  authors: [{ name: "Shravan Deb" }],
  robots: { index: true, follow: true },
  metadataBase: new URL("https://shravandeb.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shravandeb.com",
    siteName: "Shravan Deb",
    title: "Shravan Deb",
    description:
      "AI/ML engineer and product builder. Currently creating intelligent systems that make a difference.",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Shravan Deb - AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shravan Deb",
    description:
      "AI/ML engineer and product builder. Currently creating intelligent systems that make a difference.",
    images: ["/opengraph-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground cursor-none">
        <ThemeProvider>
          <MagneticCursor
            magneticFactor={0.55}
            blendMode="exclusion"
            cursorSize={40}
            contrastBoost={1.5}
            disableOnTouch
          >
            {children}
          </MagneticCursor>
        </ThemeProvider>
      </body>
    </html>
  );
}
