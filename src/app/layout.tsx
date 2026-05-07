import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swift Line Capital",
  description: "Loan origination and deal management portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-gray-50">{children}</body>
    </html>
  );
}
