"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Container,
  VStack,
  SimpleGrid,
  Heading,
  Text,
  Box,
  Alert,
  AlertIcon,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMessageSquare, FiTarget, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { AppSelector } from "@/components/AppSelector";
import { StatCard } from "@/components/StatCard";
import { SentimentChart } from "@/components/SentimentChart";
import { MetricsPanel } from "@/components/MetricsPanel";
import { ConfusionMatrixTable } from "@/components/ConfusionMatrixTable";
import { TopKeywords } from "@/components/TopKeywords";
import { ReviewsTable } from "@/components/ReviewsTable";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { ComparisonOverview } from "@/components/overview/ComparisonOverview";
import { useSentimentData } from "@/lib/useSentimentData";

export default function DashboardPage() {
  const { data, isLoading, error } = useSentimentData();
  const [selectedId, setSelectedId] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    isOpen: isMobileSidebarOpen,
    onOpen: onOpenMobileSidebar,
    onClose: onCloseMobileSidebar,
  } = useDisclosure();

  useEffect(() => {
    if (data && data.length > 0 && !selectedId) {
      setSelectedId(data[0].id);
    }
  }, [data, selectedId]);

  const selected = useMemo(
    () => data?.find((item) => item.id === selectedId) ?? null,
    [data, selectedId]
  );

  if (isLoading) return <DashboardSkeleton />;

  if (error || !data) {
    return (
      <Container maxW="7xl" py={8}>
        <Alert status="error" borderRadius="xl">
          <AlertIcon />
          {error || "Data tidak ditemukan."}
        </Alert>
      </Container>
    );
  }

  return (
    <Box minH="100vh">
      <Header onOpenSidebar={onOpenMobileSidebar} showSidebarToggle />

      <Flex align="flex-start">
        <Sidebar
          datasets={data}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={onCloseMobileSidebar}
        />

        <Box flex={1} minW={0}>
          <Container maxW="7xl" mt={{ base: 5, md: 8 }} pb={10} px={{ base: 4, md: 6 }}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size={{ base: "md", md: "lg" }} mb={1}>
                  Ringkasan Analisis Sentimen
                </Heading>
                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                  Super App Polri & Digital Korlantas Polri — Google Play Store &amp; App
                  Store
                </Text>
              </Box>

              <Tabs variant="soft-rounded" colorScheme="brand" isLazy>
                <Box overflowX="auto" pb={1}>
                  <TabList flexWrap={{ base: "nowrap", md: "wrap" }} gap={2} w="max-content">
                    <Tab fontWeight="semibold" fontSize={{ base: "xs", md: "sm" }} whiteSpace="nowrap">
                      📊 Perbandingan Keseluruhan
                    </Tab>
                    <Tab fontWeight="semibold" fontSize={{ base: "xs", md: "sm" }} whiteSpace="nowrap">
                      🔍 Detail per Aplikasi
                    </Tab>
                  </TabList>
                </Box>

                <TabPanels>
                  {/* TAB 1: perbandingan seluruh dataset */}
                  <TabPanel px={0} pt={6}>
                    <ComparisonOverview data={data} />
                  </TabPanel>

                  {/* TAB 2: detail per aplikasi */}
                  <TabPanel px={0} pt={6}>
                    <VStack spacing={8} align="stretch">
                      <Box>
                        <Heading size={{ base: "sm", md: "md" }} mb={1}>
                          Pilih Dataset
                        </Heading>
                        <Text fontSize="sm" color="gray.500" mb={4}>
                          Klik salah satu untuk melihat detail hasil analisis
                        </Text>
                        <AppSelector
                          datasets={data}
                          selectedId={selectedId}
                          onSelect={setSelectedId}
                        />
                      </Box>

                      {selected && (
                        <>
                          <Box>
                            <Heading size={{ base: "sm", md: "md" }}>
                              {selected.appName}
                            </Heading>
                            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                              {selected.platform} • Versi {selected.version} • Diperbarui{" "}
                              {new Date(selected.lastUpdated).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </Text>
                          </Box>

                          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
                            <StatCard
                              label="Total Ulasan"
                              value={selected.totalReviews.toLocaleString("id-ID")}
                              icon={FiMessageSquare}
                              colorScheme="brand"
                            />
                            <StatCard
                              label="Akurasi Model"
                              value={`${Math.round(selected.naiveBayes.accuracy * 100)}%`}
                              helpText={`F1-Score ${Math.round(
                                selected.naiveBayes.f1Score * 100
                              )}%`}
                              icon={FiTarget}
                              colorScheme="brand"
                            />
                            <StatCard
                              label="Ulasan Positif"
                              value={selected.sentimentDistribution.positive.toLocaleString(
                                "id-ID"
                              )}
                              helpText={`${Math.round(
                                (selected.sentimentDistribution.positive /
                                  selected.totalReviews) *
                                  100
                              )}% dari total`}
                              icon={FiThumbsUp}
                              colorScheme="positive"
                            />
                            <StatCard
                              label="Ulasan Negatif"
                              value={selected.sentimentDistribution.negative.toLocaleString(
                                "id-ID"
                              )}
                              helpText={`${Math.round(
                                (selected.sentimentDistribution.negative /
                                  selected.totalReviews) *
                                  100
                              )}% dari total`}
                              icon={FiThumbsDown}
                              colorScheme="negative"
                            />
                          </SimpleGrid>

                          <SentimentChart distribution={selected.sentimentDistribution} />

                          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                            <MetricsPanel metrics={selected.naiveBayes} />
                            <ConfusionMatrixTable
                              confusionMatrix={selected.naiveBayes.confusionMatrix}
                            />
                          </SimpleGrid>

                          <TopKeywords keywords={selected.topKeywords} />

                          <ReviewsTable reviews={selected.sampleReviews} />
                        </>
                      )}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </Container>

          <Footer />
        </Box>
      </Flex>
    </Box>
  );
}