import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bulong - Anonymous Feedback Platform",
  description:
    "Bulong is an anonymous feedback platform that allows users to send and receive feedback without revealing their identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} font-fredoka h-full text-black antialiased`}
      >
        <div className="shadow-3xl h-full bg-linear-to-r from-violet-50 to-violet-200">
          {children}
        </div>
      </body>
    </html>
  );
}
