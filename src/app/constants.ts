// src/constants.ts

// ===== INFORMAÇÕES DO SITE =====
export const SITE_NAME = "Esmeralda";
export const SITE_TITLE_DEFAULT = "Esmeralda - Um Novo Brilho, Um Novo Conceito";
export const SITE_TITLE_TEMPLATE = "%s | Esmeralda";
export const SITE_DESCRIPTION = "A Esmeralda é o meu laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor. Desenvolvimento, design e inovação em tecnologia.";
export const SITE_URL = "https://esmeraldacompany.com.br";
export const SITE_AUTHOR = "Lucas C. Gomes";
export const SITE_PUBLISHER = "Esmeralda Company";

// ===== INFORMAÇÕES DE CONTATO =====
export const EMAIL = "contato@esmeraldacompany.com.br";
export const GITHUB_URL = "https://github.com/seu-usuario";
export const LINKEDIN_URL = "https://linkedin.com/in/seu-perfil";
export const INSTAGRAM_URL = "https://instagram.com/seu-perfil";
export const SUBSTACK_URL = "https://seunewsletter.substack.com";
export const TWITTER_USERNAME = "@seuusuario";

// ===== CONFIGURAÇÕES DO SITE =====
export const SITE_LANGUAGE = "pt-BR";
export const SITE_LOCALE = "pt_BR";
export const SITE_TIMEZONE = "America/Sao_Paulo";

// ===== PALAVRAS-CHAVE PARA SEO =====
export const SITE_KEYWORDS = [
  "desenvolvimento web", 
  "tecnologia", 
  "inovação", 
  "design system", 
  "next.js", 
  "sanity.io",
  "portfolio",
  "projetos digitais",
  "laboratório tecnológico",
  "consciência lógica"
];

// ===== METADADOS PADRÃO =====
export const DEFAULT_META_TITLE = "Esmeralda - Um Novo Brilho, Um Novo Conceito";
export const DEFAULT_META_DESCRIPTION = SITE_DESCRIPTION;

// ===== OPEN GRAPH CONFIG =====
export const OPEN_GRAPH = {
  type: "website" as const,
  locale: SITE_LOCALE,
  url: SITE_URL,
  siteName: SITE_NAME,
  title: SITE_TITLE_DEFAULT,
  description: SITE_DESCRIPTION,
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Esmeralda - Laboratório de Consciência Lógica",
    },
  ],
};

// ===== TWITTER CONFIG =====
export const TWITTER = {
  card: "summary_large_image" as const,
  title: "Esmeralda - Laboratório de Consciência Lógica",
  description: "A Esmeralda é o meu laboratório de consciência lógica.",
  creator: TWITTER_USERNAME,
  images: ["/og-image.jpg"],
};

// ===== ROBOTS CONFIG =====
export const ROBOTS_CONFIG = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
  },
};

// ===== FAVICON CONFIG =====
export const FAVICON_CONFIG = {
  icon: '/logo-100.webp',
};

// ===== CORES DO TEMA =====
export const COLORS = {
  primary: "#0C523A", // Verde Esmeralda
  secondary: "#1a1a1a",
  accent: "#06D6A0",
  background: "#0a0a0a",
  text: "#ffffff"
};

// ===== URLS DE COMPARTILHAMENTO SOCIAL =====
export const SOCIAL_SHARE_URLS = {
  twitter: (url: string, text: string) => 
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  linkedin: (url: string, title: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
};

// ===== CONFIGURAÇÕES DE API =====
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api"
};

// ===== CONFIGURAÇÕES DE FORMATAÇÃO =====
export const FORMAT_DETECTION = {
  email: false,
  address: false,
  telephone: false,
};