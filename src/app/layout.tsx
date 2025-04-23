// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William Mabotja | Space Portfolio",
  description: "Interactive 3D space-themed portfolio for William Mabotja",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
