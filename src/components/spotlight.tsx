"use client";
import React, { useRef } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { CardHoverEffectDemo } from "@/components/CardEffect";
import CardHomeDemo from "@/components/CardHome";
import { motion, useScroll, useTransform } from "framer-motion";

export function SpotlightNewDemo() {
  const ref = useRef(null);

  // conecta scroll ao container principal
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // cria transformações para o parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <div
      ref={ref}
      className="relative z-10 h-[100rem] w-full rounded-md flex flex-col items-center justify-center gap-12 bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden"
    >
      {/* 🔥 Spotlight com efeito parallax */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 -z-10"
      >
        <Spotlight />
      </motion.div>
      <CardHomeDemo />

      <div className="text-center space-y-2">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Qual a Missão da Esmeralda?
        </h2>
      </div>

      {/* 🔽 Cards embaixo */}
      <CardHoverEffectDemo />
    </div>
  );
}
