import { Box, Heading, SimpleGrid, Text, Progress, VStack } from "@chakra-ui/react";
import type { NaiveBayesMetrics } from "@/types/sentiment";

interface MetricsPanelProps {
  metrics: NaiveBayesMetrics;
}

const items = [
  { key: "accuracy", label: "Accuracy" },
  { key: "precision", label: "Precision" },
  { key: "recall", label: "Recall" },
  { key: "f1Score", label: "F1-Score" },
] as const;

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="xl"
      boxShadow="sm"
      p={5}
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Heading size="sm" mb={4}>
        Metrik Model Naive Bayes
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        {items.map(({ key, label }) => {
          const value = metrics[key];
          const pct = Math.round(value * 100);
          return (
            <VStack key={key} align="stretch" spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Text fontSize="sm" fontWeight="medium">
                  {label}
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="brand.500">
                  {pct}%
                </Text>
              </Box>
              <Progress
                value={pct}
                borderRadius="full"
                size="sm"
                colorScheme="brand"
                bg="gray.100"
              />
            </VStack>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}