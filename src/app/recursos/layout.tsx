// app/recursos/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Explore uma coleção de recursos cuidadosamente selecionados para aprimorar suas habilidades e conhecimentos em tecnologia e desenvolvimento.",
  keywords: [
    "recursos",
    "tecnologia",
    "desenvolvimento",
    "ferramentas",
    "tutoriais",
    "Esmeralda",
  ],
  openGraph: {
    title: "Recursos",
    description:
      "Explore uma coleção de recursos cuidadosamente selecionados para aprimorar suas habilidades e conhecimentos.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RecursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
