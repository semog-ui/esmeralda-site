// src/app/blog/page.tsx
import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import BlogClientPage from "@/components/BlogClientPage";
import { SITE_URL, SITE_NAME, SITE_LOGO } from "@/app/constants";

export const metadata = constructMetadata({
  title: "Blog",
  description:
    "Explore artigos técnicos, tendências de tecnologia, automação e inovação sustentável. Conteúdo especializado para desenvolvedores e entusiastas de tecnologia.",
  image: "/hero-blog.webp",
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
});

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${SITE_NAME}`,
    description:
      "Insights, tendências e conhecimento técnico sobre tecnologia, automação e inovação sustentável.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_LOGO}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogClientPage />
    </>
  );
}
