// constants/valueScrollSections.ts
import { IMAGES } from "@/constants/navigation";

export const VALUE_SCROLL_SECTIONS = [
  {
    id: "community-first",
    title: "Community\nFirst",
    subtitle: "誰でも利用できるスペース",
    description:
      "年齢・職業を問わず誰でも集まり、学び・交流できる地域ハブをつくる。高齢者の憩い、起業家・趣味サークルの場として活用。コミュニティの絆を深め、新しいつながりを生み出します。",
    imageSrc: IMAGES.corporateImage,
    imageAlt:
      "Modern office building entrance with professional atmosphere - プロフェッショナルな雰囲気のモダンオフィスビル入口",
    reversed: false,
    darkTheme: false,
  },
  {
    id: "facility-environment",
    title: "Facility\nEnvironment",
    subtitle: "設備と環境",
    description:
      "多様なワークスペースと高品質な設備が整った環境で、快適に業務を進められます。高速インターネット、プリンター、専用デスクなど、ニーズに応じたオプションが豊富に揃っています。",
    imageSrc: IMAGES.security,
    imageAlt:
      "Secure office building entrance with modern security systems - モダンなセキュリティシステムを備えた安全なオフィスビル入口",
    reversed: true,
    darkTheme: false,
  },
  {
    id: "versatility",
    title: "Versatility",
    subtitle: "多用途性",
    description:
      "多様な活動をサポートする環境が整っています。ヨガやリラックスできる休憩時間、イベントなど、自由に使えるスペースが提供され、心身ともにリフレッシュできます。",
    imageSrc: IMAGES.recruitment,
    imageAlt:
      "Modern office workspace with collaborative environment - コラボレーション環境を備えたモダンなオフィスワークスペース",
    reversed: true,
    darkTheme: true,
  },
];
