import { useEffect, useState } from "react";
import { TechniqueCategoryCard } from "@/components/TechniqueCategory/TechniqueCategoryCard";
import { fetchTechniqueCategories } from "@/actions/techniqueCategory";
import type { TechniqueCategory } from "@/types/techniques";
import { TechniqueCategoryModal } from "@/components/TechniqueCategory/TechniqueCategoryModal";
import { Toaster } from "sonner";

export function TechniqueCategories() {
  const [categories, setCategories] = useState<TechniqueCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTechniqueCategories()
      .then((data) => setCategories(data))
      .catch(() => setError("Erro ao carregar categorias"))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row p-6">
        <TechniqueCategoryModal
          onSuccess={() => {
            // atualiza a lista localmente ou refaz o fetch
            fetchTechniqueCategories().then(setCategories);
          }}
        />
        <Toaster />
      </div>
      <div className="flex flex-wrap gap-4 px-6">
        {categories.map((category) => (
          <TechniqueCategoryCard
            id={category.id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
