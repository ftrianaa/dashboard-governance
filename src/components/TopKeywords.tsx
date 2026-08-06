import { Box, Heading, SimpleGrid, Wrap, WrapItem, Tag, Text } from "@chakra-ui/react";
import type { TopKeywords as TopKeywordsType } from "@/types/sentiment";

interface TopKeywordsProps {
  keywords: TopKeywordsType;
}

export function TopKeywords({ keywords }: TopKeywordsProps) {
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
        Kata Kunci Dominan
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
          <Text fontSize="xs" fontWeight="bold" color="positive.600" mb={2}>
            SENTIMEN POSITIF
          </Text>
          <Wrap>
            {keywords.positive.map((word) => (
              <WrapItem key={word}>
                <Tag colorScheme="green" borderRadius="full" size="sm">
                  {word}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="bold" color="negative.600" mb={2}>
            SENTIMEN NEGATIF
          </Text>
          <Wrap>
            {keywords.negative.map((word) => (
              <WrapItem key={word}>
                <Tag colorScheme="red" borderRadius="full" size="sm">
                  {word}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </SimpleGrid>
    </Box>
  );
}