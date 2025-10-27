import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

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
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
