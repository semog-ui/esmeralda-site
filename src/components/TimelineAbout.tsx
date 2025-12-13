"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import Perfil from "../../public/perfil-lucas.webp";
import { FloatingDockDemo } from "@/components/Float";
import { useState, useEffect } from "react";
import DottedGlowBackground from "@/components/ui/dotted-glow-background";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Link from "next/link";

interface JornadaItem {
  title: string;
  description: string;
}

export const Jornada = [
  {
    title:
      "Porque eu não queria apenas criar software — queria criar sistemas de pensamento.",
    description: "Transformando código em filosofia digital",
  },
  {
    title: "Porque a tecnologia é o novo alfabeto da consciência.",
    description: "Escrevendo o futuro com linhas de código",
  },
  {
    title: "Porque o caos da tecnologia precisava de sentido.",
    description: "Organizando a complexidade digital",
  },
  {
    title: "Porque a tecnologia é a nova forma de expressão artística.",
    description: "Codificação como arte contemporânea",
  },
  {
    title:
      "O nome Esmeralda carrega essa ideia: lapidar o bruto até ele brilhar.",
    description: "Da ideia bruta à solução polida",
  },
  {
    title: "Porque acredito que cada linha de código pode mudar uma realidade.",
    description: "Programação como instrumento de transformação social",
  },
];

function DottedGlowBackgroundDemoSecond() {
  return (
    <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-primary"
        glowColorDarkVar="--color-ring"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />

      <div className="relative z-10 flex w-full flex-col items-center justify-between space-y-6 px-8 py-16 text-center md:flex-row">
        <div>
          <h2 className="text-center text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl md:text-left dark:text-neutral-400">
            Pronto para explorar{" "}
            <span className="font-bold dark:text-white">nossos recursos</span>?
          </h2>
          <p className="mt-4 max-w-lg text-center text-base text-neutral-600 md:text-left dark:text-neutral-300">
            Descubra soluções inovadoras, componentes premium e ferramentas
            exclusivas para transformar suas ideias em realidade digital.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="default" className="text-sm" asChild>
            <Link href="/recursos">Ver Recursos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TimelineDemo() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [
    {
      title: "Quem Sou Eu?",
      content: (
        <div className="relative min-h-[500px] w-full">
          {/* Background com efeito glow */}
          <div className="absolute inset-0 -mx-8">
            <DottedGlowBackground
              className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
              opacity={1}
              gap={12}
              radius={1.8}
              colorLightVar="--color-neutral-400"
              glowColorLightVar="--color-neutral-500"
              colorDarkVar="--color-primary"
              glowColorDarkVar="--color-ring"
              backgroundOpacity={0}
              speedMin={0.2}
              speedMax={1.4}
              speedScale={1}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Container da Imagem - Mais elegante */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Moldura da imagem com gradiente */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>

                {/* Container principal da imagem */}
                <div className="relative bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-neutral-800 rounded-xl p-2 shadow-2xl">
                  <Image
                    src={Perfil}
                    alt="Lucas - Desenvolvedor & Criador da Esmeralda"
                    width={480}
                    height={640}
                    className="w-64 h-80 lg:w-72 lg:h-96 rounded-lg object-cover shadow-2xl transition-all duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay sutil na imagem */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg"></div>
                </div>

                {/* Floating Dock posicionado estrategicamente */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 transform transition-transform duration-300 group-hover:scale-110">
                  <FloatingDockDemo />
                </div>
              </div>
            </div>

            {/* Container do Texto - Mais organizado e profissional */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              {/* Conteúdo do texto com melhor hierarquia */}
              <div className="space-y-4 lg:space-y-6">
                <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Minha jornada
                    </span>
                    começou na adolescência, explorando o mundo digital. Por
                    anos, interagi com máquinas sem compreender sua linguagem,
                    até descobrir que é possível traduzir pensamentos abstratos
                    em soluções concretas através da programação.
                  </p>
                </div>

                <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm hover:shadow-md transition-all duration-300 mt-5">
                  <p className="text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Minha motivação
                    </span>
                    vai além do "gostar de programar". É sobre compreender como
                    cada linha de código pode criar padrões significativos,
                    transformar complexidade em clareza e construir sistemas que
                    não apenas funcionam, mas que carregam propósito e
                    significado.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button variant="default" className="text-sm" asChild>
                    <Link href="/perfil">Saiba Mais Sobre Mim</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Por Que Esmeralda?",
      content: (
        <div>
          <h3 className="mb-4 text-xs font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
            O significado por trás do nome
          </h3>
          <p className="text-sm md:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
            Porque ele representa clareza e brilho em meio à complexidade. Assim
            como uma esmeralda se destaca pela sua cor intensa e nitidez,
            buscamos criar soluções que iluminam processos obscuros e trazem
            transparência para sistemas complicados. O brilho, não é apenas
            estético, é a capacidade de traduzir lógica em valor real,
            transformar dados em decisões e ideias em ferramentas que funcionam.
          </p>
          <DottedGlowBackgroundDemoSecond />
        </div>
      ),
    },
    {
      title: "Inicio Da Jornada",
      content: (
        <div>
          <h3 className="mb-4 text-xs font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
            Por que inciei esse projeto?
          </h3>
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={Jornada} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
