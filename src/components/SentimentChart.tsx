"use client";

import { Box, SimpleGrid, HStack, Text, VStack } from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { SentimentDistribution } from "@/types/sentiment";
import { ChartCard } from "@/components/ChartCard";

const COLORS: Record<string, string> = {
  Positif: "#22c55e",
  Negatif: "#ef4444",
  Netral: "#f59e0b",
};

interface SentimentChartProps {
  distribution: SentimentDistribution;
}

export function SentimentChart({ distribution }: SentimentChartProps) {
  const chartData = [
    { name: "Positif", value: distribution.positive },
    { name: "Negatif", value: distribution.negative },
    { name: "Netral", value: distribution.neutral },
  ];

  return (
    <ChartCard
      title="Distribusi Sentimen"
      subtitle="Perbandingan proporsi sentimen ulasan"
      filename="distribusi-sentimen"
    >
      {(height) => (
        <Box>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
            <Box h={`${height}px`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box h={`${height}px`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" fontSize={11} />
                  <YAxis type="category" dataKey="name" fontSize={12} width={60} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </SimpleGrid>

          <HStack mt={4} spacing={6} justify="center" wrap="wrap">
            {chartData.map((d) => (
              <VStack key={d.name} spacing={0}>
                <Text fontSize="xs" color="gray.500">
                  {d.name}
                </Text>
                <Text fontWeight="bold" color={COLORS[d.name]}>
                  {d.value}
                </Text>
              </VStack>
            ))}
          </HStack>
        </Box>
      )}
    </ChartCard>
  );
}