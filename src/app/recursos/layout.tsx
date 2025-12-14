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
  title: "Recursos",
  description:
    "Explore uma coleção de recursos cuidadosamente selecionados para aprimorar suas habilidades e conhecimentos em tecnologia e desenvolvimento.",
  keywords: [
    "recursos",
    "tecnologia",
    "desenvolvimento",
    "ferramentas",
    "tutoriais",
    "esmeralda company",
    "downloads",
    "assets",
  ],
  image: "/hero-recursos.webp", // Imagem específica desta seção
});

export default function RecursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Configuração do Schema (JSON-LD) para Coleção de Recursos
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Recursos - ${SITE_NAME}`,
    description:
      "Explore uma coleção de recursos cuidadosamente selecionados para aprimorar suas habilidades e conhecimentos em tecnologia e desenvolvimento.",
    url: `${SITE_URL}/recursos`,
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
      "@id": `${SITE_URL}/recursos`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
