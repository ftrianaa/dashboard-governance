'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  Card,
  Stack,
  HStack,
  Separator,
  NativeSelect,
  Progress
} from '@chakra-ui/react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
import { MasterDashboardData, DatasetKey, AppSentimentData } from '@/types/sentiment';

const COLOR_MAP = {
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#f59e0b'
};

interface DashboardContentProps {
  masterData: MasterDashboardData;
}

export default function DashboardContent({ masterData }: DashboardContentProps) {
  const [selectedKey, setSelectedKey] = useState<DatasetKey>('korlantas_playstore_v179');
  const currentData: AppSentimentData = masterData.datasets[selectedKey];

  const pieData = [
    { name: 'Positif', value: currentData.distribution.positive, color: COLOR_MAP.positive },
    { name: 'Negatif', value: currentData.distribution.negative, color: COLOR_MAP.negative },
    { name: 'Netral', value: currentData.distribution.neutral, color: COLOR_MAP.neutral }
  ];

  return (
    <Box bg="slate.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        
        {/* ========================================== */}
        {/* 1. EXECUTIVE HEADER CONTEXT                */}
        {/* ========================================== */}
        <Card.Root mb={6} p={6} shadow="sm" borderRadius="xl" bg="white" borderTop="6px solid" borderColor="blue.700">
          <HStack justify="space-between" wrap="wrap" gap={4}>
            <Box maxW="800px">
              <Badge colorPalette="blue" mb={2} px={3} py={1} fontSize="xs" fontWeight="bold">
                E-GOVERNMENT PUBLIC SERVICE EVALUATION
              </Badge>
              <Heading size="xl" color="gray.900" tracking="tight">
                Evaluasi Sentimen Publik Layanan Aplikasi Digital Polri
              </Heading>
              <Text color="gray.600" fontSize="sm" mt={1}>
                Analisis Kualitas Layanan Publik pada <strong>Digital Korlantas Polri</strong> dan <strong>SuperApp Polri Presisi</strong> berbasis Model <i>Naive Bayes Classifier</i>.
              </Text>
            </Box>
            <Stack align={{ base: 'flex-start', md: 'flex-end' }} gap={1}>
              <Badge colorPalette="green" variant="subtle" px={3} py={1}>
                Metode: Naive Bayes
              </Badge>
              <Text fontSize="xs" color="gray.500">
                Total Sampel: <strong>13,210 Ulasan</strong>
              </Text>
              <Text fontSize="xs" color="gray.500">
                Cakupan: <strong>Google Play Store & Apple App Store</strong>
              </Text>
            </Stack>
          </HStack>
        </Card.Root>

        {/* ========================================== */}
        {/* 2. OVERALL EXECUTIVE SUMMARY CARDS         */}
        {/* ========================================== */}
        <Heading size="md" mb={3} color="gray.800">
          📌 Ringkasan Eksekutif (Overall App Performance)
        </Heading>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} mb={8}>
          {/* CARD KORLANTAS */}
          <Card.Root p={6} shadow="sm" bg="white" borderRadius="lg" borderLeft="6px solid" borderColor="blue.600">
            <HStack justify="space-between" mb={2}>
              <Heading size="md" color="blue.900">🏎️ Digital Korlantas Polri</Heading>
              <Badge colorPalette="blue" px={2} py={1}>
                {masterData.summary.korlantas.totalReviews.toLocaleString('id-ID')} Reviews
              </Badge>
            </HStack>
            <Text fontSize="xs" color="gray.500" mb={4}>
              Aplikasi Layanan Lalu Lintas & Perpanjangan SIM Online
            </Text>

            <Stack gap={3}>
              <Box>
                <HStack justify="space-between" fontSize="sm" fontWeight="bold" mb={1}>
                  <Text color="green.600">Tingkat Kepuasan (Positif): {masterData.summary.korlantas.positivePct}%</Text>
                  <Text color="red.500">Negatif: {masterData.summary.korlantas.negativePct}%</Text>
                </HStack>
                <Progress.Root value={masterData.summary.korlantas.positivePct} colorPalette="green" size="sm" borderRadius="full">
                  <Progress.Track />
                  <Progress.Range />
                </Progress.Root>
              </Box>

              <Separator color="gray.100" my={1} />

              <Box fontSize="xs">
                <Text fontWeight="bold" color="red.600">⚠️ Keluhan Utama Masyarakat:</Text>
                <Text color="gray.700">{masterData.summary.korlantas.topIssue}</Text>
              </Box>
              <Box fontSize="xs">
                <Text fontWeight="bold" color="green.600">👍 Pendorong Kepuasan Utama:</Text>
                <Text color="gray.700">{masterData.summary.korlantas.topPraise}</Text>
              </Box>
            </Stack>
          </Card.Root>

          {/* CARD SUPERAPP */}
          <Card.Root p={6} shadow="sm" bg="white" borderRadius="lg" borderLeft="6px solid" borderColor="purple.600">
            <HStack justify="space-between" mb={2}>
              <Heading size="md" color="purple.900">🛡️ SuperApp Polri Presisi</Heading>
              <Badge colorPalette="purple" px={2} py={1}>
                {masterData.summary.superapp.totalReviews.toLocaleString('id-ID')} Reviews
              </Badge>
            </HStack>
            <Text fontSize="xs" color="gray.500" mb={4}>
              Portal Integrasi Layanan Kepolisian (SKCK, Polsek, Pendaftaran)
            </Text>

            <Stack gap={3}>
              <Box>
                <HStack justify="space-between" fontSize="sm" fontWeight="bold" mb={1}>
                  <Text color="green.600">Tingkat Kepuasan (Positif): {masterData.summary.superapp.positivePct}%</Text>
                  <Text color="red.500">Negatif: {masterData.summary.superapp.negativePct}%</Text>
                </HStack>
                <Progress.Root value={masterData.summary.superapp.positivePct} colorPalette="purple" size="sm" borderRadius="full">
                  <Progress.Track />
                  <Progress.Range />
                </Progress.Root>
              </Box>

              <Separator color="gray.100" my={1} />

              <Box fontSize="xs">
                <Text fontWeight="bold" color="red.600">⚠️ Keluhan Utama Masyarakat:</Text>
                <Text color="gray.700">{masterData.summary.superapp.topIssue}</Text>
              </Box>
              <Box fontSize="xs">
                <Text fontWeight="bold" color="green.600">👍 Pendorong Kepuasan Utama:</Text>
                <Text color="gray.700">{masterData.summary.superapp.topPraise}</Text>
              </Box>
            </Stack>
          </Card.Root>
        </SimpleGrid>

        {/* ========================================== */}
        {/* 3. COMPARISON CHART Across 8 DATASETS      */}
        {/* ========================================== */}
        <Card.Root mb={8} p={6} shadow="sm" bg="white" borderRadius="lg">
          <Heading size="md" mb={1} color="gray.800">
            📊 Perbandingan Sentimen 8 Dataset (Store & Versi Aplikasi)
          </Heading>
          <Text fontSize="xs" color="gray.500" mb={4}>
            Perbandingan proporsi ulasan positif, negatif, dan netral untuk mendeteksi peningkatan/penurunan performa tiap rilis versi.
          </Text>

          <Box h="320px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={masterData.comparison} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                <YAxis unit="%" fontSize={11} />
                <Tooltip formatter={(value) => [`${value}%`]} />
                <Legend verticalAlign="top" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="positive" name="Positif" fill={COLOR_MAP.positive} stackId="a" />
                <Bar dataKey="neutral" name="Netral" fill={COLOR_MAP.neutral} stackId="a" />
                <Bar dataKey="negative" name="Negatif" fill={COLOR_MAP.negative} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card.Root>

        {/* ========================================== */}
        {/* 4. DEEP DIVE FILTER SECTION                */}
        {/* ========================================== */}
        <Separator mb={8} />

        <HStack justify="space-between" align="center" wrap="wrap" mb={4} gap={3}>
          <Box>
            <Heading size="md" color="gray.800">
              🔍 Deep Dive Analisis Detail Sub-Dataset
            </Heading>
            <Text fontSize="xs" color="gray.500">
              Pilih spesifik versi dan toko aplikasi untuk melihat distribusi, kata kunci, dan AI Insights.
            </Text>
          </Box>

          <HStack gap={2}>
            <NativeSelect.Root size="sm" width="300px">
              <NativeSelect.Field 
                value={selectedKey} 
                onChange={(e) => setSelectedKey(e.currentTarget.value as DatasetKey)}
                fontWeight="bold"
                borderColor="blue.400"
              >
                <optgroup label="Digital Korlantas Polri">
                  <option value="korlantas_playstore_v179">Korlantas - Play Store v1.7.9 (Terbaru)</option>
                  <option value="korlantas_playstore_v175">Korlantas - Play Store v1.7.5</option>
                  <option value="korlantas_appstore_v179">Korlantas - App Store v1.7.9 (Terbaru)</option>
                  <option value="korlantas_appstore_v175">Korlantas - App Store v1.7.5</option>
                </optgroup>
                <optgroup label="SuperApp Polri Presisi">
                  <option value="superapp_playstore_v227">SuperApp - Play Store v2.2.7 (Terbaru)</option>
                  <option value="superapp_playstore_v2110">SuperApp - Play Store v2.1.10</option>
                  <option value="superapp_appstore_v227">SuperApp - App Store v2.2.7 (Terbaru)</option>
                  <option value="superapp_appstore_v2110">SuperApp - App Store v2.1.10</option>
                </optgroup>
              </NativeSelect.Field>
            </NativeSelect.Root>
          </HStack>
        </HStack>

        {/* METRICS OF SELECTED DATASET */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <Card.Root p={4} shadow="sm" bg="white" borderLeft="4px solid" borderColor="blue.500">
            <Text fontSize="xs" color="gray.500" fontWeight="bold">AKURASI MODEL NAIVE BAYES</Text>
            <Text fontSize="2xl" fontWeight="extrabold" color="blue.600">
              {(currentData.metrics.accuracy * 100).toFixed(2)}%
            </Text>
            <Text fontSize="xs" color="gray.400">Evaluasi Data Testing</Text>
          </Card.Root>

          <Card.Root p={4} shadow="sm" bg="white" borderLeft="4px solid" borderColor="slate.500">
            <Text fontSize="xs" color="gray.500" fontWeight="bold">JUMLAH ULASAN DIANALISIS</Text>
            <Text fontSize="2xl" fontWeight="extrabold" color="gray.800">
              {currentData.metrics.totalReviews.toLocaleString('id-ID')}
            </Text>
            <Text fontSize="xs" color="gray.400">{currentData.store} ({currentData.version})</Text>
          </Card.Root>

          <Card.Root p={4} shadow="sm" bg="white" borderLeft="4px solid" borderColor="green.500">
            <Text fontSize="xs" color="gray.500" fontWeight="bold">RASIO SENTIMEN POSITIF</Text>
            <Text fontSize="2xl" fontWeight="extrabold" color="green.600">
              {currentData.distribution.positive}%
            </Text>
            <Text fontSize="xs" color="gray.400">Tingkat Kepuasan Publik</Text>
          </Card.Root>
        </SimpleGrid>

        {/* CHARTS FOR SELECTED DATASET */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} mb={6}>
          {/* PIE CHART */}
          <Card.Root p={5} shadow="sm" bg="white">
            <Heading size="sm" mb={3} color="gray.800">
              Distribusi Sentimen ({currentData.appName} - {currentData.version})
            </Heading>
            <Box h="250px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={pieData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={75} 
                    label={(e) => `${e.name}: ${e.value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`]} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card.Root>

          {/* BAR CHART TOP NEGATIVE WORDS */}
          <Card.Root p={5} shadow="sm" bg="white">
            <Heading size="sm" mb={3} color="red.600">
              Top 5 Keluhan Utama (Frekuensi Kata Negatif)
            </Heading>
            <Box h="250px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.topWords.negative.slice(0, 5)} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" fontSize={11} />
                  <YAxis dataKey="word" type="category" width={80} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} name="Frekuensi Kata" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card.Root>
        </SimpleGrid>

        {/* AI POLICY RECOMMENDATIONS FOR E-GOVERNMENT */}
        <Card.Root p={6} shadow="sm" bg="blue.50" borderColor="blue.200" borderRadius="xl">
          <Heading size="sm" color="blue.900" mb={2}>
            💡 Rekomendasi Kebijakan AI untuk Layanan E-Government ({currentData.appName})
          </Heading>
          <Text fontSize="xs" color="gray.600" mb={4}>
            Langkah taktis perbaikan infrastruktur sistem berdasarkan hasil klasifikasi ulasan masyarakat:
          </Text>
          <Stack gap={2}>
            {currentData.aiInsights.map((insight, idx) => (
              <HStack key={idx} align="flex-start">
                <Text color="blue.600" fontWeight="bold">•</Text>
                <Text fontSize="sm" color="gray.800">{insight}</Text>
              </HStack>
            ))}
          </Stack>
        </Card.Root>

      </Container>
    </Box>
  );
}