import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Spline from '@splinetool/react-spline/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Om Shastri",
  description: "Welcome to the personal website of Om Shastri, a tech enthusiast.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body style={{ backgroundColor: 'black' }}>
        <Spline
          scene="https://prod.spline.design/Fm2oH0q1qSQyzm0J/scene.splinecode"
          className="fixed top-0 left-0 w-full h-full -z-20"
        />
        {children}
      </body>
    </html>
  );
}
