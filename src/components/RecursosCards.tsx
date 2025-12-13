"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { PortableText } from "@portabletext/react";
import { Recurso } from "@/types/recursos";
import Image from "next/image";

interface RecursosCardsProps {
  recursos: Recurso[];
}

export function RecursosCards({ recursos }: RecursosCardsProps) {
  const [active, setActive] = useState<Recurso | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (!recursos || recursos.length === 0) {
    return (
      <div className="max-w-2xl mx-auto w-full text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Nenhum recurso disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[100] p-4">
            <motion.button
              key={`button-${active._id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg z-50"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active._id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] max-h-[85vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active._id}-${id}`}>
                <Image
                  width={200}
                  height={200}
                  src={active.mainImage.asset.url}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="flex-1 mr-4">
                    <motion.h3
                      layoutId={`title-${active._id}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active._id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base mt-1"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white whitespace-nowrap flex-shrink-0"
                  >
                    {active.ctaText || "Visitar"}
                  </motion.a>
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <PortableText value={active.content} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {recursos.map((recurso) => (
          <motion.div
            layoutId={`card-${recurso._id}-${id}`}
            key={recurso._id}
            onClick={() => setActive(recurso)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors duration-200"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${recurso._id}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={recurso.mainImage.asset.url}
                  alt={recurso.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${recurso._id}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {recurso.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${recurso._id}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base mt-1"
                >
                  {recurso.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
