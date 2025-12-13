"use client";
import HeroPage from "@/components/HeroPage";
import { UserIcon } from "lucide-react";
import { TimelineDemo } from "@/components/TimelineAbout";
import dynamic from "next/dynamic";

const Logos07Page = dynamic(() => import("@/components/ui/logos-07"), {
  ssr: true,
});

export default function AboutPage() {
  return (
    <>
      <HeroPage
        title="Por trás do Código"
        description="A Esmeralda é o meu laboratório de consciência lógica -  uma linha de pensamento sobre como o mundo pode funcionar melhor."
        icon={<UserIcon />}
        imageSrc="/hero-sobre.webp"
      />

      <TimelineDemo />

      <div className="bg-cover bg-center">
        <Logos07Page />
      </div>
    </>
  );
}
