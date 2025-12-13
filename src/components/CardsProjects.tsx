"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Spotlight } from "@/components/ui/spotlight-new";
import Image from "next/image";

export function WobbleCardDemo() {
  const ref = useRef(null);

  // 🔁 Vincula o parallax ao scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Parallax suave de profundidade
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div
      ref={ref}
      className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center py-20 gap-8 overflow-hidden
                 bg-black/[0.96] antialiased bg-grid-white/[0.02] rounded-md"
    >
      {/* 🔥 Fundo animado Spotlight com parallax */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 -z-10"
      >
        <Spotlight />
      </motion.div>

      {/* 💡 Título da seção */}
      <h2 className="max-w-5xl text-center text-xl md:text-3xl lg:text-4xl font-bold text-neutral-100 font-sans px-4">
        A Lógica e o Brilho por trás da Esmeralda
      </h2>

      {/* 🧱 Cards com efeito glassmorphism */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-6 mt-10">
        {/* Card 1 */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 min-h-[320px] 
          bg-white/10 backdrop-blur-md ring-1 ring-white/10 
          shadow-[0_0_24px_rgba(0,0,0,0.25),_0_20px_60px_rgba(0,0,0,0.35)]
          text-white overflow-hidden relative rounded-3xl"
        >
          <div className="max-w-md z-10 relative">
            <h2 className="text-left text-balance text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight">
              Construindo o futuro com propósito e precisão.
            </h2>
            <p className="mt-4 text-left text-base text-neutral-300">
              A Esmeralda une lógica, design e automação para transformar
              sistemas complexos em soluções inteligentes e acessíveis.
            </p>
          </div>

          <Image
            src="/linear.webp"
            width={500}
            height={500}
            alt="Ilustração tecnológica"
            className="absolute -right-6 lg:-right-[30%] -bottom-10 object-contain opacity-70 rounded-2xl pointer-events-none"
          />
        </WobbleCard>

        {/* Card 2 */}
        <WobbleCard
          containerClassName="col-span-1 min-h-[300px] 
          bg-white/10 backdrop-blur-md ring-1 ring-white/10 
          shadow-[0_0_24px_rgba(0,0,0,0.25),_0_20px_60px_rgba(0,0,0,0.35)]
          text-white overflow-hidden relative rounded-3xl"
        >
          <div className="max-w-md z-10 relative">
            <h2 className="text-left text-balance text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight">
              Tecnologia com propósito.
            </h2>
            <p className="mt-4 max-w-md text-left text-base text-neutral-300">
              Nosso foco é desenvolver produtos que unem utilidade, impacto e
              estética — onde cada detalhe conta.
            </p>
          </div>
        </WobbleCard>

        {/* Card 3 */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 min-h-[380px] 
          bg-white/10 backdrop-blur-md ring-1 ring-white/10 
          shadow-[0_0_24px_rgba(0,0,0,0.25),_0_20px_60px_rgba(0,0,0,0.35)]
          text-white overflow-hidden relative rounded-3xl"
        >
          <div className="max-w-md z-10 relative">
            <h2 className="text-left text-balance text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight">
              Inovação que reflete clareza, lógica e impacto.
            </h2>
            <p className="mt-4 max-w-[30rem] text-left text-base text-neutral-300">
              Cada projeto é uma lapidação — da ideia à execução — onde o brilho
              está em transformar complexidade em clareza, e código em
              propósito.
            </p>
          </div>

          <Image
            src="/linear.webp"
            width={500}
            height={500}
            alt="Interface animada"
            className="absolute -right-10 md:-right-[30%] lg:-right-[20%] -bottom-10 object-contain opacity-70 rounded-2xl pointer-events-none"
          />
        </WobbleCard>
      </div>
    </div>
  );
}
