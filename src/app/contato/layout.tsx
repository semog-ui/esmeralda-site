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
  title: "Contato",
  description:
    "Entre em contato com o laboratório Esmeralda. Estamos prontos para transformar suas ideias em soluções tecnológicas inovadoras.",
  // Keywords específicas desta página (serão mescladas com as globais)
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
  ],
  // Se tiver uma imagem específica de contato, descomente abaixo:
  image: "/hero-contato.webp",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Configuração do Schema (JSON-LD) para Página de Contato
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Página de Contato - ${SITE_NAME}`,
    description:
      "Entre em contato com o laboratório Esmeralda para projetos de desenvolvimento web e soluções tecnológicas.",
    url: `${SITE_URL}/contato`,
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
      "@id": `${SITE_URL}/contato`,
    },
    potentialAction: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
