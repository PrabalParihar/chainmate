import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrivyClientProvider } from "@/Providers/PrivyProvider";
import {Toaster} from "react-hot-toast"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChainMate",
  description: "Full form - Self-evolving Yottascale Network eXchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PrivyClientProvider>{children}</PrivyClientProvider>
        <Toaster/>
      </body>
    </html>
  );
}