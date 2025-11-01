// app/sobre/layout.tsx
import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  SITE_KEYWORDS,
  OPEN_GRAPH,
  TWITTER,
  ROBOTS_CONFIG
} from "@/app/constants";

export const metadata: Metadata = {
  title: `Sobre | ${SITE_NAME}`,
  description: "Conheça a história por trás da Esmeralda - laboratório de consciência lógica. Descubra nossa missão, valores e jornada em tecnologia e inovação.",
  keywords: [
    "sobre esmeralda",
    "história",
    "missão", 
    "valores",
    "laboratório tecnológico",
    "consciência lógica",
    "desenvolvimento",
    "inovação",
    "tecnologia",
    "portfolio",
    ...SITE_KEYWORDS
  ],
  openGraph: {
    ...OPEN_GRAPH,
    title: "Sobre | Por trás do Código",
    description: "Conheça a história e missão da Esmeralda - laboratório de consciência lógica.",
    url: `${SITE_URL}/sobre`,
    images: [
      {
        url: `${SITE_URL}/og-sobre.jpg`,
        width: 1200,
        height: 630,
        alt: "Sobre Esmeralda - Por trás do Código",
      },
    ],
  },
  twitter: {
    ...TWITTER,
    title: "Sobre | Por trás do Código",
    description: "Conheça a história e missão da Esmeralda - laboratório de consciência lógica.",
    images: [`${SITE_URL}/og-sobre.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/sobre`,
  },
  robots: ROBOTS_CONFIG,
};


export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Sobre a Esmeralda",
            "description": "Laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor.",
            "url": "https://esmeraldacompany.com.br/sobre", 
            "publisher": {
              "@type": "Organization",
              "name": "Esmeralda",
              "logo": {
                "@type": "ImageObject",
                "url": "https://esmeraldacompany.com.br/Esmeralda-logo.png" 
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage", 
              "@id": "https://esmeralda.dev/sobre"
            }
          })
        }}
      />
      {children}
    </>
  );
}