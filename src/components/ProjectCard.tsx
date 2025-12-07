// components/ProjectCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, BriefcaseIcon } from "lucide-react";

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: string;
    mainImage?: any;
    categories?: Array<{ title: string; slug: string }>;
    body?: any;
    linkDemo?: string;
    linkGithub?: string;
    publishedAt?: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Função para obter a URL da imagem do Sanity
  const getImageUrl = (image: any): string | null => {
    if (!image) return null;

    // Se for uma string, retorna diretamente
    if (typeof image === "string") {
      return image.trim() !== "" ? image : null;
    }

    // Se for um objeto do Sanity, constrói a URL
    if (image.asset && image.asset._ref) {
      // Converte a referência do Sanity para URL
      const ref = image.asset._ref;
      const [file, id, dimensions, format] = ref.split("-");
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`;
    }

    // Se tiver URL diretamente
    if (image.url) {
      return image.url;
    }

    return null;
  };

  const imageUrl = getImageUrl(project.mainImage);

  const renderImage = () => {
    if (!imageUrl) {
      return (
        <div className="relative h-48 bg-muted flex items-center justify-center">
          <div className="text-muted-foreground text-center p-4">
            <BriefcaseIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Sem imagem</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    );
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {renderImage()}

      <CardHeader className="flex-grow">
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
        {project.categories && project.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category.title}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardFooter className="flex justify-between pt-4">
        <div className="flex gap-2">
          {project.linkDemo && (
            <Button size="sm" asChild>
              <a
                href={project.linkDemo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Demo
              </a>
            </Button>
          )}
          {project.linkGithub && (
            <Button size="sm" variant="outline" asChild>
              <a
                href={project.linkGithub}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-1" />
                Code
              </a>
            </Button>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/projetos/${project.slug}`}>Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
