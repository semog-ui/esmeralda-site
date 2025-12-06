"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { CloudAlert } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <HeroPage
        title="Página não encontrada"
        description="Oops! A página que você tentou acessar não existe ou foi movida."
        icon={CloudAlert}
        imageSrc="/not-found-img.jpg"
      >
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/">
            <Button className="cursor-pointer">Voltar para Home</Button>
          </Link>

          <Link href="/contato">
            <Button
              variant="ghost"
              className="flex cursor-pointer items-center gap-1"
            >
              <span>Contato</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </HeroPage>
    </>
  );
}
