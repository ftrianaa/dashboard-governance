import { VStack } from "@chakra-ui/react";
import { BestVersionCard } from "./BestVersionCard";
import { AccuracyComparisonChart } from "./AccuracyComparisonChart";
import { SentimentComparisonChart } from "./SentimentComparisonChart";
import { ReviewVolumeChart } from "./ReviewVolumeChart";
import type { AppSentimentData } from "@/types/sentiment";

interface Props {
  data: AppSentimentData[];
}

export function ComparisonOverview({ data }: Props) {
  return (
    <VStack spacing={6} align="stretch">
      <BestVersionCard data={data} />
      <AccuracyComparisonChart data={data} />
      <SentimentComparisonChart data={data} />
      <ReviewVolumeChart data={data} />
    </VStack>
  );
}