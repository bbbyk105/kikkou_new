// hooks/useInstagramNews.ts
import { useState, useEffect, useCallback } from "react";
import type {
  InstagramPost,
  InstagramNewsResponse,
  InstagramApiError,
} from "@/types/instagram";

interface UseInstagramNewsReturn {
  posts: InstagramPost[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useInstagramNews(
  initialLimit: number = 10
): UseInstagramNewsReturn {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = useCallback(
    async (cursor?: string | null, isLoadMore = false) => {
      try {
        if (!isLoadMore) setLoading(true);
        else setLoadingMore(true);

        setError(null);

        const params = new URLSearchParams({
          limit: initialLimit.toString(),
        });

        if (cursor) {
          params.append("after", cursor);
        }

        const response = await fetch(`/api/instagram/news?${params}`);

        if (!response.ok) {
          const errorData: InstagramApiError = await response.json();
          throw new Error(errorData.error || "データの取得に失敗しました");
        }

        const data: InstagramNewsResponse = await response.json();

        if (isLoadMore) {
          setPosts((prev) => [...prev, ...data.posts]);
        } else {
          setPosts(data.posts);
        }

        setNextCursor(data.pagination.nextCursor);
        setHasMore(data.pagination.hasNext);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "エラーが発生しました";
        setError(errorMessage);
        console.error("Instagram News Error:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [initialLimit]
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || loading) return;
    await fetchPosts(nextCursor, true);
  }, [hasMore, loadingMore, loading, nextCursor, fetchPosts]);

  const refresh = useCallback(async () => {
    setNextCursor(null);
    setHasMore(true);
    await fetchPosts(null, false);
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
