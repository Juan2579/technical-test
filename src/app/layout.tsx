import type { Metadata } from "next";
import { Inter } from "next/font/google";

import PostsProvider from "@/context/PostsContext";
import { Header } from "@/components/Shared/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevsPost",
  description: "Website created for devs to share their most amazing ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <PostsProvider>{children}</PostsProvider>
      </body>
    </html>
  );
}
