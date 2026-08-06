"use client";

import { useEffect, useState } from "react";
import type { SentimentDataset } from "@/types/sentiment";

interface UseSentimentDataResult {
  data: SentimentDataset | null;
  isLoading: boolean;
  error: string | null;
}

export function useSentimentData(): UseSentimentDataResult {
  const [data, setData] = useState<SentimentDataset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const res = await fetch("/data/sentiment-data.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal memuat data sentimen");
        const json: SentimentDataset = await res.json();
        if (isMounted) {
          setData(json);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
          setIsLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}