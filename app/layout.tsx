import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { VehiclesProvider } from '@/common/store/store';
import Header from '@/components/header/Header';

export const metadata = {
  title: 'AatoWorld',
  description: 'Website about cars',
  authors: 'Stefan Micunovic',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        <VehiclesProvider>{children}</VehiclesProvider>
      </body>
    </html>
  );
}
