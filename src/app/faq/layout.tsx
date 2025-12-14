import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOGO,
} from "@/app/constants";

// 1. Geração de Metadata Dinâmico
export const metadata = constructMetadata({
  title: "FAQ",
  description:
    "Encontre respostas para as dúvidas mais comuns sobre desenvolvimento web, projetos, prazos, orçamentos e tecnologias utilizadas pela Esmeralda.",
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
  ],
  // Se tiver uma imagem específica para o FAQ, descomente:
  image: "/hero-faq.webp",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  // 2. Configuração do Schema (JSON-LD) para FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `Perguntas Frequentes - ${SITE_NAME}`,
    description:
      "Página de perguntas frequentes sobre desenvolvimento web, projetos e tecnologias utilizadas pela Esmeralda.",
    url: `${SITE_URL}/faq`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_LOGO}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/faq`,
    },
    // Perguntas Frequentes (Idealmente, isso viria do CMS, mas mantive estático conforme seu original)
    mainEntity: [
      {
        "@type": "Question",
        name: "Quais tecnologias a Esmeralda utiliza?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabalhamos principalmente com Next.js, React, TypeScript, Sanity.io, Tailwind CSS e outras tecnologias modernas para desenvolvimento web.",
        },
      },
      {
        "@type": "Question",
        name: "Como solicitar um orçamento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entre em contato através da nossa página de contato com detalhes do seu projeto para receber uma proposta personalizada.",
        },
      },
      {
        "@type": "Question",
        name: "Quais são os prazos médios para projetos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Os prazos variam conforme a complexidade do projeto, mas geralmente entre 2 a 8 semanas para a maioria dos projetos web.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
