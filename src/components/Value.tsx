// components/Value.tsx
import React from "react";
import Image from "next/image";

interface ValueProps {
  id: string;
  valueNumber: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  darkTheme?: boolean;
  className?: string;
}

export default function Value({
  id,
  valueNumber,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  reversed = false,
  darkTheme = false,
  className = "",
}: ValueProps) {
  const bgColor = darkTheme ? "bg-gray-800" : "bg-gray-50";
  const textColor = darkTheme ? "text-white" : "text-gray-800";
  const subtitleColor = darkTheme ? "text-white" : "text-gray-800";
  const descriptionColor = darkTheme ? "text-gray-300" : "text-gray-600";
  const buttonColor = darkTheme
    ? "text-white hover:text-gray-300"
    : "text-gray-800 hover:text-gray-600";
  const lineColor = darkTheme ? "bg-white" : "bg-gray-800";

  const animationClass = reversed
    ? "animate-fade-in-right"
    : "animate-fade-in-left";

  // タイトルを改行で分割してJSXエレメントとして返す
  const renderTitle = () => {
    const lines = title.split("\\n"); // バックスラッシュnも考慮
    if (lines.length === 1) {
      // \nが見つからない場合は\\nで試す
      const altLines = title.split("\n");
      return altLines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < altLines.length - 1 && <br />}
        </React.Fragment>
      ));
    }

    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div
      id={id}
      className={`min-h-screen flex flex-col lg:flex-row ${className}`}
      aria-labelledby={`${id}-title`}
    >
      {/* Content */}
      <div
        className={`w-full lg:w-1/2 ${bgColor} flex items-center justify-center p-8 lg:p-16 ${
          reversed ? "order-1 lg:order-2" : "order-1 lg:order-1"
        }`}
      >
        <div className={`max-w-md ${animationClass}`}>
          <p className="text-sm text-gray-400 mb-8 font-light" role="text">
            ( Value {valueNumber} )
          </p>
          {/* 確実に改行が効くようにJavaScriptで処理 */}
          <h2
            id={`${id}-title`}
            className={`text-4xl lg:text-5xl font-light mb-8 leading-tight ${textColor}`}
          >
            {renderTitle()}
          </h2>
          <h3
            className={`text-xl lg:text-2xl font-medium mb-8 ${subtitleColor}`}
          >
            {subtitle}
          </h3>
          <p className={`mb-8 leading-relaxed ${descriptionColor}`}>
            {description}
          </p>
          <button
            className={`flex items-center text-sm transition-colors group ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            aria-label={`View more about ${subtitle}`}
          >
            <span
              className={`w-8 h-px mr-3 group-hover:w-12 transition-all duration-300 ${lineColor}`}
              aria-hidden="true"
            ></span>
            View more
          </button>
        </div>
      </div>

      {/* Image */}
      <div
        className={`w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full ${
          reversed ? "order-2 lg:order-1" : "order-2 lg:order-2"
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={valueNumber === "01"}
        />
      </div>
    </div>
  );
}
