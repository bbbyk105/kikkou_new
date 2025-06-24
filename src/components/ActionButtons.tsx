// components/ActionButtons.tsx
import React from "react";

export default function ActionButtons() {
  const handleContact = () => {
    // お問い合わせ・内覧予約処理
    console.log("お問い合わせフォームが開かれました");
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-40">
      <button
        onClick={handleContact}
        className="bg-teal-500 text-white px-6 py-3 text-sm hover:bg-teal-600 transition-all rounded shadow-lg"
        aria-label="お問い合わせまたは内覧予約"
      >
        お問合せ・内覧予約
      </button>
    </div>
  );
}
