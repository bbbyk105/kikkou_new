// components/FacilityScrollSwitcher.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FacilitySection } from "@/constants/facilitiesData";

interface FacilityScrollSwitcherProps {
  sections: FacilitySection[];
  className?: string;
}

const FacilityScrollSwitcher: React.FC<FacilityScrollSwitcherProps> = ({
  sections,
  className = "",
}) => {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );
  const [progress, setProgress] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // セクション要素のref設定
  const setSectionRef = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        sectionRefs.current.set(id, element);
        if (observerRef.current) {
          observerRef.current.observe(element);
        }
      } else {
        const oldElement = sectionRefs.current.get(id);
        if (oldElement && observerRef.current) {
          observerRef.current.unobserve(oldElement);
        }
        sectionRefs.current.delete(id);
      }
    },
    []
  );

  // 画像アニメーション設定
  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
      filter: "brightness(0.8)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "brightness(1)",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "brightness(0.6)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  } as const;

  // Intersection Observer の設定
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let mostVisibleSectionId = "";

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio > maxIntersectionRatio) {
              maxIntersectionRatio = entry.intersectionRatio;
              const sectionId = entry.target.getAttribute("data-section-id");
              if (sectionId) {
                mostVisibleSectionId = sectionId;
              }
            }
          }
        });

        if (maxIntersectionRatio >= 0.2 && mostVisibleSectionId) {
          setActiveSection(mostVisibleSectionId);

          // 進捗計算
          const currentIndex = sections.findIndex(
            (s) => s.id === mostVisibleSectionId
          );
          const progressValue = ((currentIndex + 1) / sections.length) * 100;
          setProgress(progressValue);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0px 0px -20% 0px",
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections]);

  // アクティブな画像データを取得
  const activeImage = sections.find((section) => section.id === activeSection);
  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  // セクションコンテンツをレンダリング
  const renderSectionContent = (section: FacilitySection) => {
    const isDark = section.darkTheme;
    const textColorClass = isDark ? "text-white" : "text-gray-800";
    const subTextColorClass = isDark ? "text-gray-300" : "text-gray-600";
    const bgColorClass = isDark ? "bg-gray-900" : "bg-white";
    const accentColor = isDark ? "text-blue-400" : "text-blue-600";

    return (
      <div className={`max-w-xl ${bgColorClass}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* カテゴリ */}
          <div
            className={`text-sm ${accentColor} font-medium mb-4 tracking-wide uppercase`}
          >
            {section.category}
          </div>

          {/* タイトル */}
          <h2
            className={`text-4xl lg:text-6xl font-light mb-6 leading-tight ${textColorClass}`}
          >
            {section.title.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < section.title.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          {/* サブタイトル */}
          <h3
            className={`text-xl lg:text-2xl font-medium mb-6 ${textColorClass}`}
          >
            {section.subtitle}
          </h3>

          {/* 説明 */}
          <p className={`${subTextColorClass} leading-relaxed mb-8 text-lg`}>
            {section.description}
          </p>

          {/* 特徴リスト */}
          <div className="mb-8">
            <h4 className={`text-lg font-medium mb-4 ${textColorClass}`}>
              主な特徴
            </h4>
            <ul className="space-y-2">
              {section.features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center ${subTextColorClass}`}
                >
                  <div
                    className={`w-2 h-2 ${
                      isDark ? "bg-blue-400" : "bg-blue-600"
                    } rounded-full mr-3 flex-shrink-0`}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 詳細情報 */}
          {(section.capacity || section.price) && (
            <div className="flex flex-wrap gap-6 mb-8">
              {section.capacity && (
                <div>
                  <div className={`text-sm ${subTextColorClass} mb-1`}>
                    収容人数
                  </div>
                  <div className={`font-medium ${textColorClass}`}>
                    {section.capacity}
                  </div>
                </div>
              )}
              {section.price && (
                <div>
                  <div className={`text-sm ${subTextColorClass} mb-1`}>
                    料金
                  </div>
                  <div className={`font-medium ${textColorClass}`}>
                    {section.price}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* アクションボタン */}
          <button
            className={`flex items-center group ${textColorClass} hover:opacity-70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <span
              className={`w-8 h-px ${
                isDark ? "bg-white" : "bg-gray-800"
              } mr-4 group-hover:w-16 transition-all duration-300`}
              aria-hidden="true"
            />
            <span className="font-medium">詳細を見る</span>
          </button>
        </motion.div>
      </div>
    );
  };

  return (
    <section className={`relative ${className}`}>
      {/* デスクトップレイアウト */}
      <div className="hidden lg:block">
        <div className="lg:flex min-h-screen">
          {/* 左側：画像エリア（sticky固定） */}
          <div className="w-full lg:w-3/5 relative">
            <div className="lg:sticky lg:top-0 h-screen">
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeImage && (
                    <motion.div
                      key={activeSection}
                      variants={imageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeImage.imageSrc}
                        alt={activeImage.imageAlt}
                        fill
                        className="object-cover"
                        sizes="60vw"
                        priority={activeSection === sections[0]?.id}
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 進捗インジケーター */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="flex flex-col items-center space-y-4">
                    {sections.map((section, index) => (
                      <button
                        key={section.id}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-white scale-125 shadow-lg"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                        onClick={() => {
                          const element = sectionRefs.current.get(section.id);
                          element?.scrollIntoView({ behavior: "smooth" });
                        }}
                        aria-label={`${section.category}セクションへ移動`}
                      />
                    ))}
                  </div>
                </div>

                {/* セクション情報オーバーレイ */}
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <div className="text-sm opacity-80 mb-2">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(sections.length).padStart(2, "0")}
                  </div>
                  <div className="text-xl font-medium">
                    {activeImage?.category}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：テキストセクション（スクロール可能） */}
          <div className="w-full lg:w-2/5">
            {sections.map((section) => {
              const isDark = section.darkTheme;
              const bgColorClass = isDark ? "bg-gray-900" : "bg-white";

              return (
                <div
                  key={section.id}
                  ref={(el) => setSectionRef(section.id, el)}
                  data-section-id={section.id}
                  className={`min-h-screen flex items-center justify-center p-8 lg:p-16 ${bgColorClass}`}
                >
                  {renderSectionContent(section)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* モバイルレイアウト */}
      <div className="lg:hidden">
        {sections.map((section, index) => {
          const isDark = section.darkTheme;
          const bgColorClass = isDark ? "bg-gray-900" : "bg-white";
          const textColorClass = isDark ? "text-white" : "text-gray-800";
          const subTextColorClass = isDark ? "text-gray-300" : "text-gray-600";
          const accentColor = isDark ? "text-blue-400" : "text-blue-600";

          return (
            <div
              key={section.id}
              ref={(el) => setSectionRef(section.id, el)}
              data-section-id={section.id}
              className={`min-h-screen ${bgColorClass}`}
            >
              {/* モバイル画像 */}
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <Image
                  src={section.imageSrc}
                  alt={section.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* モバイル用セクション情報 */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-xs opacity-80 mb-1">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(sections.length).padStart(2, "0")}
                  </div>
                  <div className="text-lg font-medium">{section.category}</div>
                </div>
              </div>

              {/* モバイルテキスト */}
              <div className="flex items-center justify-center p-6 sm:p-8 min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-24rem)]">
                <div className="max-w-md w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div
                      className={`text-sm ${accentColor} font-medium mb-4 tracking-wide uppercase text-center`}
                    >
                      {section.category}
                    </div>

                    <h2
                      className={`text-3xl sm:text-4xl font-light mb-4 leading-tight ${textColorClass} text-center`}
                    >
                      {section.title.split("\n").map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          {lineIndex < section.title.split("\n").length - 1 && (
                            <br />
                          )}
                        </React.Fragment>
                      ))}
                    </h2>

                    <h3
                      className={`text-lg sm:text-xl font-medium mb-4 ${textColorClass} text-center`}
                    >
                      {section.subtitle}
                    </h3>

                    <p
                      className={`${subTextColorClass} leading-relaxed mb-6 text-center`}
                    >
                      {section.description}
                    </p>

                    {/* モバイル用特徴リスト */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {section.features
                          .slice(0, 3)
                          .map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className={`flex items-center ${subTextColorClass} text-sm`}
                            >
                              <div
                                className={`w-1.5 h-1.5 ${
                                  isDark ? "bg-blue-400" : "bg-blue-600"
                                } rounded-full mr-3 flex-shrink-0`}
                              />
                              {feature}
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* モバイル用詳細情報 */}
                    {(section.capacity || section.price) && (
                      <div className="flex justify-center gap-6 mb-6">
                        {section.capacity && (
                          <div className="text-center">
                            <div
                              className={`text-xs ${subTextColorClass} mb-1`}
                            >
                              収容人数
                            </div>
                            <div
                              className={`font-medium ${textColorClass} text-sm`}
                            >
                              {section.capacity}
                            </div>
                          </div>
                        )}
                        {section.price && (
                          <div className="text-center">
                            <div
                              className={`text-xs ${subTextColorClass} mb-1`}
                            >
                              料金
                            </div>
                            <div
                              className={`font-medium ${textColorClass} text-sm`}
                            >
                              {section.price}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <button
                        className={`flex items-center group text-sm ${textColorClass} hover:opacity-70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        <span
                          className={`w-6 h-px ${
                            isDark ? "bg-white" : "bg-gray-800"
                          } mr-3 group-hover:w-10 transition-all duration-300`}
                          aria-hidden="true"
                        />
                        詳細を見る
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FacilityScrollSwitcher;
