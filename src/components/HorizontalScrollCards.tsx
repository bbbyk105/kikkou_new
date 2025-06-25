// components/HorizontalScrollCards.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Laptop, Users, Palette, ShoppingBag, Heart } from "lucide-react";

interface CardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
}

interface HorizontalScrollCardsProps {
  className?: string;
}

const CARD_DATA: CardData[] = [
  {
    id: "freelancer",
    icon: <Laptop className="w-8 h-8" />,
    title: "フリーランサー・個人事業主",
    description: "自由な働き方を求める方に最適な環境",
    examples: ["集中作業", "クライアント打ち合わせ", "ネットワーキング"],
  },
  {
    id: "creator",
    icon: <Palette className="w-8 h-8" />,
    title: "クリエイター・デザイナー",
    description: "創造性を発揮できるインスピレーション豊かな空間",
    examples: ["作品制作", "クライアント提案", "ポートフォリオ作成"],
  },
  {
    id: "community",
    icon: <Users className="w-8 h-8" />,
    title: "スポーツ観戦・パーティー",
    description: "地域の絆を深める活動の拠点として",
    examples: ["コミュニティー", "地域イベント企画"],
  },
  {
    id: "market",
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "マルシェ・手作り作家",
    description: "手作り商品の販売や展示スペースとして",
    examples: ["作品展示", "ワークショップ", "販売イベント"],
  },
  {
    id: "wellness",
    icon: <Heart className="w-8 h-8" />,
    title: "ヨガ・ウェルネス講師",
    description: "心身の健康をサポートする活動に最適",
    examples: ["ヨガクラス", "瞑想会", "健康セミナー"],
  },
];

const HorizontalScrollCards: React.FC<HorizontalScrollCardsProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // モバイル判定
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // PC用のスクロール連動
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-70%"]);

  // モバイル用レンダリング
  const renderMobileVersion = () => (
    <div className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            こんな人におすすめ
          </motion.h2>
          <motion.p
            className="text-base text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            多様な働き方や活動をサポートする、
            <br />
            柔軟で快適な環境を提供します
          </motion.p>
        </div>

        {/* 横スクロールコンテナ */}
        <div className="relative">
          <div
            ref={mobileScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {CARD_DATA.map((card, index) => (
              <motion.div
                key={card.id}
                className="flex-shrink-0 w-72 bg-white rounded-2xl p-6 shadow-lg snap-start"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                {/* アイコン */}
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4 text-blue-600">
                  {card.icon}
                </div>

                {/* タイトル */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {card.title}
                </h3>

                {/* 説明 */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* 利用例 */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-800 mb-2">
                    利用例：
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {card.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* スクロールヒント */}
          <div className="text-center mt-6">
            <motion.p
              className="text-xs text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              横にスワイプしてカードをご覧ください
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );

  // PC用レンダリング
  const renderDesktopVersion = () => (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          {/* セクションヘッダー */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-light text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              こんな人におすすめ
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              多様な働き方や活動をサポートする、柔軟で快適な環境を提供します
            </motion.p>
          </div>

          {/* スクロール連動カードコンテナ */}
          <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex gap-6 lg:gap-8 absolute inset-0 items-center"
            >
              {CARD_DATA.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="flex-shrink-0 w-80 lg:w-96 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* アイコン */}
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl mb-6 text-blue-600">
                    {card.icon}
                  </div>

                  {/* タイトル */}
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                    {card.title}
                  </h3>

                  {/* 説明 */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  {/* 利用例 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">
                      利用例：
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {card.examples.map((example, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* スクロールヒント */}
          <div className="text-center mt-12">
            <motion.p
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              スクロールしてカードをご覧ください
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? renderMobileVersion() : renderDesktopVersion();
};

export default HorizontalScrollCards;
