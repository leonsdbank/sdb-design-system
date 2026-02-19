import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "@sdb/ui — Web Playground",
  description: "Next.js playground for @sdb/ui design system components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
