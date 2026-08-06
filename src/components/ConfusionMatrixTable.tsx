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
} from "@chakra-ui/react";
import type { ConfusionMatrix } from "@/types/sentiment";

interface ConfusionMatrixTableProps {
  confusionMatrix: ConfusionMatrix;
}

export function ConfusionMatrixTable({ confusionMatrix }: ConfusionMatrixTableProps) {
  const { labels, matrix } = confusionMatrix;

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
        Confusion Matrix
      </Heading>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Aktual \ Prediksi</Th>
              {labels.map((l) => (
                <Th key={l} textAlign="center">
                  {l}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {matrix.map((row, rowIdx) => (
              <Tr key={labels[rowIdx]}>
                <Td fontWeight="semibold">{labels[rowIdx]}</Td>
                {row.map((value, colIdx) => (
                  <Td
                    key={colIdx}
                    textAlign="center"
                    fontWeight={rowIdx === colIdx ? "bold" : "normal"}
                    bg={rowIdx === colIdx ? "brand.50" : "transparent"}
                    color={rowIdx === colIdx ? "brand.600" : "gray.600"}
                    _dark={{
                      bg: rowIdx === colIdx ? "brand.900" : "transparent",
                      color: rowIdx === colIdx ? "brand.200" : "gray.300",
                    }}
                  >
                    {value}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}