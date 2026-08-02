export interface WordCount {
  word: string;
  count: number;
}

export interface AppSentimentData {
  appName: string;
  store: string;
  version: string;
  metrics: {
    accuracy: number;
    totalReviews: number;
  };
  distribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  topWords: {
    positive: WordCount[];
    negative: WordCount[];
    neutral: WordCount[];
  };
  aiInsights: string[];
}

export interface AppSummary {
  totalReviews: number;
  avgAccuracy: number;
  positivePct: number;
  negativePct: number;
  neutralPct: number;
  topIssue: string;
  topPraise: string;
}

export interface ComparisonItem {
  name: string;
  app: string;
  store: string;
  ver: string;
  positive: number;
  negative: number;
  neutral: number;
}

export type DatasetKey =
  | 'korlantas_playstore_v175'
  | 'korlantas_playstore_v179'
  | 'korlantas_appstore_v175'
  | 'korlantas_appstore_v179'
  | 'superapp_playstore_v2110'
  | 'superapp_playstore_v227'
  | 'superapp_appstore_v2110'
  | 'superapp_appstore_v227';

export interface MasterDashboardData {
  summary: {
    korlantas: AppSummary;
    superapp: AppSummary;
  };
  comparison: ComparisonItem[];
  datasets: Record<DatasetKey, AppSentimentData>;
}