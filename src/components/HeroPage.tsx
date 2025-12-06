"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion as m } from "framer-motion";
import { LucideIcon } from "lucide-react";

type HeroPageProps = {
  title: string;
  description: string;
  imageSrc?: string;
  icon?: LucideIcon | React.ElementType;
  children?: React.ReactNode;
};

export default function HeroPage({
  title,
  description,
  imageSrc,
  icon: Icon,
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
      className="w-full px-9 py-8 sm:py-12 md:py-16 relative overflow-hidden"
      role="banner"
    >
      {/* Background Image Logic */}
      {imageSrc && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50 blur-sm mt-10"
            style={{
              backgroundImage: `url('${imageSrc}')`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      <div className="mx-auto max-w-7xl relative mt-20">
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
          {/* Texto com parallax */}
          <m.div
            style={{ y: yText }}
            className="relative z-10 grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-3 md:p-12"
          >
            <div className="flex flex-col gap-5 md:pr-6">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-prose text-neutral-300">{description}</p>
            </div>
          </m.div>

          {/* Ícone animado no lado direito */}
          {Icon && (
            <m.div
              style={{ y: yImage }}
              className="pointer-events-none absolute inset-y-0 right-0 hidden md:flex items-center"
            >
              <Icon className="w-32 h-32 text-white/70 mr-10" />
            </m.div>
          )}
        </m.div>
        {children}
      </div>
    </m.header>
  );
}
