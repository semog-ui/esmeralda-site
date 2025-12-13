import { sanityFetch } from "@/lib/live";
import HeroPerfil from "@/components/HeroPerfil";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { AUTHOR_WITH_CONTENT_QUERY } from "@/sanity/queries/getAuthor";
import { Author, Post, Project } from "@/types/sanity";

interface AuthorProfile extends Author {
  posts: Post[];
  projects: Project[];
  postsCount: number;
  projectsCount: number;
  newsletterCount: number;
}

export default async function PagePerfil() {
  const result = await sanityFetch({
    query: AUTHOR_WITH_CONTENT_QUERY,
  });

  const author = result.data as AuthorProfile | null;

  if (!author) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Autor não encontrado</p>
      </div>
    );
  }

  return (
    <>
      <HeroPerfil author={author} />

      {/* Seção de Posts do Autor */}
      {author.posts && author.posts.length > 0 && (
        <section className="container mx-auto px-8 lg:px-48 py-16 mt-25">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Artigos de {author.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              Últimos artigos escritos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.posts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                imageSize={{ width: 400, height: 225 }}
                showExcerpt={true}
                showCategories={true}
                showAuthor={false}
                showDate={true}
                className="h-full"
              />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Projetos do Autor */}
      {author.projects && author.projects.length > 0 && (
        <section className="container mx-auto px-8 lg:px-48 py-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Projetos de {author.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              Projetos desenvolvidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Mensagem se não houver conteúdo */}
      {(!author.posts || author.posts.length === 0) &&
        (!author.projects || author.projects.length === 0) && (
          <section className="container mx-auto px-8 lg:px-48 py-16 -mt-80">
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nenhum conteúdo publicado ainda
              </h3>
              <p className="text-muted-foreground">
                {author.name} ainda não publicou nenhum artigo ou projeto.
              </p>
            </div>
          </section>
        )}
    </>
  );
}
