// components/SetupOfficeSection.tsx
import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/navigation";

const COWORKING_BENEFITS = [
  {
    number: "01",
    description: "初期費用や固定費を大幅に削減し",
    title: "スタートアップの\n資金を有効活用したい",
  },
  {
    number: "02",
    description: "柔軟な利用プランで",
    title: "事業成長に合わせて\nスケールしたい",
  },
  {
    number: "03",
    description: "多様な業界のプロフェッショナルと",
    title: "ネットワーキングを\n活発化したい",
  },
];

export default function SetupOffice() {
  return (
    <section
      id="coworking-space"
      className="min-h-screen relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.setupOffice}
          alt="Modern coworking space with collaborative environment - モダンなコワーキングスペース"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-6 py-20">
        <div className="max-w-5xl animate-fade-in-up">
          {/* Title Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center mb-8 space-y-4 lg:space-y-0 lg:space-x-8">
            <span className="text-4xl lg:text-6xl font-bold">Worx mt.fuji</span>
            <span className="text-2xl lg:text-4xl">×</span>
            <span className="text-2xl lg:text-4xl font-bold tracking-wider">
              COWORKING SPACE
            </span>
          </div>

          <p className="text-lg lg:text-xl mb-12 font-light">
            富士市吉原商店街のクリエイティブなコワーキングスペース
          </p>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-16 space-y-4 text-base lg:text-lg leading-relaxed font-light">
            <p>多様な働き方をサポートする柔軟なワークスペースで</p>
            <p>
              個人事業主からスタートアップまで、あらゆる規模のビジネスに対応。
            </p>
            <p>最新設備とプロフェッショナルなデザイン空間で、</p>
            <p>
              生産性とクリエイティビティを最大化する新しい働き方を提案します。
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {COWORKING_BENEFITS.map((benefit, index) => (
              <div
                key={benefit.number}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                <h3 className="text-5xl lg:text-6xl font-light mb-6 text-teal-400">
                  {benefit.number}
                </h3>
                <p className="text-sm mb-4 text-gray-300">
                  {benefit.description}
                </p>
                <h4 className="text-lg lg:text-xl font-medium leading-tight">
                  {benefit.title.split("\n").map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < benefit.title.split("\n").length - 1 && (
                        <br />
                      )}
                    </React.Fragment>
                  ))}
                </h4>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mb-16">
            <h3 className="text-xl lg:text-2xl font-medium mb-8">
              提供サービス
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-medium">高速Wi-Fi・印刷設備完備</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-medium">住所登録可</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-medium">ウォーターサーバー完備</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-medium">バリアフリー</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="flex items-center text-white text-sm mx-auto hover:text-gray-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
            aria-label="コワーキングスペースの詳細を見る"
          >
            <span
              className="w-8 h-px bg-white mr-3 group-hover:w-12 transition-all duration-300"
              aria-hidden="true"
            ></span>
            コワーキングスペースを見る
          </button>
        </div>
      </div>
    </section>
  );
}
