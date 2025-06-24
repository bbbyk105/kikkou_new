"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import { IMAGES } from "@/constants/navigation";

// 重いコンポーネントを遅延読み込み

const ActionButtons = dynamic(() => import("../components/ActionButtons"), {
  ssr: false,
});

const Hero = dynamic(() => import("@/components/Hero"));
const Value = dynamic(() => import("@/components/Value"));
const SetupOffice = dynamic(() => import("@/components/SetUp"));

// Valueコンポーネントをメモ化
const MemoizedValue = memo(Value);

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <MemoizedValue
        id="corporate-image"
        valueNumber="01"
        title="Community\nFirst"
        subtitle="誰でも利用できるスペース"
        description="年齢・職業を問わず誰でも集まり、学び・交流できる地域ハブをつくる。高齢者の憩い、起業家・趣味サークルの場として活用。"
        imageSrc={IMAGES.corporateImage}
        imageAlt="Modern office building entrance with professional atmosphere - プロフェッショナルな雰囲気のモダンオフィスビル入口"
      />

      <SetupOffice />

      <MemoizedValue
        id="facility"
        valueNumber="02"
        title="Facility\nEnvironment"
        subtitle="設備と環境"
        description="多様なワークスペースと高品質な設備が整った環境で、快適に業務を進められます。高速インターネット、プリンター、専用デスクなど、ニーズに応じたオプションが豊富に揃っています。"
        imageSrc={IMAGES.security}
        imageAlt="Secure office building entrance with modern security systems - モダンなセキュリティシステムを備えた安全なオフィスビル入口"
      />

      <MemoizedValue
        id="motivation"
        valueNumber="03"
        title="Motivation\nEnhancement"
        subtitle="モチベーション向上"
        description="集中できる作業環境が整っているだけでなく、同じような目標を持つ人たちが集まっていることで、互いにモチベーションを高め合うことができ、生産性が向上します。"
        imageSrc={IMAGES.motivation}
        imageAlt="Business professional in modern office environment - モダンなオフィス環境のビジネスプロフェッショナル"
        className="bg-gray-100"
      />

      <MemoizedValue
        id="recruitment"
        valueNumber="04"
        title="Versatility"
        subtitle="多用途性"
        description="多様な活動をサポートする環境が整っています。ヨガやリラックスできる休憩時間、イベントなど、自由に使えるスペースが提供され、心身ともにリフレッシュできます。"
        imageSrc={IMAGES.recruitment}
        imageAlt="Modern office workspace with collaborative environment - コラボレーション環境を備えたモダンなオフィスワークスペース"
        reversed={true}
        darkTheme={true}
      />

      <MemoizedValue
        id="final-corporate"
        valueNumber="05"
        title="Flexibility"
        subtitle="柔軟性"
        description="利用者は自分のペースで働けるだけでなく、スペースを必要に応じて予約したり、時間単位で利用したりできるため、自由度が高く、コストを効率的に管理できます。"
        imageSrc={IMAGES.finalCorporate}
        imageAlt="Professional office environment showcasing corporate excellence - 企業の優秀性を示すプロフェッショナルなオフィス環境"
      />

      <ActionButtons />
    </div>
  );
}
