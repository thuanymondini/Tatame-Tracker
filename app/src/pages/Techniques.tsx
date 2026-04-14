import { useEffect, useState } from "react";
import { fetchTechniques } from "@/actions/technique";
import type { Technique } from "@/types/techniques";
import { TechniqueModal } from "@/components/Technique/TechniqueModal";
import { Toaster } from "sonner";
import { TechniqueCard } from "@/components/Technique/TechniqueCard";

export function Techniques() {
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTechniques = () => {
    fetchTechniques()
      .then((data) => setTechniques(data))
      .catch(() => setError("Erro ao carregar categorias"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTechniques();
  }, []);
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row p-6">
        <TechniqueModal
          onReloadRequested={() => {loadTechniques()}}
        />
        <Toaster />
      </div>
      <div className="flex flex-wrap gap-4 px-6">
        {techniques.map((technique) => (
          <TechniqueCard
            id={technique.id}
            name={technique.name}
            description={technique.description}
            category={technique.category}
            linkedTechnique={technique.linked_technique}
            onReloadRequested={() => {loadTechniques()}}
          />
        ))}
      </div>
    </div>
  );
}
