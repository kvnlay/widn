import React from "react"
import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Women in Data Network | Empowering the Next Generation",
  description:
    "A global community empowering women in data science, analytics, engineering, and AI through mentorship, events, and resources.",
};

export const viewport: Viewport = {
  themeColor: "#1a9988",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
