import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: [ "cyrillic", "latin" ] });

export const metadata: Metadata = {
  title: "Платформа для тренировок",
  description: "Тренируйтесь и тренируйте других"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={ inter.className }>{ children }</body>
    </html>
  );
}
