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
  LabelList,
} from "recharts";
import { ChartCard } from "@/components/ChartCard";
import type { AppSentimentData } from "@/types/sentiment";
import { shortLabel } from "@/lib/format";

interface Props {
  data: AppSentimentData[];
}

export function ReviewVolumeChart({ data }: Props) {
  const chartData = data
    .map((d) => ({ name: shortLabel(d), Ulasan: d.totalReviews }))
    .sort((a, b) => b.Ulasan - a.Ulasan);

  return (
    <ChartCard
      title="Volume Ulasan per Dataset"
      subtitle="Total ulasan yang dianalisis pada setiap versi & platform"
      filename="volume-ulasan"
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
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="Ulasan" fill="#4f46e5" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="Ulasan" position="top" fontSize={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </ChartCard>
  );
}