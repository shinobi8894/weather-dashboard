import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Dashboard - Real-time Weather Forecasts",
  description: "Beautiful, production-grade weather dashboard with real-time forecasts and dynamic theming",
  keywords: ["weather", "forecast", "dashboard", "real-time"],
  authors: [{ name: "Weather Dashboard" }],
  openGraph: {
    title: "Weather Dashboard",
    description: "Beautiful weather forecasts with dynamic theming",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
