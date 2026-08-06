"use client";

import { Box, SimpleGrid, VStack, HStack, Text, Badge, Icon, Heading, Divider } from "@chakra-ui/react";
import { FiAward, FiTrendingUp } from "react-icons/fi";
import type { AppSentimentData } from "@/types/sentiment";
import { getBestOverall, getBestPerApp } from "@/lib/scoring";
import { shortLabel } from "@/lib/format";

interface Props {
  data: AppSentimentData[];
}

export function BestVersionCard({ data }: Props) {
  const bestOverall = getBestOverall(data);
  const bestPerApp = getBestPerApp(data);

  return (
    <Box
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
      bgGradient="linear(to-br, brand.600, brand.400)"
      color="white"
      boxShadow="lg"
      position="relative"
      overflow="hidden"
    >
      <Icon
        as={FiAward}
        boxSize={28}
        position="absolute"
        right={4}
        top={4}
        opacity={0.15}
      />

      <HStack mb={1}>
        <Icon as={FiAward} boxSize={5} />
        <Text fontSize="xs" fontWeight="bold" letterSpacing="wide" opacity={0.9}>
          REKOMENDASI TERBAIK SECARA KESELURUHAN
        </Text>
      </HStack>

      <Heading size="md" mb={1}>
        {bestOverall.appName} — {shortLabel(bestOverall)}
      </Heading>
      <Text fontSize="sm" opacity={0.9} mb={5} maxW="2xl">
        Dipilih berdasarkan skor komposit yang mempertimbangkan akurasi model, F1-score,
        proporsi ulasan positif, dan jumlah data ulasan yang dianalisis.
      </Text>

      <SimpleGrid columns={{ base: 2, sm: 4 }} spacing={4} mb={2}>
        <StatMini label="Skor Komposit" value={`${Math.round(bestOverall.score * 100)}`} />
        <StatMini label="Akurasi" value={`${Math.round(bestOverall.naiveBayes.accuracy * 100)}%`} />
        <StatMini label="F1-Score" value={`${Math.round(bestOverall.naiveBayes.f1Score * 100)}%`} />
        <StatMini label="Ulasan Positif" value={`${Math.round(bestOverall.positiveRatio * 100)}%`} />
      </SimpleGrid>

      <Divider borderColor="whiteAlpha.400" my={5} />

      <Text fontSize="xs" fontWeight="bold" opacity={0.9} mb={3}>
        VERSI TERBAIK PER APLIKASI
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {Object.entries(bestPerApp).map(([appName, best]) => (
          <HStack
            key={appName}
            bg="whiteAlpha.200"
            borderRadius="xl"
            p={4}
            align="start"
            spacing={3}
          >
            <Icon as={FiTrendingUp} boxSize={5} mt={1} />
            <Box>
              <Text fontSize="xs" opacity={0.8}>
                {appName}
              </Text>
              <Text fontWeight="bold">{shortLabel(best)}</Text>
              <HStack mt={2} spacing={2} wrap="wrap">
                <Badge colorScheme="whiteAlpha" bg="whiteAlpha.300" fontSize="10px">
                  Akurasi {Math.round(best.naiveBayes.accuracy * 100)}%
                </Badge>
                <Badge colorScheme="whiteAlpha" bg="whiteAlpha.300" fontSize="10px">
                  Positif {Math.round(best.positiveRatio * 100)}%
                </Badge>
              </HStack>
            </Box>
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <VStack align="start" spacing={0} bg="whiteAlpha.200" borderRadius="lg" p={3}>
      <Text fontSize="10px" opacity={0.8}>
        {label}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        {value}
      </Text>
    </VStack>
  );
}