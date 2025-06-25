// constants/facilitiesData.ts
import { FACILITY_IMAGES } from "./facilityImages";

export interface FacilitySection {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  darkTheme?: boolean;
  capacity?: string;
  price?: string;
  availability?: string;
}

export const FACILITY_SECTIONS: FacilitySection[] = [
  {
    id: "overview",
    category: "Overview",
    title: "Modern\nWorkspace",
    subtitle: "次世代のコワーキングスペース",
    description:
      "最新設備と快適な環境を兼ね備えた施設で、あらゆるワークスタイルに対応。個人利用から企業利用まで、多様なニーズにお応えします。",
    features: ["プリンター完備", "高速Wi-Fi完備", "バリアフリー対応"],
    imageSrc: FACILITY_IMAGES.buildingExterior,
    imageAlt: "モダンなオフィスビルの外観",
    darkTheme: false,
  },
  {
    id: "workspace",
    category: "Workspace",
    title: "Flexible\nOffice Space",
    subtitle: "フレキシブルなワークスペース",
    description:
      "グリーンスペース、静寂エリアなど、作業内容に応じて最適な環境を選択できます。集中作業からチームワークまで幅広く対応。",
    features: ["オープンデスク 50席", "電源・USB完備"],
    imageSrc: FACILITY_IMAGES.coworkingSpace,
    imageAlt: "開放的なコワーキングスペース",
    capacity: "最大60名",
    price: "¥500/日",
    darkTheme: false,
  },
  {
    id: "meeting",
    category: "Meeting",
    title: "Conference\nRooms",
    subtitle: "多目的会議室",
    description:
      "6名まで対応可能な会議室をご用意。マックスハブ、大型テレビ、ビデオ会議システムを完備し、効果的なミーティングを実現します。",
    features: ["プロジェクター・スクリーン完備"],
    imageSrc: FACILITY_IMAGES.meetingRoom,
    imageAlt: "モダンな会議室",
    capacity: "2-6名",
    darkTheme: true,
  },
  {
    id: "amenities",
    category: "Amenities",
    title: "Premium\nAmenities",
    subtitle: "充実した共用設備",
    description:
      "キッチン、冷蔵庫、電子レンジ、ポット、軽ドリンクなど、仕事の合間にリフレッシュできる空間を豊富にご用意。コミュニティ形成の場としてもご活用いただけます。",
    features: ["キッチン設備", "ドリンク", "電子レンジ"],
    imageSrc: FACILITY_IMAGES.lounge,
    imageAlt: "快適なラウンジエリア",
    darkTheme: false,
  },
  {
    id: "entertainment",
    category: "Entertainment",
    title: "Sports &\nConference",
    subtitle: "スポーツ観戦・カンファレンス",
    description:
      "大画面でのスポーツ観戦から本格的なカンファレンスまで対応。最新の音響・映像設備で、臨場感あふれる観戦体験や効果的なプレゼンテーション環境を提供します。",
    features: [
      "65インチ4K大型ディスプレイ",
      "55インチ4K大型ディスプレイ",
      "ライブ配信対応設備",
      "プレゼンテーション機器完備",
    ],
    imageSrc: FACILITY_IMAGES.cafeteria,
    imageAlt: "スポーツ観戦・カンファレンスルーム",
    darkTheme: false,
  },
];

// 料金プラン
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "drop-in",
    name: "ドロップイン",
    price: "¥1100",
    period: "1日",
    description: "必要な時だけ利用したい方に",
    features: [
      "オープンデスク利用",
      "Wi-Fi・電源使用",
      "共用エリア利用",
      "基本アメニティ",
    ],
  },
  {
    id: "monthly",
    name: "マンスリー",
    price: "¥25,000",
    period: "月額",
    description: "定期的に利用される方に",
    features: [
      "専用デスク確保",
      "24時間アクセス",
      "会議室2時間/月無料",
      "ロッカー利用",
      "郵便物受取サービス",
    ],
    recommended: true,
  },
  {
    id: "private",
    name: "プライベートオフィス",
    price: "¥80,000〜",
    period: "月額",
    description: "チームでの利用に最適",
    features: [
      "専用個室（2-6名）",
      "24時間アクセス",
      "会議室10時間/月無料",
      "法人登記可能",
      "専用電話番号",
    ],
  },
];

// 利用規約・ルール
export const FACILITY_RULES = [
  {
    category: "利用時間",
    rules: [
      "基本営業時間：平日 7:00-22:00、土日祝 9:00-20:00",
      "24時間プラン加入者は時間外利用可能",
      "年末年始は休館（12/29-1/3）",
    ],
  },
  {
    category: "施設利用",
    rules: ["館内は全面禁煙です", "ゴミは各自お持ち帰りください"],
  },
  {
    category: "セキュリティ",
    rules: [
      "ロッカーを完備しておりますので、貴重品の管理にご利用ください",
      "訪問者は受付での手続きが必要",
      "セキュリティカメラで24時間監視",
    ],
  },
];
