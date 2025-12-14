import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { JsonLd } from "@/components/JsonLd"; // Componente novo
import { constructMetadata } from "@/lib/metadata"; // Construtor novo
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_LOGO,
  SOCIAL_TWITTER,
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  EMAIL,
} from "./constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Geração Automática de Metadata (Pega os padrões do constants.ts)
export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. Configuração do Schema Organization (Structured Data)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${SITE_LOGO}`,
    description: SITE_DESCRIPTION,
    email: EMAIL,
    sameAs: [
      // Tratamento para transformar @usuario em link do twitter se necessário
      SOCIAL_TWITTER.startsWith("@")
        ? `https://twitter.com/${SOCIAL_TWITTER.replace("@", "")}`
        : SOCIAL_TWITTER,
      GITHUB_URL,
      LINKEDIN_URL,
      INSTAGRAM_URL,
    ].filter(Boolean), // Remove links vazios
    contactPoint: {
      "@type": "ContactPoint",
      email: EMAIL,
      contactType: "customer support",
    },
  };

  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ErrorBoundary>
          {/* 3. Injeção do JSON-LD no Body */}
          <JsonLd data={jsonLd} />

          <NavbarDemo />
          <SmoothScroll>
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScroll>
        </ErrorBoundary>
      </body>
    </html>
  );
}
