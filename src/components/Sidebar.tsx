"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  Icon,
  Collapse,
  Tooltip,
} from "@chakra-ui/react";
import {
  FiDownload,
  FiDatabase,
  FiFileText,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import type { AppSentimentData } from "@/types/sentiment";
import { downloadJSON, downloadCSV } from "@/lib/exportUtils";

interface SidebarProps {
  datasets: AppSentimentData[];
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ datasets, isOpen, onToggle }: SidebarProps) {
  return (
    <Box
      position="sticky"
      top={0}
      alignSelf="flex-start"
      h="100vh"
      w={isOpen ? "280px" : "56px"}
      transition="width 0.2s ease"
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRightWidth="1px"
      borderColor="gray.100"
      overflowY="auto"
      overflowX="hidden"
      flexShrink={0}
      py={5}
      px={isOpen ? 4 : 2}
      zIndex={10}
    >
      <VStack align="stretch" spacing={5}>
        <HStack justify={isOpen ? "space-between" : "center"}>
          {isOpen && (
            <HStack>
              <Icon as={FiDatabase} color="brand.500" />
              <Text fontWeight="bold" fontSize="sm">
                Unduh Dataset
              </Text>
            </HStack>
          )}
          <Tooltip label={isOpen ? "Tutup panel" : "Buka panel"} placement="right">
            <Button size="sm" variant="ghost" onClick={onToggle} px={2} minW="auto">
              <Icon as={isOpen ? FiChevronsLeft : FiChevronsRight} />
            </Button>
          </Tooltip>
        </HStack>

        <Collapse in={isOpen} animateOpacity>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="xs" color="gray.500">
              Unduh data hasil analisis sentimen untuk keperluan pelaporan atau riset
              lanjutan.
            </Text>

            <VStack align="stretch" spacing={2}>
              <Button
                leftIcon={<FiFileText />}
                size="sm"
                colorScheme="brand"
                variant="solid"
                justifyContent="flex-start"
                onClick={() => downloadJSON(datasets, "sentiment-data-full.json")}
              >
                Unduh Semua (JSON)
              </Button>
              <Button
                leftIcon={<FiFileText />}
                size="sm"
                colorScheme="brand"
                variant="outline"
                justifyContent="flex-start"
                onClick={() => downloadCSV(datasets, "sentiment-data-full.csv")}
              >
                Unduh Semua (CSV)
              </Button>
            </VStack>

            <Divider />

            <Text fontSize="xs" fontWeight="bold" color="gray.500">
              PER DATASET
            </Text>

            <VStack align="stretch" spacing={2}>
              {datasets.map((d) => (
                <Box
                  key={d.id}
                  p={2}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="gray.100"
                  _hover={{ borderColor: "brand.300", bg: "brand.50" }}
                  _dark={{
                    borderColor: "gray.700",
                    _hover: { bg: "gray.700", borderColor: "brand.400" },
                  }}
                  transition="all 0.15s ease"
                >
                  <Text fontSize="xs" fontWeight="semibold" noOfLines={1}>
                    {d.appName}
                  </Text>
                  <Text fontSize="10px" color="gray.500" mb={1}>
                    {d.platform === "Google Play Store" ? "Play Store" : "App Store"} • v
                    {d.version}
                  </Text>
                  <Button
                    size="xs"
                    leftIcon={<FiDownload />}
                    variant="ghost"
                    colorScheme="brand"
                    onClick={() => downloadJSON(d, `${d.id}.json`)}
                  >
                    JSON
                  </Button>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Collapse>
      </VStack>
    </Box>
  );
}