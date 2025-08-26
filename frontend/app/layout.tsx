import Image from 'next/image';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PollBee 🐝 Create Polls',
  description: 'Create and share interactive polls easily.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} p-4 antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
