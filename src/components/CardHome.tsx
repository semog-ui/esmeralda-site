"use client";
import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/client";
import { BlogCard } from "./BlogCard";
import { PostsGridSkeleton } from "./Skeletons";
import Link from "next/link";
import { Post } from "@/types/sanity";

interface CardHomeDemoProps {
  limit?: number;
  title?: string;
  showViewMore?: boolean;
  gridCols?: string;
}

export default function CardHomeDemo({
  limit = 3,
  title = "Posts Recentes",
  showViewMore = true,
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}: CardHomeDemoProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar posts do Sanity
  useEffect(() => {
    const fetchPosts = async () => {
      const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...${limit}]{
    _id, 
    title, 
    slug, 
    categories[]->{
      title,
      slug
    },
    publishedAt,
    mainImage,
    excerpt,
    author->{
      name,
      image
    }
  }`;

      try {
        const data = await client.fetch<Post[]>(POSTS_QUERY);
        setPosts(data || []);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  if (loading) {
    return <PostsGridSkeleton />;
  }

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto py-16 px-6 xl:px-0">
      {/* Cabeçalho opcional */}
      {title && (
        <div className="flex flex-col items-start justify-start pl-4 mx-auto max-w-7xl mb-8">
          <h2 className="text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            {title}
          </h2>

          {/* Link "Veja mais" opcional */}
          {showViewMore && (
            <div className="mt-2">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm md:text-base text-neutral-400 hover:text-white transition-all duration-300 group"
              >
                Veja mais
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                  {">"}
                </span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Grid de posts */}
      <div className={`grid ${gridCols} gap-6`}>
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
