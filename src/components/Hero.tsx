// components/Hero.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/constants/navigation";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(2);
  const totalSlides = 5;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 parallax-bg">
        <Image
          src={IMAGES.hero}
          alt="PMO Premium Office Building - 高級オフィスビル"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      <div className="relative z-10 text-center text-white px-6 animate-fade-in-up">
        <p className="text-lg lg:text-xl mb-8 font-light tracking-wide">
          このオフィスと、未来を。
        </p>
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
            Worx mt.fuji
          </h1>
          <p className="text-xl lg:text-2xl tracking-widest font-light">
            橘香堂 近藤薬局
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 text-white">
        <span className="text-sm font-light">
          0{currentSlide} - 0{totalSlides}
        </span>
        <button
          className="text-sm hover:text-gray-300 transition-colors flex items-center space-x-2"
          onClick={prevSlide}
          aria-label="前のスライド"
        >
          <ChevronLeft size={16} />
          <span>Prev</span>
        </button>
        <div className="w-12 h-0.5 bg-white relative">
          <div
            className="h-full bg-teal-400 transition-all duration-500"
            style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
          />
        </div>
        <button
          className="text-sm hover:text-gray-300 transition-colors flex items-center space-x-2"
          onClick={nextSlide}
          aria-label="次のスライド"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
