// app/news/page.tsx
import type { Metadata } from "next";
import InstagramNews from "@/components/InstagramNews";

export const metadata: Metadata = {
  title: "Instagram ニュース | 最新投稿",
  description:
    "Instagramの最新投稿をチェックして、最新の情報やトレンドをキャッチアップしましょう。",
  keywords: ["Instagram", "ニュース", "最新投稿", "SNS", "ソーシャルメディア"],
  openGraph: {
    title: "Instagram ニュース | 最新投稿",
    description:
      "Instagramの最新投稿をチェックして、最新の情報やトレンドをキャッチアップしましょう。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram ニュース | 最新投稿",
    description:
      "Instagramの最新投稿をチェックして、最新の情報やトレンドをキャッチアップしましょう。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <InstagramNews />
    </div>
  );
}
