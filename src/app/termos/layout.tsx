// app/termos-e-condicoes/layout.tsx
import type { Metadata } from "next";

import {
  SITE_URL,
  SITE_KEYWORDS,
  OPEN_GRAPH,
  TWITTER,
  ROBOTS_CONFIG,
} from "../constants";

// import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Conheça nossa Política de Privacidade. Saiba como a Esmeralda Company protege seus dados, utiliza cookies e garante sua segurança online. Última atualização: 4 de Outubro de 2025.",
  keywords: [
    "política de privacidade",
    "termos de uso",
    "proteção de dados",
    "LGPD",
    "cookies",
    "segurança online",
    "privacidade digital",
    "esmeralda company",
    "termos e condições",
    "proteção de dados pessoais",
    ...SITE_KEYWORDS,
  ],
  openGraph: {
    ...OPEN_GRAPH,
    title: "Política de Privacidade",
    description:
      "Política de Privacidade da Esmeralda Company - Proteção de dados, cookies e segurança online.",
    url: `${SITE_URL}/termos-e-condicoes`,
    images: [
      {
        url: `${SITE_URL}/og-termos.jpg`,
        width: 1200,
        height: 630,
        alt: "Política de Privacidade - Esmeralda Company",
      },
    ],
  },
  twitter: {
    ...TWITTER,
    card: "summary" as const,
    title: "Política de Privacidade",
    description: "Conheça nossa Política de Privacidade e Termos de Uso.",
    images: [`${SITE_URL}/og-termos.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/termos-e-condicoes`,
  },
  robots: {
    ...ROBOTS_CONFIG,
    follow: false, // Páginas de termos geralmente não devem ser seguidas
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data para Política de Privacidade */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Política de Privacidade",
            description:
              "Política de Privacidade e Termos de Uso da Esmeralda Company",
            url: "https://esmeraldacompany.com.br/termos-e-condicoes",
            datePublished: "2025-10-04",
            dateModified: "2025-10-04",
            publisher: {
              "@type": "Organization",
              name: "Esmeralda Company",
              url: "https://esmeraldacompany.com.br",
              logo: {
                "@type": "ImageObject",
                url: "https://esmeraldacompany.com.br/Esmeralda-logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://esmeraldacompany.com.br/termos-e-condicoes",
            },
            about: {
              "@type": "Thing",
              name: "Política de Privacidade",
            },
            isPartOf: {
              "@type": "WebSite",
              name: "Esmeralda Company",
              url: "https://esmeraldacompany.com.br",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
