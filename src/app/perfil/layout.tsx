import { Metadata } from "next";
import { sanityFetch } from "@/lib/live";
import {
  SITE_NAME,
  SITE_URL,
  SITE_KEYWORDS,
  OPEN_GRAPH,
  TWITTER,
  ROBOTS_CONFIG
} from "@/app/constants";

// Buscar dados do autor para o metadata
async function getAuthorData() {
  const result = await sanityFetch({
    query: `*[_type == "author"][0]{
      name,
      bio,
      image
    }`
  });
  return result.data;
}

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorData();

  if (!author) {
    return {
      title: "Perfil - Autor não encontrado",
      description: "Página de perfil do autor",
    };
  }

  const bioText = author.bio?.[0]?.children?.[0]?.text || 
    "Conheça o autor por trás do laboratório Esmeralda. Descubra minha jornada, projetos e paixão por tecnologia e inovação.";

  const title = `${author.name} - Perfil | ${SITE_NAME}`;
  const description = bioText.substring(0, 160);

  return {
    title: title,
    description: description,
    keywords: [
      "perfil",
      "autor",
      "sobre mim",
      "biografia",
      "desenvolvedor",
      "portfolio",
      ...SITE_KEYWORDS
    ],
    openGraph: {
      ...OPEN_GRAPH,
      title: title,
      description: description,
      url: `${SITE_URL}/perfil`,
      type: "profile" as const,
      images: author.image ? [
        {
          url: author.image.asset?.url || `${SITE_URL}/og-perfil.jpg`,
          width: 1200,
          height: 630,
          alt: `${author.name} - Perfil`,
        }
      ] : [
        {
          url: `${SITE_URL}/og-perfil.jpg`,
          width: 1200,
          height: 630,
          alt: `${author.name} - Perfil`,
        }
      ],
    },
    twitter: {
      ...TWITTER,
      title: title,
      description: description,
      images: author.image ? 
        [author.image.asset?.url] : 
        [`${SITE_URL}/og-perfil.jpg`],
    },
    alternates: {
      canonical: `${SITE_URL}/perfil`,
    },
    robots: ROBOTS_CONFIG,
  };
}

interface PerfilLayoutProps {
  children: React.ReactNode;
}

export default function PerfilLayout({ children }: PerfilLayoutProps) {
  return children;
}