import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Dashboard Analisis Sentimen Naive Bayes",
  description:
    "Dashboard hasil analisis sentimen ulasan Super App Polri & Digital Korlantas Polri (Play Store & App Store)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}