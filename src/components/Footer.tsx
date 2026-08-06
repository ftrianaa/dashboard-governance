import { Box, Text, Divider, Container } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box mt={12} py={6}>
      <Container maxW="7xl">
        <Divider mb={4} />
        <Text textAlign="center" fontSize="sm" color="gray.500">
          © 2026 Dashboard Analisis Sentimen Naive Bayes. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}