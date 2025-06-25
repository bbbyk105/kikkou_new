// components/Pricing.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { PRICING_PLANS, PricingPlan } from "@/constants/facilitiesData";

const Pricing: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const renderPricingCard = (plan: PricingPlan) => {
    return (
      <motion.div
        key={plan.id}
        variants={cardVariants}
        className={`relative p-8 rounded-lg border-2 transition-all duration-300 hover:shadow-xl ${
          plan.recommended
            ? "border-blue-500 bg-blue-50 hover:border-blue-600"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        {/* おすすめバッジ */}
        {plan.recommended && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              おすすめ
            </span>
          </div>
        )}

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {plan.name}
          </h3>

          <div className="mb-4">
            <span className="text-4xl font-bold text-gray-900">
              {plan.price}
            </span>
            <span className="text-gray-600 ml-1">/{plan.period}</span>
          </div>

          <p className="text-gray-600 mb-6">{plan.description}</p>

          <ul className="text-left space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <motion.button
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              plan.recommended
                ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
                : "border-2 border-gray-300 text-gray-700 hover:border-gray-400 focus:ring-gray-300"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            プランを選択
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            あなたのワークスタイルに合わせた、
            <br className="hidden sm:block" />
            柔軟な料金プランをご用意
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRICING_PLANS.map(renderPricingCard)}
        </motion.div>

        {/* 追加情報 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            全てのプランで初回見学・1日体験が無料
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              見学予約
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
              お問い合わせ
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
