// app/projetos/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Explore todos os projetos do laboratório Esmeralda. Desenvolvimento web, design system, automações e soluções tecnológicas inovadoras.",
  keywords: [
    "projetos",
    "portfólio",
    "cases",
    "desenvolvimento web",
    "next.js",
    "sanity.io",
    "design system",
    "automação",
    "soluções tecnológicas",
    "laboratório esmeralda",
  ],
  openGraph: {
    title: "Projetos",
    description:
      "Explore todos os projetos do laboratório Esmeralda. Desenvolvimento web, design system e soluções tecnológicas.",
    url: "/projetos",
    siteName: "Esmeralda",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-projetos.jpg",
        width: 1200,
        height: 630,
        alt: "Projetos Esmeralda - Portfólio e Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos",
    description: "Explore todos os projetos do laboratório Esmeralda.",
    images: ["/og-projetos.jpg"],
  },
  alternates: {
    canonical: "/projetos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projetos",
            description:
              "Portfólio de projetos de desenvolvimento web, design system e soluções tecnológicas do laboratório Esmeralda.",
            url: "https://esmeraldacompany.com.br/projetos",
            publisher: {
              "@type": "Organization",
              name: "Esmeralda",
              description:
                "Laboratório de consciência lógica e desenvolvimento tecnológico",
              logo: {
                "@type": "ImageObject",
                url: "https://esmeraldacompany.com.br/Esmeralda-logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://esmeralda.dev/projetos",
            },
            about: {
              "@type": "Thing",
              name: "Desenvolvimento Web",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
