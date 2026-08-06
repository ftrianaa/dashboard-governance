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
import { FiSun, FiMoon, FiActivity, FiMenu } from "react-icons/fi";
import { HEADER_HEIGHT } from "@/lib/layout";

interface HeaderProps {
  onOpenSidebar?: () => void;
  showSidebarToggle?: boolean;
}

export function Header({ onOpenSidebar, showSidebarToggle }: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={200}
      h={HEADER_HEIGHT}
      bgGradient="linear(to-r, brand.600, brand.500)"
      color="white"
      px={{ base: 3, md: 8 }}
      boxShadow="lg"
    >
      <Flex h="100%" justify="space-between" align="center" gap={3}>
        <HStack spacing={{ base: 2, md: 3 }} minW={0}>
          {showSidebarToggle && (
            <IconButton
              aria-label="Buka menu"
              icon={<FiMenu />}
              onClick={onOpenSidebar}
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.300" }}
              borderRadius="full"
              size="sm"
              display={{ base: "inline-flex", lg: "none" }}
            />
          )}

          <Flex
            align="center"
            justify="center"
            bg="whiteAlpha.300"
            borderRadius="full"
            boxSize={{ base: 9, md: 12 }}
            flexShrink={0}
          >
            <FiActivity size={20} />
          </Flex>

          <Box minW={0}>
            <Heading size={{ base: "sm", md: "lg" }} noOfLines={1}>
              Dashboard Analisis Sentimen
            </Heading>
            <Text
              fontSize={{ base: "10px", md: "sm" }}
              opacity={0.9}
              noOfLines={1}
              display={{ base: "none", sm: "block" }}
            >
              Klasifikasi Naive Bayes — Ulasan Aplikasi Kepolisian RI
            </Text>
          </Box>
        </HStack>

        <HStack spacing={{ base: 1, md: 3 }} flexShrink={0}>
          <Badge
            colorScheme="whiteAlpha"
            bg="whiteAlpha.300"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            display={{ base: "none", md: "inline-flex" }}
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
            size={{ base: "sm", md: "md" }}
          />
        </HStack>
      </Flex>
    </Box>
  );
}