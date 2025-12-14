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
  title: "Projetos",
  description:
    "Explore todos os projetos do laboratório Esmeralda. Desenvolvimento web, design system, automações e soluções tecnológicas inovadoras.",
  keywords: [
    "projetos",
    "portfólio",
    "cases",
    "desenvolvimento web",
    "next.js",
    "sanity.io",
    "design system",
    "automação",
    "soluções tecnológicas",
    "laboratório esmeralda",
  ],
  image: "/hero-portfolio.webp", // Imagem específica desta seção
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Configuração do Schema (JSON-LD) para Coleção de Projetos
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Projetos - ${SITE_NAME}`,
    description:
      "Portfólio de projetos de desenvolvimento web, design system e soluções tecnológicas do laboratório Esmeralda.",
    url: `${SITE_URL}/projetos`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_LOGO}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/projetos`,
    },
    about: {
      "@type": "Thing",
      name: "Desenvolvimento Web",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
