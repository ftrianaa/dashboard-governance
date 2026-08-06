"use client";

import { useRef, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Tooltip,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMaximize2, FiDownload } from "react-icons/fi";
import { toPng } from "html-to-image";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  filename: string;
  height?: number;
  modalHeight?: number;
  children: (height: number) => React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  filename,
  height = 260,
  modalHeight = 420,
  children,
}: ChartCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const bg = useColorModeValue("#ffffff", "#1a202c");

  const handleDownload = async (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(ref.current, { backgroundColor: bg, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh chart:", err);
    } finally {
      setIsDownloading(false);
    }
  };

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
      <HStack justify="space-between" mb={4} align="start">
        <Box>
          <Heading size="sm">{title}</Heading>
          {subtitle && (
            <Text fontSize="xs" color="gray.500" mt={0.5}>
              {subtitle}
            </Text>
          )}
        </Box>
        <HStack spacing={1}>
          <Tooltip label="Unduh sebagai PNG">
            <IconButton
              aria-label="Unduh chart"
              icon={<FiDownload />}
              size="sm"
              variant="ghost"
              isLoading={isDownloading}
              onClick={() => handleDownload(cardRef)}
            />
          </Tooltip>
          <Tooltip label="Perbesar tampilan">
            <IconButton
              aria-label="Perbesar chart"
              icon={<FiMaximize2 />}
              size="sm"
              variant="ghost"
              onClick={onOpen}
            />
          </Tooltip>
        </HStack>
      </HStack>

      <Box ref={cardRef} bg="white" _dark={{ bg: "gray.800" }}>
        {children(height)}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>
            {title}
            {subtitle && (
              <Text fontSize="xs" fontWeight="normal" color="gray.500" mt={1}>
                {subtitle}
              </Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box ref={modalRef} bg="white" _dark={{ bg: "gray.800" }} p={2}>
              {children(modalHeight)}
            </Box>
            <HStack justify="flex-end" mt={4}>
              <IconButton
                aria-label="Unduh chart"
                icon={<FiDownload />}
                onClick={() => handleDownload(modalRef)}
                isLoading={isDownloading}
                colorScheme="brand"
              />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}