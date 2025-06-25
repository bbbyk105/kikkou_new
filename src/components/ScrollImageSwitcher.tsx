// components/ScrollImageSwitcher.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  darkTheme?: boolean;
  valueNumber?: string;
}

interface ScrollImageSwitcherProps {
  sections: SectionData[];
  className?: string;
}

const ScrollImageSwitcher: React.FC<ScrollImageSwitcherProps> = ({
  sections,
  className = "",
}) => {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // セクション要素のref設定
  const setSectionRef = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        sectionRefs.current.set(id, element);
        // 即座に観察開始
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

  // GPU加速用のバリアント設定
  const imageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 1.05,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
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

        if (maxIntersectionRatio >= 0.3 && mostVisibleSectionId) {
          setActiveSection(mostVisibleSectionId);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0px 0px -10% 0px",
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // セクションの観察を開始/更新
  useEffect(() => {
    if (observerRef.current) {
      sectionRefs.current.forEach((element) => {
        observerRef.current?.unobserve(element);
      });

      sectionRefs.current.forEach((element) => {
        observerRef.current?.observe(element);
      });
    }
  }, [sections]);

  // アクティブな画像データを取得
  const activeImage = sections.find((section) => section.id === activeSection);

  // タイトルを改行で分割してJSXエレメントとして返す
  const renderTitle = (title: string) => {
    const lines = title.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // セクションコンテンツをレンダリング
  const renderSectionContent = (section: SectionData) => {
    const isDark = section.darkTheme;
    const textColorClass = isDark ? "text-white" : "text-gray-800";
    const subTextColorClass = isDark ? "text-gray-300" : "text-gray-600";
    const bgColorClass = isDark ? "bg-gray-900" : "bg-white";

    return (
      <div className={`max-w-md ${bgColorClass}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2
            id={`section-${section.id}-title`}
            className={`text-4xl lg:text-5xl font-light mb-8 leading-tight ${textColorClass}`}
          >
            {renderTitle(section.title)}
          </h2>

          <h3
            className={`text-xl lg:text-2xl font-medium mb-8 ${textColorClass}`}
          >
            {section.subtitle}
          </h3>

          <p className={`${subTextColorClass} leading-relaxed mb-8`}>
            {section.description}
          </p>

          <button
            className={`flex items-center text-sm ${textColorClass} hover:opacity-70 transition-opacity group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            aria-label={`${section.subtitle}の詳細を見る`}
          >
            <span
              className={`w-8 h-px ${
                isDark ? "bg-white" : "bg-gray-800"
              } mr-3 group-hover:w-12 transition-all duration-300`}
              aria-hidden="true"
            />
            View more
          </button>
        </motion.div>
      </div>
    );
  };

  return (
    <section
      className={`relative ${className}`}
      aria-label="スクロール連動コンテンツセクション"
    >
      {/* デスクトップレイアウト */}
      <div className="hidden lg:block min-h-screen">
        <div className="lg:flex">
          {/* 左側：テキストセクション（スクロール可能） */}
          <div className="w-full lg:w-1/2">
            {sections.map((section) => {
              const isDark = section.darkTheme;
              const bgColorClass = isDark ? "bg-gray-900" : "bg-white";

              return (
                <div
                  key={section.id}
                  ref={(el) => setSectionRef(section.id, el)}
                  data-section-id={section.id}
                  className={`min-h-screen flex items-center justify-center p-8 lg:p-16 ${bgColorClass}`}
                  aria-labelledby={`section-${section.id}-title`}
                >
                  {renderSectionContent(section)}
                </div>
              );
            })}
          </div>

          {/* 右側：画像エリア（sticky固定・アニメーション） */}
          <div className="w-full lg:w-1/2 relative">
            <div className="lg:sticky lg:top-0 h-screen">
              <div className="relative w-full h-full overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                  {activeImage && (
                    <motion.div
                      key={activeSection}
                      variants={imageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0"
                      style={{
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                        perspective: 1000,
                      }}
                    >
                      <Image
                        src={activeImage.imageSrc}
                        alt={activeImage.imageAlt}
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority={activeSection === sections[0]?.id}
                        quality={85}
                      />

                      {/* オーバーレイ */}
                      <div className="absolute inset-0 bg-black/10" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* フォールバック用のローディング状態 */}
                {!activeImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-gray-400">画像を読み込み中...</div>
                  </div>
                )}
              </div>
            </div>
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
          const numberColorClass = isDark ? "text-gray-400" : "text-gray-400";

          return (
            <div
              key={section.id}
              ref={(el) => setSectionRef(section.id, el)}
              data-section-id={section.id}
              className={`min-h-screen ${bgColorClass}`}
              aria-labelledby={`mobile-section-${section.id}-title`}
            >
              {/* モバイル画像 */}
              <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-100">
                <motion.div
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0"
                  style={{
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                    perspective: 1000,
                  }}
                >
                  <Image
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              </div>

              {/* モバイルテキスト */}
              <div className="flex items-center justify-center p-6 sm:p-8 min-h-[calc(100vh-16rem)] sm:min-h-[calc(100vh-20rem)]">
                <div className="max-w-md w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <p
                      className={`text-sm ${numberColorClass} mb-6 font-light text-center`}
                      role="text"
                    >
                      ( Value{" "}
                      {section.valueNumber ||
                        String(index + 1).padStart(2, "0")}{" "}
                      )
                    </p>

                    <h2
                      id={`mobile-section-${section.id}-title`}
                      className={`text-3xl sm:text-4xl font-light mb-6 leading-tight ${textColorClass} text-center`}
                    >
                      {renderTitle(section.title)}
                    </h2>

                    <h3
                      className={`text-lg sm:text-xl font-medium mb-6 ${textColorClass} text-center`}
                    >
                      {section.subtitle}
                    </h3>

                    <p
                      className={`${subTextColorClass} leading-relaxed mb-8 text-center`}
                    >
                      {section.description}
                    </p>

                    <div className="flex justify-center">
                      <button
                        className={`flex items-center text-sm ${textColorClass} hover:opacity-70 transition-opacity group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        aria-label={`${section.subtitle}の詳細を見る`}
                      >
                        <span
                          className={`w-8 h-px ${
                            isDark ? "bg-white" : "bg-gray-800"
                          } mr-3 group-hover:w-12 transition-all duration-300`}
                          aria-hidden="true"
                        />
                        View more
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}

        {/* モバイル用のインジケーター */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gray-800 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`セクション${index + 1}へ移動`}
                onClick={() => {
                  const element = sectionRefs.current.get(section.id);
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollImageSwitcher;
