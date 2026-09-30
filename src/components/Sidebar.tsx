"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  Icon,
  Collapse,
  Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FiDownload,
  FiDatabase,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import type { AppSentimentData } from "@/types/sentiment";
import { HEADER_HEIGHT } from "@/lib/layout";

interface SidebarProps {
  // Tidak dipakai lagi (unduhan sekarang dari file statis), dibiarkan opsional
  // supaya pemanggil di parent tidak error.
  datasets?: AppSentimentData[];
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface DataFile {
  appName: string;
  version: string;
  file: string; // nama file di public/data
}

// Nama file harus sama persis (case-sensitive) dengan di folder public/data
const PLAYSTORE_FILES: DataFile[] = [
  {
    appName: "Digital Korlantas",
    version: "1.7.5",
    file: "dataset_id.qoin.korlantas.user_versi_1.7.5.csv",
  },
  {
    appName: "Digital Korlantas",
    version: "1.7.9",
    file: "id.qoin.korlantas.user_versi_1.7.9.csv",
  },
  {
    appName: "SuperApp Polri Presisi",
    version: "2.1.10",
    file: "dataset_superapps.polri.presisi.presisi_versi_2.1.10.csv",
  },
  {
    appName: "SuperApp Polri Presisi",
    version: "2.2.7",
    file: "superapps.polri.presisi.presisi_versi_2.2.7.csv",
  },
];

const APPSTORE_FILES: DataFile[] = [
  {
    appName: "Digital Korlantas",
    version: "1.7.5",
    file: "reviews_korlantas_v1.7.5.csv",
  },
  {
    appName: "Digital Korlantas",
    version: "1.7.9",
    file: "reviews_korlantas_v1.7.9.csv",
  },
  {
    appName: "SuperApp Polri Presisi",
    version: "2.1.10",
    file: "reviews_superapp_v2.1.10.csv",
  },
  {
    appName: "SuperApp Polri Presisi",
    version: "2.2.7",
    file: "reviews_superApp_v2.2.7.csv",
  },
];

function FileGroup({ title, files }: { title: string; files: DataFile[] }) {
  return (
    <VStack align="stretch" spacing={2}>
      <Text fontSize="xs" fontWeight="bold" color="gray.500">
        {title.toUpperCase()}
      </Text>

      {files.map((f) => (
        <Box
          key={f.file}
          p={2}
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.100"
          _hover={{ borderColor: "brand.300", bg: "brand.50" }}
          _dark={{
            borderColor: "gray.700",
            _hover: { bg: "gray.700", borderColor: "brand.400" },
          }}
          transition="all 0.15s ease"
        >
          <Text fontSize="xs" fontWeight="semibold" noOfLines={1}>
            {f.appName} • v{f.version}
          </Text>
          <Text fontSize="10px" color="gray.500" mb={1}>
            {title} 
          </Text>
          <Button
            as="a"
            href={`/data/${f.file}`}
            download={f.file}
            size="xs"
            leftIcon={<FiDownload />}
            variant="ghost"
            colorScheme="brand"
          >
            CSV
          </Button>
        </Box>
      ))}
    </VStack>
  );
}

function SidebarContent() {
  return (
    <VStack align="stretch" spacing={4}>
      <Text fontSize="xs" color="gray.500">
        Unduh data ulasan mentah (CSV) untuk keperluan pelaporan atau riset lanjutan.
      </Text>

      <FileGroup title="Play Store" files={PLAYSTORE_FILES} />

      <Divider />

      <FileGroup title="App Store" files={APPSTORE_FILES} />
    </VStack>
  );
}

export function Sidebar({
  isOpen,
  onToggle,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  // Mobile / tablet: tampil sebagai Drawer overlay
  if (!isDesktop) {
    return (
      <Drawer isOpen={isMobileOpen} placement="left" onClose={onCloseMobile} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Icon as={FiDatabase} color="brand.500" />
              <Text fontWeight="bold" fontSize="sm">
                Unduh Dataset
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody pb={6}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: panel "L-shape" — sticky tepat di bawah header,
  // hanya panel ini sendiri yang scroll internal jika kontennya panjang.
  return (
    <Box
      position="sticky"
      top={HEADER_HEIGHT}
      alignSelf="flex-start"
      h={{ base: `calc(100vh - ${HEADER_HEIGHT.base})`, md: `calc(100vh - ${HEADER_HEIGHT.md})` }}
      w={isOpen ? "280px" : "56px"}
      transition="width 0.2s ease"
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRightWidth="1px"
      borderColor="gray.100"
      overflowY="auto"
      overflowX="hidden"
      flexShrink={0}
      py={5}
      px={isOpen ? 4 : 2}
      zIndex={10}
    >
      <VStack align="stretch" spacing={5}>
        <HStack justify={isOpen ? "space-between" : "center"}>
          {isOpen && (
            <HStack>
              <Icon as={FiDatabase} color="brand.500" />
              <Text fontWeight="bold" fontSize="sm">
                Unduh Dataset
              </Text>
            </HStack>
          )}
          <Tooltip label={isOpen ? "Tutup panel" : "Buka panel"} placement="right">
            <Button size="sm" variant="ghost" onClick={onToggle} px={2} minW="auto">
              <Icon as={isOpen ? FiChevronsLeft : FiChevronsRight} />
            </Button>
          </Tooltip>
        </HStack>

        <Collapse in={isOpen} animateOpacity>
          <SidebarContent />
        </Collapse>
      </VStack>
    </Box>
  );
}