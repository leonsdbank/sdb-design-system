import { RootProvider } from 'fumadocs-ui/provider/next';
import { Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: '@sdb/ui — Cross-Platform React Native Components',
  description:
    'A React Native component library powered by Uniwind. Write once with Tailwind CSS, deploy to iOS, Android, and Web.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} flex flex-col min-h-screen`}>
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
