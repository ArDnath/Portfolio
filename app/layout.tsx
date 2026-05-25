import type { Metadata } from "next";
import { VT323, Share_Tech_Mono } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ProjectSelectionProvider } from "@/context/project-selection"
import { Footer } from "@/components/footer"
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
  const imagekitHost = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    ?.replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${vt323.variable} ${shareTechMono.variable}`}
    >
      <head>
        {imagekitHost ? (
          <link rel="preconnect" href={`https://${imagekitHost}`} crossOrigin="" />
        ) : null}
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ProjectSelectionProvider>
            {children}
            <Footer />
          </ProjectSelectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
