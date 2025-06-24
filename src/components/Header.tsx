// components/Header.tsx
"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAVIGATION_ITEMS, LANGUAGE_OPTIONS } from "../constants/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center">
        {/* Hamburger Menu Button - Always visible */}
        <button
          className="text-black z-50 p-2 flex-shrink-0 bg-white/90 rounded-full shadow-lg backdrop-blur-sm hover:bg-white transition-all duration-300"
          onClick={toggleMenu}
          aria-label="メニューを開く"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full text-white">
          <nav className="flex flex-col space-y-8 text-center">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                className="text-2xl lg:text-3xl hover:text-gray-300 transition-colors font-light tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-gray-600 pt-8 mt-8">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang.code}
                  className="text-sm hover:text-gray-300 transition-colors mr-6 last:mr-0 font-light tracking-wider uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
