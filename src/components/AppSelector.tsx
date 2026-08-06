"use client";

import { SimpleGrid, Box, Text, Badge, VStack, HStack } from "@chakra-ui/react";
import type { AppSentimentData } from "@/types/sentiment";
import { FiSmartphone } from "react-icons/fi";

interface AppSelectorProps {
  datasets: AppSentimentData[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function AppSelector({ datasets, selectedId, onSelect }: AppSelectorProps) {
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
      {datasets.map((item) => {
        const isActive = item.id === selectedId;
        return (
          <Box
            key={item.id}
            onClick={() => onSelect(item.id)}
            cursor="pointer"
            borderWidth="2px"
            borderColor={isActive ? "brand.500" : "transparent"}
            bg={isActive ? "brand.50" : "white"}
            _dark={{ bg: isActive ? "brand.900" : "gray.800" }}
            borderRadius="xl"
            p={4}
            boxShadow={isActive ? "md" : "sm"}
            transition="all 0.15s ease"
            _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
          >
            <VStack align="start" spacing={1}>
              <HStack>
                <FiSmartphone color={isActive ? "#6366f1" : "#a0aec0"} />
                <Badge
                  colorScheme={item.platform === "Google Play Store" ? "green" : "gray"}
                  fontSize="9px"
                >
                  {item.platform === "Google Play Store" ? "Play Store" : "App Store"}
                </Badge>
              </HStack>
              <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                {item.appName}
              </Text>
              <Text fontSize="xs" color="gray.500">
                v{item.version}
              </Text>
            </VStack>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}