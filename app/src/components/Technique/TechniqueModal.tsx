import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Technique, TechniqueCategory } from "@/types/techniques";
import { createTechnique, editTechnique, fetchTechniques } from "@/actions/technique";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchTechniqueCategories } from "@/actions/techniqueCategory";

interface TechniqueModalProps {
  onSuccess?: (data: { name: string; description: string|null; category_id: number; linked_technique: number|null }) => void;
  technique?: Technique,
  trigger?: React.ReactNode;
  onReloadRequested: () => void;
}

export function TechniqueModal({
  onSuccess,
  technique,
  trigger,
  onReloadRequested,
}: TechniqueModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(technique?.name ?? "");
  const [description, setDescription] = useState(technique?.description ?? "");
  const [categoryId, setCategoryId] = useState(technique?.category?.id ?? "");
  const [linkedTechnique, setLinkedTechnique] = useState(technique?.linked_technique?.id ?? "Nenhuma");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<TechniqueCategory[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {

      const isFormValid = await validateForm();
      if (!isFormValid) {
          setLoading(false);
          return;
      }

      if (technique?.id) {
        await editTechnique({id: technique.id, name, description, category_id: Number(categoryId), linked_technique: linkedTechnique == "Nenhuma" ? null :  Number(linkedTechnique)})
      } else {
        await createTechnique({ name, description, category_id: Number(categoryId), linked_technique: linkedTechnique == "Nenhuma" ? null :  Number(linkedTechnique)});
      }

      onSuccess?.({ name, description, category_id: Number(categoryId), linked_technique: linkedTechnique == "Nenhuma" ? null :  Number(linkedTechnique) });
      setOpen(false);
      setName("");
      setDescription("");
      toast.success(technique ? "Técnica Editada com sucesso!" : "Técnica criada com sucesso!")
      onReloadRequested();
    } catch {
      toast.error(technique ? "Não foi possível editar a técnica!" : "Não foi possível criar a técnica!")
      setOpen(false);
      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      fetchTechniqueCategories()
        .then((data) => setCategories(data))
        .catch(() => setError("Erro ao carregar categorias"))
        .finally(() => setLoading(false));

        fetchTechniques()
        .then((data) => setTechniques(data))
        .catch(() => setError("Erro ao carregar técnicas"))
        .finally(() => setLoading(false));
    }, []);

  useEffect(() => {
      if(open) {
        setCategoryId(technique?.category?.id.toString() ?? "");
        setLinkedTechnique(technique?.linked_technique?.id.toString() ?? "Nenhuma");
      }
    }, [open]);
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    async function validateForm() {
      if (!name) {
        toast.error("O nome da técnica é obrigatório!");
        return false;
      } else if (!categoryId) {
        toast.error("A categoria é obrigatória!");
        return false;
      }
      return true;
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline">Adicionar nova técnica</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
            {technique ? (<DialogTitle>Editar Técnica</DialogTitle>) : (<DialogTitle>Nova técnica</DialogTitle>)}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Cardio"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a técnica..."
              rows={3}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Categoria</Label>
            <Select onValueChange={(e) => {setCategoryId(e)}} value={categoryId}>
              <SelectTrigger className="w-[230px]">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem value={category.id.toString()}>{category.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Técnica relacionada</Label>
            <Select onValueChange={(e) => {setLinkedTechnique(e)}} value={linkedTechnique}>
              <SelectTrigger className="w-[295px]">
                <SelectValue placeholder="Selecione uma técnica relacionada" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectItem value="Nenhuma">Nenhuma</SelectItem>
                  {techniques.map((technique) => (
                    <SelectItem value={technique.id.toString()}>{technique.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}