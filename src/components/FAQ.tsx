// components/FAQSection.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ_DATA = [
  {
    id: 1,
    question: "利用料金はどのくらいですか？",
    answer:
      "ドロップイン利用は1日2,000円から、月額会員は15,000円〜となっております。学生割引や長期利用割引もご用意しています。詳しくは料金表をご確認ください。",
  },
  {
    id: 2,
    question: "見学はできますか？",
    answer: "はい、無料見学は随時受け付けております。",
  },
  {
    id: 3,
    question: "どんな人でも利用できますか？",
    answer:
      "はい、個人事業主から法人まで、どなたでもご利用いただけます。お仕事はもちろん、地域のマルシェやイベント企画、サッカー観戦オフィスとしてのご利用など、多様な用途でお使いいただいています。コミュニティスペースとしても活用でき、新しい働き方や地域交流の拠点としてご利用ください。",
  },
  {
    id: 4,
    question: "会議室の利用はできますか？",
    answer:
      "はい、6名用の会議室をご用意しています。プロジェクターやホワイトボードも完備しております。",
  },
  {
    id: 5,
    question: "駐車場はありますか？",
    answer:
      "一次駐車場がございます。満車の場合は近隣のコインパーキングをご案内いたします。",
  },
  {
    id: 6,
    question: "法人登記や住所利用はできますか？",
    answer:
      "はい、法人登記用住所としてご利用いただけます。郵便物の受取も行っております。",
  },
  {
    id: 7,
    question: "セキュリティ面は大丈夫ですか？",
    answer:
      "24時間防犯カメラを設置しており、お荷物も無料ロッカーにて管理可能ですので安心してご利用いただけます。",
  },
  {
    id: 8,
    question: "営業時間を教えてください",
    answer: "営業時間は9:00〜17:00なっております。",
  },
];

interface FAQItemProps {
  faq: {
    id: number;
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
          {faq.question}
        </h3>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-teal-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-teal-600 transition-colors duration-200" />
          )}
        </div>
      </button>
      <div
        id={`faq-answer-${faq.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div
      id="faq"
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            よくある質問
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            橘香堂 Worx mt.fujiコワーキングスペースについて、
            よくお寄せいただくご質問にお答えします。
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-teal-50 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            その他のご質問はございませんか？
          </h3>
          <p className="text-gray-600 mb-6">
            お気軽にお問い合わせください。スタッフが丁寧にご対応いたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0545-XX-XXXX"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
            >
              お電話でのお問い合わせ
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 font-medium rounded-lg border border-teal-600 hover:bg-teal-50 transition-colors duration-200"
            >
              メールでのお問い合わせ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
