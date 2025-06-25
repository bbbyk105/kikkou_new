// src/app/facilities/page.tsx
"use client";

import dynamic from "next/dynamic";
import { FACILITY_SECTIONS } from "@/constants/facilitiesData";

// 重いコンポーネントを遅延読み込み
const FacilityScrollSwitcher = dynamic(
  () => import("@/components/FacilityScrollSwitcher"),
  {
    ssr: false,
  }
);
const SetupOffice = dynamic(() => import("@/components/SetUp"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FacilityRules = dynamic(() => import("@/components/FacilityRules"));

export default function FacilitiesPage() {
  return (
    <>
      {/* 構造化データ用のスキーマ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: "次世代コワーキングスペース",
            description:
              "最新設備と快適な環境を兼ね備えた施設で、あらゆるワークスタイルに対応",
            url: "/facilities",
            amenityFeature: [
              {
                "@type": "LocationFeatureSpecification",
                name: "高速Wi-Fi",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "24時間アクセス",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "会議室",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "駐車場",
                value: true,
              },
            ],
            priceRange: "¥1,500-¥80,000",
            telephone: "03-XXXX-XXXX",
            openingHours: "Mo-Fr 07:00-22:00, Sa-Su 09:00-20:00",
          }),
        }}
      />

      <main className="min-h-screen bg-white">
        {/* ヒーローセクション */}
        <SetupOffice />

        {/* 施設詳細セクション（スクロール連動） */}
        <FacilityScrollSwitcher
          sections={FACILITY_SECTIONS}
          className="bg-white"
        />

        {/* 料金プランセクション */}
        <Pricing />

        {/* 利用規約・ルールセクション */}
        <FacilityRules />

        {/* CTA セクション */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-light mb-6">
              Ready to Start?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              まずは施設見学で実際の環境をご体験ください。
              <br className="hidden sm:block" />
              スタッフが丁寧にご案内いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-none font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                施設見学を予約
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-none font-medium hover:bg-white hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                資料請求
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
