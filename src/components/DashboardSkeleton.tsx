import { SimpleGrid, Skeleton, VStack, Container } from "@chakra-ui/react";

export function DashboardSkeleton() {
  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Skeleton height="60px" borderRadius="xl" />
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height="80px" borderRadius="xl" />
          ))}
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height="100px" borderRadius="xl" />
          ))}
        </SimpleGrid>
        <Skeleton height="320px" borderRadius="xl" />
      </VStack>
    </Container>
  );
}