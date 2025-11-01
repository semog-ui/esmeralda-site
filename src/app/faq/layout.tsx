// app/faq/layout.tsx
import { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  SITE_KEYWORDS,
  OPEN_GRAPH,
  TWITTER,
  ROBOTS_CONFIG
} from "@/app/constants";

export const metadata: Metadata = {
  title: `FAQ | ${SITE_NAME}`,
  description: "Encontre respostas para as dúvidas mais comuns sobre desenvolvimento web, projetos, prazos, orçamentos e tecnologias utilizadas pela Esmeralda.",
  keywords: [
    "faq",
    "perguntas frequentes",
    "dúvidas",
    "desenvolvimento web",
    "orçamento projetos",
    "prazos",
    "tecnologias",
    "next.js",
    "sanity.io",
    "suporte",
    "esmeralda company",
    ...SITE_KEYWORDS
  ],
  openGraph: {
    ...OPEN_GRAPH,
    title: "FAQ | Esmeralda - Perguntas Frequentes",
    description: "Respostas para dúvidas comuns sobre desenvolvimento web, projetos e tecnologias da Esmeralda.",
    url: `${SITE_URL}/faq`,
    images: [
      {
        url: `${SITE_URL}/og-faq.jpg`,
        width: 1200,
        height: 630,
        alt: "FAQ Esmeralda - Perguntas Frequentes",
      },
    ],
  },
  twitter: {
    ...TWITTER,
    title: "FAQ | Esmeralda - Perguntas Frequentes",
    description: "Respostas para dúvidas comuns sobre desenvolvimento web e projetos.",
    images: [`${SITE_URL}/og-faq.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  robots: ROBOTS_CONFIG,
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data para FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Perguntas Frequentes - Esmeralda Company",
            "description": "Página de perguntas frequentes sobre desenvolvimento web, projetos e tecnologias utilizadas pela Esmeralda.",
            "url": "https://esmeraldacompany.com.br/faq",
            "publisher": {
              "@type": "Organization",
              "name": "Esmeralda Company",
              "description": "Laboratório de consciência lógica e desenvolvimento tecnológico",
              "url": "https://esmeraldacompany.com.br",
              "logo": {
                "@type": "ImageObject",
                "url": "https://esmeraldacompany.com.br/Esmeralda-logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://esmeraldacompany.com.br/faq"
            },
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quais tecnologias a Esmeralda utiliza?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trabalhamos principalmente com Next.js, React, TypeScript, Sanity.io, Tailwind CSS e outras tecnologias modernas para desenvolvimento web."
                }
              },
              {
                "@type": "Question", 
                "name": "Como solicitar um orçamento?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Entre em contato através da nossa página de contato com detalhes do seu projeto para receber uma proposta personalizada."
                }
              },
              {
                "@type": "Question",
                "name": "Quais são os prazos médios para projetos?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "Os prazos variam conforme a complexidade do projeto, mas geralmente entre 2 a 8 semanas para a maioria dos projetos web."
                }
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}