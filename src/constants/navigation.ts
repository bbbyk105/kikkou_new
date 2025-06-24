// constants/navigation.ts
export const NAVIGATION_ITEMS = [
  { id: "voices", label: "料金" },
  { id: "facility", label: "施設紹介" },
  { id: "instagram", label: "ニュース" },
] as const;

export const LANGUAGE_OPTIONS = [
  { code: "ja", label: "JAPANESE" },
  { code: "en", label: "ENGLISH" },
] as const;

// constants/images.ts
export const IMAGES = {
  hero: "/images/slide1.webp",
  corporateImage: "/images/slide2.webp",
  setupOffice:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
  security:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
  motivation:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  recruitment:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  finalCorporate:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
} as const;
