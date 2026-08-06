import { Box, Stat, StatLabel, StatNumber, StatHelpText, Flex, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface StatCardProps {
  label: string;
  value: string | number;
  helpText?: string;
  icon: IconType;
  colorScheme?: string;
}

export function StatCard({ label, value, helpText, icon, colorScheme = "brand" }: StatCardProps) {
  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="xl"
      boxShadow="sm"
      p={5}
      borderWidth="1px"
      borderColor="gray.100"
      _hover={{ boxShadow: "md" }}
      transition="box-shadow 0.15s ease"
    >
      <Flex justify="space-between" align="start">
        <Stat>
          <StatLabel fontSize="xs" color="gray.500" fontWeight="medium">
            {label}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold">
            {value}
          </StatNumber>
          {helpText && (
            <StatHelpText fontSize="xs" mb={0}>
              {helpText}
            </StatHelpText>
          )}
        </Stat>
        <Flex
          align="center"
          justify="center"
          boxSize={10}
          borderRadius="lg"
          bg={`${colorScheme}.50`}
          color={`${colorScheme}.500`}
          _dark={{ bg: `${colorScheme}.900` }}
        >
          <Icon as={icon} boxSize={5} />
        </Flex>
      </Flex>
    </Box>
  );
}