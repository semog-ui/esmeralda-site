"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion as m } from "framer-motion";
import Image from "next/image"; // Importação essencial para performance

type HeroPageProps = {
  title: string;
  description: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  Icon?: React.ElementType;
  children?: React.ReactNode;
};

export default function HeroPage({
  title,
  description,
  imageSrc,
  icon,
  Icon,
  children,
}: HeroPageProps) {
  const ref = useRef(null);

  // 🎯 Scroll progress atrelado ao container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <m.header
      ref={ref}
      className="w-full px-9 py-20 sm:py-24 md:py-32 relative overflow-hidden"
      role="banner"
    >
      {/* OTIMIZAÇÃO DE PERFORMANCE: Substituição de background-image por Next/Image */}
      {imageSrc && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={imageSrc}
              alt={title}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-center brightness-50 blur-sm"
            />
          </div>
          {/* Mantém o overlay escuro para contraste do texto */}
          <div className="absolute inset-0 bg-black/40 z-0" />
        </>
      )}

      <div className="mx-auto max-w-7xl relative z-10">
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
            mx-auto w-[90%] md:w-[80%]"
        >
          {/* Texto com parallax */}
          <m.div
            style={{ y: yText }}
            className="relative z-10 grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-3 md:p-12"
          >
            <div className="flex flex-col gap-5 md:pr-6">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-prose text-neutral-300 text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </m.div>

          {/* Ícone animado no lado direito */}
          {(icon || Icon) && (
            <m.div
              style={{ y: yImage }}
              className="pointer-events-none absolute inset-y-0 right-0 hidden md:flex items-center justify-center w-1/2 opacity-30 md:opacity-100"
            >
              {/* Se for componente passado como <HeroPage Icon={User} /> */}
              {Icon && <Icon className="w-48 h-48 text-white/10 rotate-12" />}

              {/* Se for elemento passado como <HeroPage icon={<User />} /> */}
              {icon && (
                <div className="[&>svg]:w-48 [&>svg]:h-48 [&>svg]:text-white/10 [&>svg]:rotate-12">
                  {icon}
                </div>
              )}
            </m.div>
          )}
        </m.div>
        {children}
      </div>
    </m.header>
  );
}
