// types/instagram.ts
export interface InstagramPost {
  id: string;
  type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl: string;
  videoUrl?: string | null;
  thumbnailUrl: string;
  permalink: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  isVideo: boolean;
  isCarousel: boolean;
}

export interface InstagramNewsResponse {
  posts: InstagramPost[];
  pagination: {
    hasNext: boolean;
    nextCursor: string | null;
  };
}

export interface InstagramApiError {
  error: string;
}
