import { Metadata } from "next";
import {
  SITE_URL,
  SITE_KEYWORDS,
  OPEN_GRAPH,
  TWITTER,
  ROBOTS_CONFIG,
} from "@/app/constants";

export const metadata: Metadata = {
  title: `Contato`,
  description:
    "Entre em contato com o laboratório Esmeralda. Estamos prontos para transformar suas ideias em soluções tecnológicas inovadoras.",
  keywords: [
    "contato",
    "orçamento",
    "desenvolvimento web",
    "consultoria",
    "projetos",
    "colaboração",
    "tecnologia",
    "inovação",
    "esmeralda contato",
    "orçamento projeto",
    ...SITE_KEYWORDS,
  ],
  openGraph: {
    ...OPEN_GRAPH,
    title: "Contato",
    description:
      "Entre em contato com o laboratório Esmeralda para desenvolver soluções tecnológicas inovadoras.",
    url: `${SITE_URL}/contato`,
    images: [
      {
        url: `${SITE_URL}/og-contato.jpg`,
        width: 1200,
        height: 630,
        alt: "Contato Esmeralda",
      },
    ],
  },
  twitter: {
    ...TWITTER,
    title: "Contato",
    description:
      "Entre em contato com o laboratório Esmeralda para desenvolver soluções tecnológicas.",
    images: [`${SITE_URL}/og-contato.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/contato`,
  },
  robots: ROBOTS_CONFIG,
};

export default function ContactLayout({
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
            "@type": "ContactPage",
            name: "Página de Contato - Esmeralda",
            description:
              "Entre em contato com o laboratório Esmeralda para projetos de desenvolvimento web e soluções tecnológicas.",
            url: "https://esmeraldacompany.com.br/contato",
            publisher: {
              "@type": "Organization",
              name: "Esmeralda",
              description:
                "Laboratório de consciência lógica e desenvolvimento tecnológico",
              logo: {
                "@type": "ImageObject",
                url: "https://esmeraldacompany.com.br/Esmeralda-logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://esmeraldacompany.com.br/contato",
            },
            potentialAction: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: "Portuguese",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
