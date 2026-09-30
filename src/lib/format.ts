import type { AppSentimentData } from "@/types/sentiment";

export function shortLabel(dataset: AppSentimentData): string {
  const appAbbr = dataset.appName.toLowerCase().includes("korlantas")
    ? "Korlantas"
    : "SuperApp";
  const platformAbbr = dataset.platform === "Google Play Store" ? "Play Store" : "iOS";
  return `${appAbbr} v${dataset.version} (${platformAbbr})`;
}