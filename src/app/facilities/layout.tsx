// src/app/facilities/layout.tsx
import type { Metadata } from "next";

// SEO メタデータ
export const metadata: Metadata = {
  title: "施設紹介 | 次世代コワーキングスペース",
  description:
    "最新設備と快適な環境を兼ね備えた施設で、あらゆるワークスタイルに対応。個人利用から企業研修まで、多様なニーズにお応えする次世代のコワーキングスペースをご紹介します。",
  keywords:
    "コワーキングスペース, 施設, オフィス, 会議室, 料金, アクセス, 設備",
  openGraph: {
    title: "施設紹介 | 次世代コワーキングスペース",
    description:
      "最新設備と快適な環境を兼ね備えた施設で、あらゆるワークスタイルに対応。個人利用から企業研修まで対応可能。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "施設紹介 | 次世代コワーキングスペース",
    description:
      "最新設備と快適な環境を兼ね備えた施設で、あらゆるワークスタイルに対応。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/facilities",
  },
};

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
