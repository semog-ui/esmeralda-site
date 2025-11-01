import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Console.Log da Imaginação",
    description:
      "Transformamos ideias em linhas de código que não apenas rodam, mas contam histórias. Cada commit é um pensamento traduzido em realidade digital.",
    link: "/sobre",
  },
  {
    title: "Algoritmo da Criatividade",
    description:
      "Não seguimos padrões prontos: escrevemos funções que pensam diferente, criando arquiteturas onde lógica e imaginação compilam juntas.",
    link: "/sobre",
  },
  {
    title: "Realidade Debugada",
    description:
      "Se a mente sonha, o código depura. Eliminamos bugs entre o possível e o impossível, até que a visão rode estável na tela da vida real.",
    link: "/sobre",
  },
  {
    title: "IDE da Consciência",
    description:
      "A Esmeralda é como um editor aberto: recebemos pensamentos brutos, aplicamos extensões humanas e exportamos experiências digitais imersivas.",
    link: "/sobre",
  },
  {
    title: "Loop Infinito de Inovação",
    description:
      "Cada projeto nasce em um while(true) de experimentos, erros e descobertas, até que a solução não seja só eficiente, mas também poética.",
    link: "/sobre",
  },
  {
    title: "Compilador de Mundos",
    description:
      "Nosso trabalho é compilar abstrações humanas em sistemas que respiram. O output? Ambientes virtuais onde a imaginação encontra a lógica.",
    link: "/sobre",
  },
];

