import { type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBA GEN Student and Alumni Connect",
  description:
    "The official Alumni and student connection database of bup bba students.",
  keywords: [
    "BBA Gen",
    "BUP BBA",
    "BBA general",
    "bba general",
    "bba",
    "bba gen",
    "bup iba",
    "BUP IBA",
  ],
  authors: [{ name: "BBA General" }],
  openGraph: {
    title: "BBA General",
    description:
      "The official Alumni and student database of bup bba students.",
    url: "https://www.bbagen.com",
    type: "website",
    images: [
      {
        url: "https://bup.edu.bd/public/frontend/assets/img/bup/logo.svg",
        width: 1200,
        height: 630,
        alt: "bba gen",
      },
    ],
  },
};

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
