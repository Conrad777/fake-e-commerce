import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { PostHogProvider } from "./analytics/posthog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T-Shirt Store",
  description: "Shop the latest t-shirt designs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
