import type { Metadata } from "next";
import { Inter } from "next/font/google";

import PostsProvider from "@/context/PostsContext";
import SnackbarContext from "@/context/SnackbarContext";

import { Header } from "@/components/Shared/Header";

import "./../styles/globals.css";

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
        <SnackbarContext>
          <PostsProvider>{children}</PostsProvider>
        </SnackbarContext>
      </body>
    </html>
  );
}
