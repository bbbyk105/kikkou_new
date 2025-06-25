// constants/facilityImages.ts
export const FACILITY_IMAGES = {
  // 施設外観・エントランス
  buildingExterior:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", // モダンなオフィスビル
  entrance:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", // オフィスエントランス
  lobby:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80", // モダンなロビー

  // ワークスペース
  openOffice:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80", // オープンオフィス
  privateOffice:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", // プライベートオフィス
  meetingRoom:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80", // 会議室
  coworkingSpace:
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80", // コワーキングスペース
  quietZone:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", // 静かな作業エリア

  // 共用施設
  kitchen:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", // オフィスキッチン
  lounge:
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", // ラウンジエリア
  cafeteria:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", // カフェテリア
  eventSpace:
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", // イベントスペース

  // 設備・アメニティ
  techEquipment:
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80", // テクノロジー機器
  printingStation:
    "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80", // プリンティングステーション
  phoneBooth:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", // 電話ブース
  storage:
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80", // 収納エリア

  // アクセス・駐車場
  parking:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", // 駐車場
  accessibility:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80", // アクセシビリティ
  transportation:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80", // 交通アクセス
} as const;

// 画像の型定義
export type FacilityImageKey = keyof typeof FACILITY_IMAGES;

// カテゴリ別の画像キー
export const FACILITY_IMAGE_CATEGORIES = {
  exterior: ["buildingExterior", "entrance", "lobby"] as const,
  workspace: [
    "openOffice",
    "privateOffice",
    "meetingRoom",
    "coworkingSpace",
    "quietZone",
  ] as const,
  common: ["kitchen", "lounge", "cafeteria", "eventSpace"] as const,
  amenities: [
    "techEquipment",
    "printingStation",
    "phoneBooth",
    "storage",
  ] as const,
  access: ["parking", "accessibility", "transportation"] as const,
} as const;
