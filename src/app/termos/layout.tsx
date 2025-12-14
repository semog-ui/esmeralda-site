import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_LOGO } from "@/app/constants";

// 1. Geração de Metadata Dinâmico
export const metadata = constructMetadata({
  title: "Política de Privacidade",
  description:
    "Conheça nossa Política de Privacidade. Saiba como a Esmeralda Company protege seus dados, utiliza cookies e garante sua segurança online.",
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
  ],
  // Se você tiver uma imagem específica, mantenha abaixo, senão o construtor usará a padrão (hero-home)
  image: "/og-termos.jpg",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Configuração do Schema (JSON-LD) para WebPage (Legal)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política de Privacidade",
    description: `Política de Privacidade e Termos de Uso da ${SITE_NAME}`,
    url: `${SITE_URL}/termos`,
    datePublished: "2025-10-04",
    dateModified: "2025-10-04",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_LOGO}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/termos`,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
