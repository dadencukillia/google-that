import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  title: "Google",
  description: "Anime chan that helps you google your prompt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
