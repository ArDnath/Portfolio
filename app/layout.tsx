import type { Metadata } from "next";
import { VT323, Share_Tech_Mono } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-terminal',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tech',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Ariyaman Debnath – Portfolio",
  description: "Full-stack engineer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${vt323.variable} ${shareTechMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
