"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import Image from "next/image";

interface Category {
  title: string;
  slug: { current: string };
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  categories?: Category[];
  publishedAt: string;
  mainImage?: any;
  excerpt?: string;
  author?: { name: string; image?: any };
}

interface BlogCardProps {
  post: Post;
  imageSize?: { width: number; height: number };
  showExcerpt?: boolean;
  showCategories?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  className?: string;
}

export function BlogCard({
  post,
  imageSize = { width: 400, height: 225 },
  showExcerpt = true,
  showCategories = true,
  showAuthor = true,
  showDate = true,
  className = "",
}: BlogCardProps) {
  const getImageUrl = (image: any) => {
    if (!image) return null;
    try {
      const urlBuilder = urlFor(image);
      return (
        urlBuilder?.width(imageSize.width).height(imageSize.height).url() ||
        null
      );
    } catch (error) {
      console.error("Erro ao gerar URL da imagem:", error);
      return null;
    }
  };

  const getAuthorImageUrl = (author: any) => {
    if (!author?.image) return null;
    try {
      const urlBuilder = urlFor(author.image);
      return urlBuilder?.width(32).height(32).url() || null;
    } catch (error) {
      console.error("Erro ao gerar URL do autor:", error);
      return null;
    }
  };

  const imageUrl = getImageUrl(post.mainImage);
  const authorImageUrl = getAuthorImageUrl(post.author);

  return (
    <Card
      className={`shadow-none py-0 gap-3 hover:shadow-lg transition-all duration-300 group h-full flex flex-col ${className}`}
    >
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug}`} className="block">
          {imageUrl ? (
            <div className="aspect-video rounded-t-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={post.title}
                width={imageSize.width}
                height={imageSize.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Sem imagem</span>
            </div>
          )}
        </Link>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Categorias */}
        {showCategories && post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.categories
              .slice(0, 2)
              .map((category: Category, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {category.title}
                </Badge>
              ))}
            {post.categories.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{post.categories.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Título */}
        <Link href={`/blog/${post.slug}`} className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight line-clamp-2 hover:text-primary transition-colors mb-3">
            {post.title}
          </h3>
        </Link>

        {/* Resumo */}
        {showExcerpt && post.excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Autor e Data */}
        {(showAuthor || showDate) && (
          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            {showAuthor && (
              <div className="flex items-center gap-2">
                {authorImageUrl ? (
                  <div className="size-8 rounded-full overflow-hidden">
                    <Image
                      src={authorImageUrl}
                      alt={post.author?.name || "Autor"}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {post.author?.name?.charAt(0) || "E"}
                    </span>
                  </div>
                )}
                <span className="text-muted-foreground text-sm">
                  {post.author?.name || "Esmeralda Team"}
                </span>
              </div>
            )}

            {showDate && (
              <span className="text-muted-foreground text-sm">
                {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
