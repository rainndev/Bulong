import { Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bulong - Anonymous Feedback Platform",
  description:
    "Bulong is an anonymous feedback platform that allows users to send and receive feedback without revealing their identity.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} font-fredoka h-full text-[#242731] antialiased`}
      >
        <div className="shadow-3xl h-full bg-linear-to-r from-violet-50 to-violet-200">
          {children}
        </div>
      </body>
    </html>
  );
}
