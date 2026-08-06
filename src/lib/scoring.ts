import type { AppSentimentData } from "@/types/sentiment";

export interface ScoredDataset extends AppSentimentData {
  score: number;
  positiveRatio: number;
}

/**
 * Bobot skor komposit untuk menentukan "versi terbaik".
 * - accuracy & f1Score: performa model klasifikasi
 * - positiveRatio: proporsi ulasan positif dari pengguna nyata
 * - volumeConfidence: makin banyak data, makin bisa dipercaya hasilnya
 */
const WEIGHTS = {
  accuracy: 0.3,
  f1Score: 0.25,
  positiveRatio: 0.3,
  volumeConfidence: 0.15,
};

export function scoreDatasets(datasets: AppSentimentData[]): ScoredDataset[] {
  const maxReviews = Math.max(...datasets.map((d) => d.totalReviews), 1);

  return datasets
    .map((d) => {
      const positiveRatio = d.sentimentDistribution.positive / d.totalReviews;
      const volumeConfidence = d.totalReviews / maxReviews;

      const score =
        d.naiveBayes.accuracy * WEIGHTS.accuracy +
        d.naiveBayes.f1Score * WEIGHTS.f1Score +
        positiveRatio * WEIGHTS.positiveRatio +
        volumeConfidence * WEIGHTS.volumeConfidence;

      return { ...d, score, positiveRatio };
    })
    .sort((a, b) => b.score - a.score);
}

export function getBestOverall(datasets: AppSentimentData[]): ScoredDataset {
  return scoreDatasets(datasets)[0];
}

export function getBestPerApp(
  datasets: AppSentimentData[]
): Record<string, ScoredDataset> {
  const apps = Array.from(new Set(datasets.map((d) => d.appName)));
  const result: Record<string, ScoredDataset> = {};

  apps.forEach((app) => {
    const subset = datasets.filter((d) => d.appName === app);
    result[app] = scoreDatasets(subset)[0];
  });

  return result;
}