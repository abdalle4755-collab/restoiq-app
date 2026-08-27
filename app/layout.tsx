import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RestoIQ - Premium Restaurant OS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0e]">{children}</body>
    </html>
  );
}
