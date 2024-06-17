import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import React from "react";

const inter = Montserrat({ subsets: [ "cyrillic", "latin" ] });

export const metadata: Metadata = {
  title: {
    default: "Платформа для тренировок",
    template: "%s | Платформа для тренировок"
  },
  description: "Поиск тренировочных курсов и их создание"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={ inter.className }>
    { children } { " " }
    <Toaster theme={ "system" } position={ "top-left" } duration={ 1500 } />
    </body>
    </html>
  );
}
