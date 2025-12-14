import { Metadata } from "next";
import { sanityFetch } from "@/lib/live";
import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/app/constants";
import { urlFor } from "@/lib/client";

// Definição da interface do Autor para TypeScript
interface AuthorData {
  name: string;
  bio?: any[];
  image?: any;
}

// Buscar dados do autor
async function getAuthorData(): Promise<AuthorData | null> {
  const result = await sanityFetch({
    query: `*[_type == "author"][0]{
      name,
      bio,
      image
    }`,
  });
  return result.data as AuthorData;
}

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorData();

  if (!author) {
    return constructMetadata({
      title: "Perfil não encontrado",
      description: "Página de perfil do autor não disponível.",
      noIndex: true,
    });
  }

  // Extrair texto do PortableText de forma simples (primeiro bloco)
  const bioText =
    author.bio?.[0]?.children?.[0]?.text ||
    "Conheça o autor por trás do laboratório Esmeralda. Descubra minha jornada, projetos e paixão por tecnologia e inovação.";

  const description = bioText.substring(0, 160);

  // Gerar URL da imagem do autor
  const imageUrl = author.image
    ? urlFor(author.image)?.width(1200).height(630).url()
    : undefined;

  return constructMetadata({
    title: `${author.name} - Perfil`,
    description: description,
    image: imageUrl, // Passa a imagem do autor para o card de compartilhamento
    type: "profile", // Tipo específico para perfis
    keywords: [
      "perfil",
      "autor",
      "sobre mim",
      "biografia",
      "desenvolvedor",
      "portfolio",
      author.name,
    ],
  });
}

export default async function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const author = await getAuthorData();

  // Se não tiver autor, renderiza apenas o conteúdo (erro tratado na página ou metadata)
  if (!author) return <>{children}</>;

  const imageUrl = author.image
    ? urlFor(author.image)?.width(800).height(800).url()
    : `${SITE_URL}/perfil-lucas.webp`;

  // Schema.org para Página de Perfil Pessoal
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      description:
        author.bio?.[0]?.children?.[0]?.text || "Desenvolvedor e Criador",
      image: imageUrl,
      url: `${SITE_URL}/perfil`,
      worksFor: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
