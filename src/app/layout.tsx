import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CursorAura from './components/CursorAura';
import RouteTransition from './components/RouteTransition';
import BackgroundWrapper from './components/BackgroundWrapper';
import { SplineProvider } from './contexts/SplineContext';

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
        <SplineProvider>
          <BackgroundWrapper />
          <CursorAura />
          <RouteTransition>
            {children}
          </RouteTransition>
        </SplineProvider>
      </body>
    </html>
  );
}