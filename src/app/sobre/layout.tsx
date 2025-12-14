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
  title: "Sobre",
  description:
    "Conheça a história por trás da Esmeralda - laboratório de consciência lógica. Descubra nossa missão, valores e jornada em tecnologia e inovação.",
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
  ],
  image: "/hero-sobre.webp", // Imagem específica desta seção
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Configuração do Schema (JSON-LD) para Página Sobre
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Sobre a ${SITE_NAME}`,
    description:
      "Laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor.",
    url: `${SITE_URL}/sobre`,
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
      "@id": `${SITE_URL}/sobre`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
