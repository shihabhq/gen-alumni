"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BBA Alumni Network</title>
        <meta
          name="description"
          content="Connect with BBA General Department Alumni and Students"
        />
      </head>
      <body className={`font-sans antialiased bg-offwhite`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
