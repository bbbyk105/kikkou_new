// src/app/page.tsx（更新版）
"use client";

import dynamic from "next/dynamic";
import { VALUE_SCROLL_SECTIONS } from "@/constants/valueScrollSections";

// 重いコンポーネントを遅延読み込み
const ActionButtons = dynamic(() => import("../components/ActionButtons"), {
  ssr: false,
});

const Hero = dynamic(() => import("@/components/Hero"));
const ScrollImageSwitcher = dynamic(
  () => import("@/components/ScrollImageSwitcher"),
  {
    ssr: false,
  }
);

const FAQ = dynamic(() => import("@/components/FAQ"));

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/* 全ての Value セクション（01〜05）をスクロール連動コンポーネントで表示 */}
      <ScrollImageSwitcher
        sections={VALUE_SCROLL_SECTIONS}
        className="bg-white"
      />

      <FAQ />

      <ActionButtons />
    </div>
  );
}
