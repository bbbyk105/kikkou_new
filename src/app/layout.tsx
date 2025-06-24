// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "橘香堂(worx mt.fuji) | 富士市のプレミアムオフィス",
  description:
    "橘香堂(worx mt.fuji) は富士市の吉原商店街にあるレンタルオフィスです。起業家やフリーランスの出会いのきっかけに。",
  keywords:
    "橘香堂, worx mt.fuji, worx fuji, 富士市　コワーキング, きっこうどう, 橘香堂　富士市",
  authors: [{ name: "Kikkoudo" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "橘香堂(worx mt.fuji)",
    description: "このオフィスと、未来を。富士市のレンタルオフィス",
    type: "website",
    locale: "ja_JP",
    siteName: "橘香堂(worx mt.fuji)",
  },
  twitter: {
    card: "summary_large_image",
    title: "橘香堂(worx mt.fuji)",
    description: "このオフィスと、未来を。富士市のレンタルオフィス",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        {/* プリロード重要リソース */}
        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          as="image"
        />
        {/* DNS プリフェッチ */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        {/* フォント最適化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
