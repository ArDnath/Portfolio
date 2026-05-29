import type { Metadata } from "next";
import { VT323, Share_Tech_Mono } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { AppImageKitProvider } from "@/components/providers/imagekit-provider"
import { ProjectSelectionProvider } from "@/context/project-selection"
import { Footer } from "@/components/footer"
import { SITE_URL } from "@/lib/site"
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
  metadataBase: new URL(SITE_URL),
  title: "Ariyaman Debnath – Portfolio",
  description: "Full-stack engineer portfolio — projects, architecture, and shipped software.",
  openGraph: {
    title: "Ariyaman Debnath – Portfolio",
    description: "Full-stack engineer portfolio — projects, architecture, and shipped software.",
    url: SITE_URL,
    siteName: "Ariyaman Debnath",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ariyaman Debnath – Portfolio",
    description: "Full-stack engineer portfolio — projects, architecture, and shipped software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const imagekitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    ?.trim()
    .replace(/\/$/, "");
  const imagekitHost = imagekitEndpoint
    ?.replace(/^https?:\/\//, "");

  const appTree = (
    <ThemeProvider>
      <ProjectSelectionProvider>
        {children}
        <Footer />
      </ProjectSelectionProvider>
    </ThemeProvider>
  );

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
        {imagekitEndpoint ? (
          <AppImageKitProvider urlEndpoint={imagekitEndpoint}>
            {appTree}
          </AppImageKitProvider>
        ) : (
          appTree
        )}
      </body>
    </html>
  );
}
