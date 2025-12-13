// src/components/SpotlightWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// Agora importamos a SEÇÃO, não o componente genérico
const MissaoHome = dynamic(
  () => import("./SectionMission").then((mod) => mod.MissaoHome),
  {
    ssr: false,
    loading: () => <div className="h-[50rem] w-full bg-black" />, // Ajustei a altura do loading
  }
);

export default function SpotlightWrapper() {
  return <MissaoHome />;
}
