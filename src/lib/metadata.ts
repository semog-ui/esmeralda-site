import { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SOCIAL_TWITTER,
  DEFAULT_OG_IMAGE,
  ROBOTS_CONFIG,
  SITE_AUTHOR,
} from "@/app/constants";

// Definição do que você pode passar para a função (tudo opcional)
interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  authors?: Array<{ name: string; url?: string }>;
}

export function constructMetadata({
  title = SITE_NAME, // Se não passar título, usa o nome do site
  description = SITE_DESCRIPTION, // Se não passar descrição, usa a padrão
  image = DEFAULT_OG_IMAGE, // Se não passar imagem, usa a padrão (hero-home)
  icons = "/logo-100.webp", // Ícone padrão
  noIndex = false,
  keywords = [],
  type = "website",
  publishedTime,
  authors,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`, // Ex: "Sobre | Esmeralda Company"
    },
    description,
    keywords: [...SITE_KEYWORDS, ...keywords],
    authors: authors || [{ name: SITE_AUTHOR, url: SITE_URL }],
    creator: SITE_AUTHOR,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SOCIAL_TWITTER,
    },
    icons: {
      icon: icons,
      shortcut: icons,
      apple: icons,
    },
    // Controle de robôs (se noIndex for true, esconde do Google)
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : ROBOTS_CONFIG,
  };
}