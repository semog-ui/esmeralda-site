import type { Metadata } from "next";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/client";
import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/components/BlogCard";
import { Calendar, ArrowLeft } from "lucide-react";
import { PROJECT_METADATA_QUERY, PROJECT_QUERY, RELATED_PROJECTS_QUERY, RECENT_PROJECTS_QUERY } from "@/sanity/queries/getProjects";
import type { Project } from "@/types/project";
import {
  SITE_NAME,
  SITE_URL,
  SITE_KEYWORDS,
  OPEN_GRAPH,
  TWITTER,
  ROBOTS_CONFIG
} from "@/app/constants";


const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const project = await client.fetch(PROJECT_METADATA_QUERY, { slug });

  if (!project) {
    return {
      title: "Projeto Não Encontrado",
      description: "O projeto que você está procurando não foi encontrado.",
    };
  }

  // Garantir que imageUrl nunca seja undefined
  const imageUrl = project?.mainImage
    ? urlFor(project.mainImage)?.width(1200).height(630).url() || `${SITE_URL}/og-projetos.jpg`
    : `${SITE_URL}/og-projetos.jpg`;

  const description = `Confira o projeto ${project.title} ${
    project.categories?.[0]?.title ? `na categoria ${project.categories[0].title}` : ''
  }. ${project.linkDemo ? 'Demo disponível.' : ''}`;

  const fullTitle = `${project.title} | Projeto ${SITE_NAME}`;
  const fullUrl = `${SITE_URL}/projetos/${slug}`;

  // Garantir que temos arrays válidos para imagens
  const openGraphImages = [
    {
      url: imageUrl, // Agora imageUrl é garantidamente string
      width: 1200,
      height: 630,
      alt: project.title,
    },
  ];

  const twitterImages = [imageUrl]; // Agora imageUrl é garantidamente string

  return {
    title: fullTitle,
    description,
    keywords: [
      ...(project.categories?.map((cat: any) => cat.title) || []),
      "projeto",
      "desenvolvimento web",
      "portfolio",
      ...SITE_KEYWORDS
    ],
    openGraph: {
      ...OPEN_GRAPH,
      title: fullTitle,
      description,
      type: "article" as const,
      publishedTime: project.publishedAt,
      url: fullUrl,
      images: openGraphImages,
    },
    twitter: {
      ...TWITTER,
      title: fullTitle,
      description,
      images: twitterImages,
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: ROBOTS_CONFIG,
    other: {
      "og:site_name": SITE_NAME,
      "article:published_time": project.publishedAt,
      ...(project.linkDemo && { "og:see_also": project.linkDemo }),
      ...(project.linkGithub && { "og:see_also": project.linkGithub }),
    },
  };
}

// Componente para Structured Data
function ProjectStructuredData({ project }: { project: any }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": `Projeto ${project.title} do laboratório Esmeralda`,
    "image": project.mainImage
      ? urlFor(project.mainImage)?.width(1200).height(630).url()
      : "https://esmeralda.dev/og-projetos.jpg",
    "datePublished": project.publishedAt,
    "dateModified": project.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Esmeralda",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Esmeralda",
      "logo": {
        "@type": "ImageObject",
        "url": "https://esmeraldacompany.com.br/Esmeralda-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://esmeraldacompany.com.br/projetos/${project.slug}`
    },
    "genre": project.categories?.[0]?.title || "Desenvolvimento Web",
    "keywords": project.categories?.map((cat: any) => cat.title).join(", ") || "tecnologia",
    "url": `https://esmeraldacompany.com.br/projetos/${project.slug}`,
    ...(project.linkDemo && {
      "workExample": {
        "@type": "SoftwareSourceCode",
        "codeRepository": project.linkDemo,
        "programmingLanguage": "JavaScript",
        "runtimePlatform": "Web"
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Componentes customizados do PortableText
const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;

      const imageUrl = urlFor(value)?.width(800).height(600).fit("max").auto("format").url();

      if (!imageUrl) return null;

      return (
        <div className="my-8 relative aspect-video max-w-4xl mx-auto">
          <Image
            src={imageUrl}
            alt={value.alt || "Imagem do projeto"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="rounded-lg object-cover"
          />
          {value.caption && (
            <p className="text-center text-sm text-muted-foreground mt-2">{value.caption}</p>
          )}
        </div>
      );
    },
  },
};

// Component para projetos relacionados
async function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  let relatedProjects = await client.fetch(RELATED_PROJECTS_QUERY, { currentSlug });

  if (!relatedProjects || relatedProjects.length === 0) {
    relatedProjects = await client.fetch(RECENT_PROJECTS_QUERY, { currentSlug });
  }

  if (!relatedProjects || relatedProjects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum projeto relacionado encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedProjects.map((project: any) => (
        <BlogCard
          key={project._id}
          post={{
            ...project,
            slug: { current: project.slug },
            categories: project.categories?.map((cat: any) => ({
              title: cat.title,
              slug: { current: cat.slug }
            })) || []
          }}
          showExcerpt={true}
        />
      ))}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch<Project>(PROJECT_QUERY, { slug });

  const projectImageUrl = project?.mainImage
    ? urlFor(project.mainImage)?.width(1200).height(600).url()
    : null;

  if (!project) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/projetos" className="hover:underline">
          ← Voltar para projetos
        </Link>
        <h1 className="text-2xl font-bold mt-8">Projeto não encontrado</h1>
      </main>
    );
  }

  return (
    <>
      {/* Structured Data para SEO */}
      <ProjectStructuredData project={project} />

      {/* Header */}
      <header
        className="w-full px-9 py-8 sm:py-12 md:py-16 relative overflow-hidden"
        role="banner"
        aria-label={`Cabeçalho do projeto: ${project.title}`}
      >
        {projectImageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50 blur-sm"
            style={{ backgroundImage: `url(${projectImageUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50 blur-sm"
            style={{ backgroundImage: "url('/hero-portfolio.jpg')" }}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 mt-10">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.categories?.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm"
                >
                  {cat.title}
                </span>
              ))}
            </div>
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para Projetos
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo do projeto */}
      <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-6">
        <article className="prose prose-lg max-w-none dark:prose-invert">
          {Array.isArray(project.body) && (
            <PortableText value={project.body} components={PortableTextComponents} />
          )}
        </article>

        {/* Links do projeto */}
        {(project.linkDemo || project.linkGithub) && (
          <div className="flex gap-4 mt-8">
            {project.linkDemo && (
              <a
                href={project.linkDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Ver Demo
              </a>
            )}
            {project.linkGithub && (
              <a
                href={project.linkGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg hover:bg-accent transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Ver Código
              </a>
            )}
          </div>
        )}

        {/* Projetos Relacionados */}
        <section className="pt-16 mt-16 border-t border-border">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Projetos Relacionados</h2>
            <p className="text-muted-foreground">
              Descubra mais projetos que podem te interessar
            </p>
          </div>
          <RelatedProjects currentSlug={project.slug.current} />
        </section>
        <div className="flex justify-center pt-8">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group border border-border hover:border-foreground/30 rounded-lg px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Ver todos os projetos
          </Link>
        </div>
      </main>
    </>
  );
}