import type { Metadata } from "next";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/client";
import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/components/BlogCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Calendar, User, ArrowLeft } from "lucide-react";
import {
  POST_QUERY,
  RELATED_POSTS_QUERY,
  POST_METADATA_QUERY,
  RECENT_POSTS_QUERY,
} from "@/sanity/queries/postQueries";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Generate Metadata dinâmica
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_METADATA_QUERY, { slug });

  if (!post) {
    return {
      title: "Post Não Encontrado",
      description: "O post que você está procurando não foi encontrado.",
    };
  }

  // Construir URL da imagem
  const imageUrl = post?.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : "/og-blog.jpg";

  // Construir descrição (prioridade: excerpt > fallback)
  const description =
    post.excerpt ||
    `Confira o post "${post.title}" no blog da Esmeralda. ${post.categories?.[0]?.title ? `Categoria: ${post.categories[0].title}` : ""}`;

  // Construir keywords das categorias
  const keywords = [
    ...(post.categories?.map((cat: any) => cat.title) || []),
    "blog tecnologia",
    "desenvolvimento web",
    post.author?.name || "Esmeralda",
  ];

  return {
    title: `${post.title} | Blog Esmeralda`,
    description,
    keywords,
    authors: [{ name: post.author?.name || "Esmeralda" }],
    openGraph: {
      title: `${post.title} | Blog Esmeralda`,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "Esmeralda"],
      tags: post.categories?.map((cat: any) => cat.title) || [],
      url: `/blog/${slug}`,
      siteName: "Esmeralda",
      locale: "pt_BR",
      images: [
        {
          url: imageUrl!,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog Esmeralda`,
      description,
      images: [imageUrl!],
      creator: post.author?.name || "Esmeralda",
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Componente para renderizar imagens no PortableText
const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;

      const imageUrl = urlFor(value)
        ?.width(800)
        .height(600)
        .fit("max")
        .auto("format")
        .url();

      if (!imageUrl) return null;

      return (
        <div className="my-8 relative aspect-video max-w-4xl mx-auto">
          <Image
            src={imageUrl}
            alt={value.alt || "Imagem do post"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="rounded-lg object-cover"
          />
          {value.caption && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

// Componente para Structured Data
function PostStructuredData({ post }: { post: any }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.mainImage
      ? urlFor(post.mainImage)?.width(1200).height(630).url()
      : "https://esmeralda.dev/og-blog.jpg",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Esmeralda",
    },
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
      "@id": `https://esmeralda.dev/blog/${post.slug}`,
    },
    articleSection: post.categories?.[0]?.title || "Tecnologia",
    keywords:
      post.categories?.map((cat: any) => cat.title).join(", ") || "tecnologia",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Componente assíncrono para posts relacionados
async function RelatedPosts({
  currentSlug,
  categoryIds,
}: {
  currentSlug: string;
  categoryIds?: string[];
}) {
  let relatedPosts = [];

  if (categoryIds && categoryIds.length > 0) {
    relatedPosts = await client.fetch(RELATED_POSTS_QUERY, {
      currentSlug,
      categoryIds,
    });
  }

  // Fallback para posts recentes se não houver relacionados
  if (!relatedPosts || relatedPosts.length === 0) {
    relatedPosts = await client.fetch(RECENT_POSTS_QUERY, {
      currentSlug,
    });
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum post relacionado encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedPosts.map((relatedPost: any) => (
        <BlogCard
          key={relatedPost._id}
          post={relatedPost}
          imageSize={{ width: 400, height: 225 }}
          showExcerpt={true}
        />
      ))}
    </div>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug });

  const postImageUrl = post?.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(600).url()
    : null;

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/blog" className="hover:underline">
          ← Voltar para posts
        </Link>
        <h1 className="text-2xl font-bold mt-8">Post não encontrado</h1>
      </main>
    );
  }

  // Extract category IDs safely
  const categoryIds = post.categories?.map((cat: any) => cat._id) || [];

  return (
    <>
      <ReadingProgress />
      {/* Structured Data para SEO */}
      <PostStructuredData post={post} />

      {/* Header no padrão do site */}
      <header
        className="w-full px-9 py-8 sm:py-12 md:py-16 relative overflow-hidden"
        role="banner"
        aria-label={`Cabeçalho do post: ${post.title}`}
      >
        {/* Imagem de fundo com filtro */}
        {postImageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50 blur-sm"
            style={{
              backgroundImage: `url(${postImageUrl})`,
            }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50 blur-sm"
            style={{
              backgroundImage: "url('/hero-blog.webp')",
            }}
          />
        )}

        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Conteúdo */}
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-start">
            {/* 1. Título primeiro */}
            <div className="text-left mb-6 mt-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 mt-10">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-white/80 max-w-2xl">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* 2. Categorias, autor e data */}
            <div className="flex flex-col gap-4 mb-6">
              {/* Categorias */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category: any, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Autor e Data */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-3">
                  {post.author && (
                    <>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>por {post.author.name}</span>
                      </div>
                      <span className="text-white/40">•</span>
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Link "Voltar ao Blog" */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar ao Blog
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo do post */}
      <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-6">
        {/* Conteúdo do post com PortableText */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          {Array.isArray(post.body) && (
            <PortableText
              value={post.body}
              components={PortableTextComponents}
            />
          )}
        </article>

        {/* Posts Relacionados */}
        <section className="pt-16 mt-16 border-t border-border">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Posts Relacionados
            </h2>
            <p className="text-muted-foreground">
              Descubra mais conteúdos que podem te interessar
            </p>
          </div>

          {/* Componente assíncrono para posts relacionados */}
          <RelatedPosts currentSlug={post.slug} categoryIds={categoryIds} />
        </section>

        {/* Link para voltar ao blog */}
        <div className="flex justify-center pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group border border-border hover:border-foreground/30 rounded-lg px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Ver todos os posts do blog
          </Link>
        </div>
      </main>
    </>
  );
}
