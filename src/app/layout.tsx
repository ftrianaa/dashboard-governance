import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Dashboard Sentimen E-Government Polri - Korlantas & SuperApp',
  description: 'Evaluasi Sentimen Publik dan Kualitas Layanan Digital Korlantas Polri & SuperApp Polri Presisi Menggunakan Naive Bayes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f8fafc' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}