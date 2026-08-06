import type { AppSentimentData } from "@/types/sentiment";

export function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadJSON(data: unknown, filename: string) {
  downloadBlob(JSON.stringify(data, null, 2), filename, "application/json");
}

const CSV_HEADERS = [
  "id",
  "appName",
  "platform",
  "version",
  "totalReviews",
  "positive",
  "negative",
  "neutral",
  "accuracy",
  "precision",
  "recall",
  "f1Score",
  "lastUpdated",
];

export function datasetsToCSV(datasets: AppSentimentData[]): string {
  const rows = datasets.map((d) =>
    [
      d.id,
      d.appName,
      d.platform,
      d.version,
      d.totalReviews,
      d.sentimentDistribution.positive,
      d.sentimentDistribution.negative,
      d.sentimentDistribution.neutral,
      d.naiveBayes.accuracy,
      d.naiveBayes.precision,
      d.naiveBayes.recall,
      d.naiveBayes.f1Score,
      d.lastUpdated,
    ]
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(",")
  );

  return [CSV_HEADERS.join(","), ...rows].join("\n");
}

export function downloadCSV(datasets: AppSentimentData[], filename: string) {
  downloadCSVBlob(datasetsToCSV(datasets), filename);
}

function downloadCSVBlob(csv: string, filename: string) {
  downloadBlob(csv, filename, "text/csv;charset=utf-8;");
}