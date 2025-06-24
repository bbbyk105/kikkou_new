// app/api/instagram/news/route.ts
import { NextRequest, NextResponse } from "next/server";

interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  thumbnail_url?: string;
}

interface InstagramApiResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "10";
    const after = searchParams.get("after") || "";

    // 環境変数からアクセストークンとアカウントIDを取得
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const instagramAccountId = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID;

    if (!accessToken || !instagramAccountId) {
      return NextResponse.json(
        { error: "Instagram APIの設定が不完全です" },
        { status: 500 }
      );
    }

    // Instagram Graph APIエンドポイント
    const baseUrl = "https://graph.instagram.com";
    const fields =
      "id,media_type,media_url,permalink,caption,timestamp,like_count,comments_count,thumbnail_url";

    let apiUrl = `${baseUrl}/${instagramAccountId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

    if (after) {
      apiUrl += `&after=${after}`;
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // キャッシュを5分間有効にする
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Instagram API Error:", errorText);
      return NextResponse.json(
        { error: "Instagram APIからのデータ取得に失敗しました" },
        { status: response.status }
      );
    }

    const data: InstagramApiResponse = await response.json();

    // レスポンスデータの整形
    const formattedData = {
      posts: data.data.map((post) => ({
        id: post.id,
        type: post.media_type,
        imageUrl: post.media_url,
        videoUrl: post.media_type === "VIDEO" ? post.media_url : null,
        thumbnailUrl: post.thumbnail_url || post.media_url,
        permalink: post.permalink,
        caption: post.caption || "",
        timestamp: post.timestamp,
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        isVideo: post.media_type === "VIDEO",
        isCarousel: post.media_type === "CAROUSEL_ALBUM",
      })),
      pagination: {
        hasNext: !!data.paging?.next,
        nextCursor: data.paging?.cursors?.after || null,
      },
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Instagram News API Error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
