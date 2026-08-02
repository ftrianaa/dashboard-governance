'use client';

import { useState, useEffect } from 'react';
import { Box, Center, Spinner, Text, Card, Heading, Stack } from '@chakra-ui/react';
import { MasterDashboardData } from '@/types/sentiment';
import DashboardContent from '@/components/DashboardContent';

export default function Page() {
  const [data, setData] = useState<MasterDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/sentiment-data.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal memuat dataset public/data/sentiment-data.json');
        }
        return res.json();
      })
      .then((data: MasterDashboardData) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <Stack align="center" gap={3}>
          <Spinner size="xl" color="blue.600" />
          <Text color="gray.600" fontWeight="medium">
            Memuat Data Evaluasi E-Government Polri...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (error || !data) {
    return (
      <Center minH="100vh" bg="gray.50">
        <Card.Root p={6} borderLeft="4px solid" borderColor="red.500" bg="white">
          <Heading size="md" color="red.600" mb={2}>Gagal Memuat Dashboard</Heading>
          <Text color="gray.600">{error || 'Dataset tidak ditemukan.'}</Text>
          <Text fontSize="xs" color="gray.400" mt={2}>
            Pastikan file public/data/sentiment-data.json sudah tersedia.
          </Text>
        </Card.Root>
      </Center>
    );
  }

  return <DashboardContent masterData={data} />;
}