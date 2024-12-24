import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import './styles/globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pet dayCare app',
  description: 'Show pets the love they deserve at PetCare DayCare – where every tail wags with happiness!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-[#E5E8EC] min-h-screen`}
      >
        <SessionProvider> {children}</SessionProvider>
      </body>
    </html>
  );
}
