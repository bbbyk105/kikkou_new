// components/InstagramNews.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Heart,
  MessageCircle,
  ExternalLink,
  Play,
  Images,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useInstagramNews } from "@/hooks/use-instagram-news";
import type { InstagramPost } from "@/types/instagram";

// 個別投稿コンポーネント
interface InstagramPostCardProps {
  post: InstagramPost;
}

function InstagramPostCard({ post }: InstagramPostCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateCaption = (caption: string, maxLength: number = 150) => {
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength) + "...";
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 shadow-lg group">
      <div className="relative aspect-square overflow-hidden">
        {imageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full bg-gray-100" />
        )}

        {!imageError ? (
          <Image
            src={post.thumbnailUrl}
            alt={
              post.caption ? truncateCaption(post.caption, 50) : "Instagram投稿"
            }
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400 font-light text-sm">
              画像を読み込めませんでした
            </span>
          </div>
        )}

        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* メディアタイプバッジ */}
        <div className="absolute top-4 right-4 flex gap-2">
          {post.isVideo && (
            <Badge className="bg-black/80 text-white border-0 font-light text-xs px-3 py-1 backdrop-blur-sm">
              <Play className="w-3 h-3 mr-1" />
              動画
            </Badge>
          )}
          {post.isCarousel && (
            <Badge className="bg-black/80 text-white border-0 font-light text-xs px-3 py-1 backdrop-blur-sm">
              <Images className="w-3 h-3 mr-1" />
              複数
            </Badge>
          )}
        </div>

        {/* エンゲージメント統計 */}
        <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge className="bg-white/90 text-gray-800 border-0 font-light text-xs px-3 py-1 backdrop-blur-sm">
            <Heart className="w-3 h-3 mr-1" />
            {post.likes.toLocaleString()}
          </Badge>
          <Badge className="bg-white/90 text-gray-800 border-0 font-light text-xs px-3 py-1 backdrop-blur-sm">
            <MessageCircle className="w-3 h-3 mr-1" />
            {post.comments.toLocaleString()}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        {/* 投稿日時 */}
        <p className="text-xs text-gray-400 mb-4 font-light tracking-wide uppercase">
          {formatDate(post.timestamp)}
        </p>

        {/* キャプション */}
        {post.caption && (
          <p className="text-gray-600 mb-6 leading-relaxed font-light text-sm">
            {truncateCaption(post.caption)}
          </p>
        )}

        {/* 外部リンク */}
        <Link
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-gray-800 hover:text-gray-600 transition-colors group font-light tracking-wide uppercase"
        >
          <span
            className="w-6 h-px bg-gray-800 mr-3 group-hover:w-8 transition-all duration-300"
            aria-hidden="true"
          ></span>
          Instagram で見る
          <ExternalLink className="w-3 h-3 ml-2" />
        </Link>
      </CardContent>
    </Card>
  );
}

// スケルトンローディング
function InstagramNewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden bg-white border-0 shadow-lg"
        >
          <Skeleton className="aspect-square w-full bg-gray-100" />
          <CardContent className="p-6">
            <Skeleton className="h-3 w-20 mb-4 bg-gray-100" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-100" />
            <Skeleton className="h-4 w-3/4 mb-6 bg-gray-100" />
            <Skeleton className="h-3 w-32 bg-gray-100" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// メインコンポーネント
export default function InstagramNews() {
  const { posts, loading, error, hasMore, loadMore, refresh } =
    useInstagramNews(12);

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-400 mb-8 font-light tracking-wide uppercase">
              ( Social Feed )
            </p>
            <h2 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-800">
              Instagram
              <br />
              ニュース
            </h2>
          </div>
          <InstagramNewsSkeleton />
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-400 mb-8 font-light tracking-wide uppercase">
              ( Social Feed )
            </p>
            <h2 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-800">
              Instagram
              <br />
              ニュース
            </h2>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={refresh}
                className="border-gray-300 text-gray-800 hover:bg-gray-100 font-light px-8 py-3"
              >
                <RefreshCw className="w-4 h-4 mr-3" />
                再読み込み
              </Button>
            </div>
          </div>
          <Alert className="border-red-200 bg-red-50 max-w-md mx-auto">
            <AlertDescription className="text-red-700 font-light">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-400 mb-8 font-light tracking-wide uppercase">
            ( Social Feed )
          </p>
          <h2 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-800">
            Instagram
            <br />
            ニュース
          </h2>
          <p className="text-gray-600 mb-8 font-light">
            最新の投稿 {posts.length}件を表示中
          </p>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={refresh}
              disabled={loading}
              className="border-gray-300 text-gray-800 hover:bg-gray-100 font-light px-8 py-3 group"
            >
              <RefreshCw
                className={`w-4 h-4 mr-3 ${loading ? "animate-spin" : ""}`}
              />
              更新
              <span
                className="w-6 h-px bg-gray-800 ml-3 group-hover:w-8 transition-all duration-300"
                aria-hidden="true"
              ></span>
            </Button>
          </div>
        </div>

        {/* エラーメッセージ（部分的なエラー） */}
        {error && posts.length > 0 && (
          <Alert className="border-yellow-200 bg-yellow-50 max-w-md mx-auto mb-12">
            <AlertDescription className="text-yellow-700 font-light">
              一部のデータの読み込みに失敗しました: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* 投稿グリッド */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post) => (
                <InstagramPostCard key={post.id} post={post} />
              ))}
            </div>

            {/* もっと読み込むボタン */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-gray-800 text-white hover:bg-gray-700 font-light px-12 py-4 text-sm tracking-wide uppercase group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                      読み込み中...
                    </>
                  ) : (
                    <>
                      <span
                        className="w-6 h-px bg-white mr-3 group-hover:w-8 transition-all duration-300"
                        aria-hidden="true"
                      ></span>
                      もっと見る
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 font-light">
              投稿が見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
