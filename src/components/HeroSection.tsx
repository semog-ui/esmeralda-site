"use client";
import * as motion from "motion/react-client";
import { useScroll, useTransform, motion as m } from "framer-motion";
import { FlipWords } from "./ui/flip-words";
import Image from "next/image";
import Logo from "../../public/Esmeralda-logo.webp";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const ref = useRef(null);

  // pega progresso do scroll baseado no Hero
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // cria transformações: quanto mais scroll, mais mexe
  const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="w-full px-9 py-8 sm:py-12 md:py-16 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <m.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="relative overflow-hidden rounded-3xl 
             bg-white/10 backdrop-blur-md 
             text-white ring-1 ring-white/10 
             shadow-[0_0_24px_RGBA(0,0,0,0.25),_0_20px_60px_RGBA(0,0,0,0.35)]
             mx-auto w-[70%]"
        >
          {/* texto animado com parallax */}
          <m.div
            style={{ y: yText }}
            className="relative z-10 grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-3 md:p-12"
          >
            <div className="flex flex-col gap-5 md:pr-6">
              <p className="text-sm font-medium text-neutral-300">
                Onde a Criatividade se Encontra
              </p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Bem-vindo
                <br />
                <span className="text-neutral-200">Um Novo </span>
                <span className="inline-block text-amber-300">
                  <FlipWords words={["Brilho", "Conceito"]} />
                </span>
              </h2>
              <p className="max-w-prose text-neutral-300">
                Agora com espaço e desempenho para tudo que importa. Segurança,
                controle e simplicidade em um só lugar.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <HoverBorderGradient>
                  <Link href="/sobre">Sobre Esmeralda</Link>
                </HoverBorderGradient>

                <Link
                  href="/blog"
                  className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/20 transition-colors hover:bg-white/15"
                >
                  Posts
                </Link>
              </div>
            </div>
          </m.div>

          {/* imagem com efeito parallax oposto */}
          <m.div
            style={{ y: yImage }}
            className="pointer-events-none absolute inset-y-0 right-0 hidden md:flex items-center"
          >
            <Image src={Logo} alt="logo" width={250} height={250} />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
