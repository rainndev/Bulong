import { SettingsProvider } from "@/context/SettingsContext";
import { Fredoka, Kalam } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  weight: ["300", "400", "700"],
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
        className={`${fredoka.variable} ${kalam.variable} font-kalam h-full text-[#1f1c14] antialiased`}
      >
        <div className="h-full bg-[#fdfaf2]">
          <SettingsProvider>{children}</SettingsProvider>
        </div>
      </body>
    </html>
  );
}
