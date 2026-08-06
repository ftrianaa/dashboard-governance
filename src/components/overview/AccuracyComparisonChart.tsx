"use client";

import { Box } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { ChartCard } from "@/components/ChartCard";
import type { AppSentimentData } from "@/types/sentiment";
import { shortLabel } from "@/lib/format";

interface Props {
  data: AppSentimentData[];
}

export function AccuracyComparisonChart({ data }: Props) {
  const chartData = data
    .map((d) => ({
      name: shortLabel(d),
      Akurasi: Math.round(d.naiveBayes.accuracy * 100),
      isPlayStore: d.platform === "Google Play Store",
    }))
    .sort((a, b) => b.Akurasi - a.Akurasi);

  return (
    <ChartCard
      title="Perbandingan Akurasi Model"
      subtitle="Akurasi klasifikasi Naive Bayes per dataset (%)"
      filename="perbandingan-akurasi"
    >
      {(height) => (
        <Box h={`${height}px`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 0, right: 20, top: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                interval={0}
                fontSize={10}
                height={70}
              />
              <YAxis domain={[0, 100]} fontSize={11} />
              <Tooltip formatter={(v: number) => [`${v}%`, "Akurasi"]} />
              <Bar dataKey="Akurasi" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.isPlayStore ? "#6366f1" : "#0ea5e9"} />
                ))}
                <LabelList
                  dataKey="Akurasi"
                  position="top"
                  fontSize={10}
                  formatter={(v: number) => `${v}%`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </ChartCard>
  );
}