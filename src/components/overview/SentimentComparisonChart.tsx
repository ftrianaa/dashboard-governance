"use client";

import { Box } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "@/components/ChartCard";
import type { AppSentimentData } from "@/types/sentiment";
import { shortLabel } from "@/lib/format";

interface Props {
  data: AppSentimentData[];
}

export function SentimentComparisonChart({ data }: Props) {
  const chartData = data.map((d) => ({
    name: shortLabel(d),
    Positif: d.sentimentDistribution.positive,
    Netral: d.sentimentDistribution.neutral,
    Negatif: d.sentimentDistribution.negative,
  }));

  return (
    <ChartCard
      title="Perbandingan Distribusi Sentimen"
      subtitle="Jumlah ulasan per kategori sentimen di setiap dataset"
      filename="perbandingan-sentimen"
    >
      {(height) => (
        <Box h={`${height}px`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 0, right: 20, top: 10, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                interval={0}
                fontSize={10}
                height={70}
              />
              <YAxis fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positif" stackId="a" fill="#22c55e" />
              <Bar dataKey="Netral" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Negatif" stackId="a" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </ChartCard>
  );
}