"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  useColorMode,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { FiSun, FiMoon, FiActivity } from "react-icons/fi";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bgGradient="linear(to-r, brand.600, brand.500)"
      color="white"
      px={{ base: 4, md: 8 }}
      py={6}
      borderBottomRadius="2xl"
      boxShadow="lg"
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
        <HStack spacing={3}>
          <Flex
            align="center"
            justify="center"
            bg="whiteAlpha.300"
            borderRadius="full"
            boxSize={12}
          >
            <FiActivity size={24} />
          </Flex>
          <Box>
            <Heading size="lg">Dashboard Analisis Sentimen</Heading>
            <Text fontSize="sm" opacity={0.9}>
              Klasifikasi Naive Bayes — Ulasan Aplikasi Kepolisian RI
            </Text>
          </Box>
        </HStack>

        <HStack spacing={3}>
          <Badge
            colorScheme="whiteAlpha"
            bg="whiteAlpha.300"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
          >
            8 Dataset Aktif
          </Badge>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.300" }}
            borderRadius="full"
          />
        </HStack>
      </Flex>
    </Box>
  );
}