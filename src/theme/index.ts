import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },
  colors: {
    brand: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    positive: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
    },
    negative: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
    },
    neutralSentiment: {
      50: "#fffbeb",
      500: "#f59e0b",
      600: "#d97706",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("gray.50", "gray.900")(props),
      },
    }),
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          borderRadius: "xl",
        },
      },
    },
  },
});

export default theme;