import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import type { SampleReview } from "@/types/sentiment";

interface ReviewsTableProps {
  reviews: SampleReview[];
}

const sentimentColor: Record<string, string> = {
  positive: "green",
  negative: "red",
  neutral: "yellow",
};

const sentimentLabel: Record<string, string> = {
  positive: "Positif",
  negative: "Negatif",
  neutral: "Netral",
};

export function ReviewsTable({ reviews }: ReviewsTableProps) {
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
        Contoh Ulasan Pengguna
      </Heading>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Ulasan</Th>
              <Th textAlign="center">Rating</Th>
              <Th textAlign="center">Sentimen</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reviews.map((review, idx) => (
              <Tr key={idx}>
                <Td maxW="md">{review.text}</Td>
                <Td textAlign="center">
                  <HStack justify="center" spacing={0.5}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FiStar key={i} color="#f59e0b" fill="#f59e0b" size={12} />
                    ))}
                  </HStack>
                </Td>
                <Td textAlign="center">
                  <Badge colorScheme={sentimentColor[review.sentiment]} borderRadius="full" px={2}>
                    {sentimentLabel[review.sentiment]}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}