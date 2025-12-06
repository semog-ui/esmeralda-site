"use client";
import { getRecursos } from "@/sanity/queries/getRecursos";
import HeroPage from "@/components/HeroPage";
import { FolderCode } from "lucide-react";
import { RecursosCards } from "@/components/RecursosCards";
import { Recurso } from "@/types/recursos";
import { useEffect, useState } from "react";

export default function RecursosPage() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecursos() {
      try {
        const data = await getRecursos();
        setRecursos(data);
      } catch (error) {
        console.error("Erro ao buscar recursos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecursos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando recursos...</p>
      </div>
    );
  }

  return (
    <>
      <HeroPage
        title="Recursos"
        description="Explore uma coleção de recursos cuidadosamente selecionados para aprimorar suas habilidades e conhecimentos."
        icon={FolderCode}
        imageSrc="/hero-recursos.jpg"
      />
      <div className="bg-cover bg-center mt-10 mb-10">
        <RecursosCards recursos={recursos} />
      </div>
    </>
  );
}
