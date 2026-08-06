export type SentimentLabel = "positive" | "negative" | "neutral";
export type PlatformName = "Google Play Store" | "App Store";

export interface SentimentDistribution {
  positive: number;
  negative: number;
  neutral: number;
}

export interface ConfusionMatrix {
  labels: string[];
  matrix: number[][];
}

export interface NaiveBayesMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: ConfusionMatrix;
}

export interface TopKeywords {
  positive: string[];
  negative: string[];
}

export interface SampleReview {
  text: string;
  sentiment: SentimentLabel;
  rating: number;
}

export interface AppSentimentData {
  id: string;
  appName: string;
  platform: PlatformName;
  version: string;
  totalReviews: number;
  sentimentDistribution: SentimentDistribution;
  naiveBayes: NaiveBayesMetrics;
  topKeywords: TopKeywords;
  sampleReviews: SampleReview[];
  lastUpdated: string;
}

export type SentimentDataset = AppSentimentData[];