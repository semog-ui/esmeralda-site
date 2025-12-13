"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";
import { Github, Linkedin, Instagram } from "lucide-react";

import { Author } from "@/types/sanity";

interface AuthorWithCounts extends Author {
  postsCount?: number;
  projectsCount?: number;
  newsletterCount?: number;
}

interface HeroPerfilProps {
  author: AuthorWithCounts;
}

// Componente personalizado para o ícone do Substack
const SubstackIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="currentColor"
      d="M22.539 8.242H1.46V5.406h21.08zM1.46 10.812V24L12 18.11L22.54 24V10.812zM22.54 0H1.46v2.836h21.08z"
    />
  </svg>
);

function HeroPerfil({ author }: HeroPerfilProps) {
  const bioText =
    author.bio?.[0]?.children?.[0]?.text || "Descrição não disponível";
  const imageUrl = author.image ? urlFor(author.image).url() : null;

  // Links das redes sociais ATUALIZADOS para usar dados do Sanity
  const socialLinks = [
    {
      name: "GitHub",
      url: author.socialLinks?.github || "https://github.com/seu-usuario",
      icon: Github,
      color: "hover:text-gray-400",
      enabled: !!author.socialLinks?.github,
    },
    {
      name: "LinkedIn",
      url: author.socialLinks?.linkedin || "https://linkedin.com/in/seu-perfil",
      icon: Linkedin,
      color: "hover:text-blue-400",
      enabled: !!author.socialLinks?.linkedin,
    },
    {
      name: "Instagram",
      url: author.socialLinks?.instagram || "https://instagram.com/seu-perfil",
      icon: Instagram,
      color: "hover:text-pink-400",
      enabled: !!author.socialLinks?.instagram,
    },
    {
      name: "Substack",
      url: author.socialLinks?.substack || "https://seunewsletter.substack.com",
      icon: SubstackIcon,
      color: "hover:text-orange-400",
      enabled: !!author.socialLinks?.substack,
    },
  ].filter((link) => link.enabled); // Filtra apenas links que existem no Sanity

  return (
    <>
      <header
        className="bg-gray-900 mb-50 relative bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: "url('/hero-perfil.jpg' )",
        }}
      >
        {/* Overlay escuro para melhor contraste do texto */}
        <div className="absolute inset-0 bg-black/50 brightness-50 blur-sm"></div>

        <div className="container mx-auto px-8 h-[22rem] lg:px-48 translate-y-64 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Lado esquerdo - Imagem e redes sociais */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              {imageUrl ? (
                <div className="relative group">
                  <Image
                    src={imageUrl}
                    alt={`Avatar de ${author.name}`}
                    width={160}
                    height={160}
                    className="w-40 h-40 rounded-xl object-cover border-2 border-white/20"
                    priority
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-xl bg-gray-700 flex items-center justify-center border-2 border-white/20">
                  <span className="text-white text-sm">Sem imagem</span>
                </div>
              )}

              {/* Ícones das redes sociais */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white/70 ${social.color} transition-all duration-300 transform hover:scale-110 p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20`}
                    aria-label={`Visite o ${social.name} de ${author.name}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Lado direito - Conteúdo */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  {author.name}
                </h2>
              </div>

              {/* Estatísticas */}
              <div className="flex items-center gap-8 mb-6">
                <div className="flex items-center gap-3 group cursor-default">
                  <span className="text-primary font-bold text-xl transition-colors">
                    {author.postsCount || 0}
                  </span>
                  <p className=" text-white font-bold transition-colors">
                    Posts
                  </p>
                </div>
                <div className="flex items-center gap-3 group cursor-default">
                  <span className="text-primary font-bold text-xl transition-colors">
                    {author.projectsCount || 0}
                  </span>
                  <p className=" text-white font-bold transition-colors ">
                    Projetos
                  </p>
                </div>
                <div className="flex items-center gap-3 group cursor-default">
                  <span className="text-primary font-bold text-xl transition-colors">
                    {author.newsletterCount || 0}
                  </span>
                  <p className=" text-white font-bold transition-colors ">
                    Newsletter
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-lg leading-relaxed bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                {bioText}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeroPerfil;
