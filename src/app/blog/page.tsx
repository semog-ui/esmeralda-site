// app/blog/page.tsx
import type { Metadata } from "next";
import BlogClientPage from "@/components/BlogClientPage";

// Metadata para SEO (apenas no server component)
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore artigos técnicos, tendências de tecnologia, automação e inovação sustentável. Conteúdo especializado para desenvolvedores e entusiastas de tecnologia.",
  keywords: [
    "blog tecnologia",
    "desenvolvimento web",
    "next.js",
    "sanity.io",
    "automação",
    "inovação sustentável",
    "tendências tech",
    "tutoriais programação",
  ],
  openGraph: {
    title: "Blog",
    description:
      "Artigos técnicos, tendências de tecnologia e inovação sustentável.",
    url: "/blog",
    siteName: "Esmeralda",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog  - Insights e Conhecimento Técnico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Artigos técnicos, tendências de tecnologia e inovação sustentável.",
    images: ["/og-blog.jpg"],
  },
  alternates: {
    canonical: "/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured Data como componente separado
function BlogStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Esmeralda",
    description:
      "Insights, tendências e conhecimento técnico sobre tecnologia, automação e inovação sustentável.",
    url: "https://esmeralda.dev/blog",
    publisher: {
      "@type": "Organization",
      name: "Esmeralda",
      logo: {
        "@type": "ImageObject",
        url: "https://esmeralda.dev/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://esmeralda.dev/blog",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function BlogPage() {
  return (
    <>
      <BlogStructuredData />
      <BlogClientPage />
    </>
  );
}
