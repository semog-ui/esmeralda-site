// app/blog/BlogClientPage.tsx (CLIENT COMPONENT)
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/client";
import { BlogCard } from "@/components/BlogCard";
import { PostsGridSkeleton } from "@/components/Skeletons";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, X, Filter, Search } from "lucide-react";
import HeroPage from "@/components/HeroPage";

import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/queries/postQueries";

// Interface para Posts
interface Post extends SanityDocument {
  title: string;
  slug: string;
  categories?: { title: string; slug: { current: string } }[];
  publishedAt: string;
  mainImage?: any;
  excerpt?: string;
  author?: { name: string; image?: any };
}

// Interface para Categorias
interface Category {
  title: string;
  slug: { current: string };
  _id: string;
}

const POSTS_PER_PAGE = 9;

export default function BlogClientPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  // Buscar dados iniciais
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          client.fetch<Post[]>(POSTS_QUERY),
          client.fetch<Category[]>(CATEGORIES_QUERY),
        ]);

        setAllPosts(postsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Filtrar posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt &&
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.categories &&
          post.categories.some((cat) =>
            cat.title.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesCategory =
        selectedCategory === "all" ||
        (post.categories &&
          post.categories.some((cat) => cat.title === selectedCategory));

      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchTerm, selectedCategory]);

  // Atualizar posts exibidos quando filtros mudarem
  useEffect(() => {
    setDisplayedPosts(filteredPosts.slice(0, POSTS_PER_PAGE));
    setPage(1);
    setHasMore(filteredPosts.length > POSTS_PER_PAGE);
  }, [filteredPosts]);

  // Carregar mais posts (infinite scroll)
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const startIndex = page * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const newPosts = filteredPosts.slice(startIndex, endIndex);

    if (newPosts.length > 0) {
      setDisplayedPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [page, filteredPosts, loadingMore, hasMore]);

  // Observer para infinite scroll
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, loadMorePosts]
  );

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all";

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="h-10 bg-muted rounded w-1/3 mb-8 animate-pulse"></div>
            <PostsGridSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroPage
        title="Blog"
        description="Insights, tendências e conhecimento técnico sobre tecnologia, automação e inovação sustentável."
        icon={Newspaper}
        imageSrc="/hero-blog.jpg"
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          {/* Filtros */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-card rounded-lg border p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Filtrar Posts</h2>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Limpar Filtros
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar posts por título, conteúdo ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categorias */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => setSelectedCategory("all")}
                >
                  Todos
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category._id}
                    variant={
                      selectedCategory === category.title
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => setSelectedCategory(category.title)}
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="max-w-6xl mx-auto">
            {/* Contador de resultados */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredPosts.length === 0 ? "Nenhum" : filteredPosts.length}
                {filteredPosts.length === 1
                  ? " post encontrado"
                  : " posts encontrados"}
                {hasActiveFilters && " com os filtros aplicados"}
              </p>
            </div>

            {/* Grid de Posts */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Nenhum post encontrado
                </h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar seus filtros ou termo de busca.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedPosts.map((post, index) => {
                    if (displayedPosts.length === index + 1) {
                      return (
                        <div key={post._id} ref={lastPostElementRef}>
                          <BlogCard post={post} />
                        </div>
                      );
                    }
                    return <BlogCard key={post._id} post={post} />;
                  })}
                </div>

                {/* Loading More */}
                {loadingMore && (
                  <div className="mt-8">
                    <PostsGridSkeleton />
                  </div>
                )}

                {/* No More Posts */}
                {!hasMore && displayedPosts.length > 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Você viu todos os posts!
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
