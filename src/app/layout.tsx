import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ask Diba AI | Resume Assistant",
  description: "Interactive AI-powered resume assistant for Diba Makki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
