// components/FacilityRules.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FACILITY_RULES } from "@/constants/facilitiesData";
import { ChevronDownIcon } from "lucide-react";

const FacilityRules: React.FC = () => {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index);
    } else {
      newOpenSections.add(index);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            Facility Rules
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            快適で安全な環境を維持するための
            <br className="hidden sm:block" />
            利用規約とルール
          </p>
        </motion.div>

        <div className="space-y-4">
          {FACILITY_RULES.map((rule, index) => {
            const isOpen = openSections.has(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">
                      {rule.category}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white">
                        <ul className="space-y-3">
                          {rule.rules.map((ruleItem, ruleIndex) => (
                            <li
                              key={ruleIndex}
                              className="flex items-start text-gray-700"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="leading-relaxed">
                                {ruleItem}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* 連絡先情報 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-gray-50 rounded-lg text-center"
        >
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            ご質問・お困りの際は
          </h3>
          <p className="text-gray-600 mb-6">
            施設利用に関するご質問やお困りのことがございましたら、
            <br className="hidden sm:block" />
            お気軽にスタッフまでお声がけください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">受付電話</div>
              <div className="font-medium text-gray-800">03-XXXX-XXXX</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">営業時間</div>
              <div className="font-medium text-gray-800">平日 7:00-22:00</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">緊急連絡先</div>
              <div className="font-medium text-gray-800">24時間対応</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilityRules;
