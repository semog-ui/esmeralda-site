// ===== INFORMAÇÕES DO SITE =====
export const SITE_NAME = "Esmeralda Company";
export const SITE_TITLE_DEFAULT = "Esmeralda - Um Novo Brilho, Um Novo Conceito";
export const SITE_TITLE_TEMPLATE = "%s | Esmeralda";
export const SITE_DESCRIPTION = "A Esmeralda é o meu laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor. Desenvolvimento, design e inovação em tecnologia.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esmeraldacompany.com.br";
export const SITE_AUTHOR = "Lucas C. Gomes";
export const SITE_PUBLISHER = "Esmeralda Company";

// ===== MÍDIAS SOCIAIS E CONTATO =====
export const SOCIAL_TWITTER = "@esmeralda_co"; // Usado para Twitter Card
export const EMAIL = "contato@esmeraldacompany.com.br";
export const GITHUB_URL = "https://github.com/esmeraldacompany";
export const LINKEDIN_URL = "https://linkedin.com/company/esmeraldacompany";
export const INSTAGRAM_URL = "https://instagram.com/esmeralda.company";

// ===== ASSETS PADRÃO (SEO) =====
export const DEFAULT_OG_IMAGE = "/hero-home.webp"; // Imagem padrão de compartilhamento
export const SITE_LOGO = "/logo-100.webp"; // Logo padrão

// ===== CONFIGURAÇÕES DE SEO TÉCNICO =====
export const SITE_LANGUAGE = "pt-BR";
export const SITE_LOCALE = "pt_BR";
export const SITE_TIMEZONE = "America/Sao_Paulo";

// ===== PALAVRAS-CHAVE GLOBAIS =====
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

// ===== ROBOTS CONFIG (Para indexação) =====
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

// ===== CONFIGURAÇÕES DE DETECÇÃO =====
export const FORMAT_DETECTION = {
  email: false,
  address: false,
  telephone: false,
};

// ===== CORES DO TEMA (Útil para UI) =====
export const COLORS = {
  primary: "#0C523A", // Verde Esmeralda
  secondary: "#1a1a1a",
  accent: "#06D6A0",
  background: "#0a0a0a",
  text: "#ffffff"
};