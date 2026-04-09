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

  useEffect(() => {
    fetchTechniques()
      .then((data) => setTechniques(data))
      .catch(() => setError("Erro ao carregar categorias"))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row p-6">
        <TechniqueModal
          onSuccess={() => {
            // atualiza a lista localmente ou refaz o fetch
            fetchTechniques().then(setTechniques);
          }}
        />
        <Toaster />
      </div>
      <div className="flex flex-wrap gap-4 px-6">
        {techniques.map((technique) => (
          <TechniqueCard
            id={technique.id}
            name={technique.name}
            description={technique.description}
            categoryName={technique.category.name}
            linkedTechniqueName={technique.linked_technique ? technique.linked_technique.name : ""}
          />
        ))}
      </div>
    </div>
  );
}
