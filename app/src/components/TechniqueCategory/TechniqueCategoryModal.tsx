// components/TechniqueCategoryModal.tsx
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
import type { TechniqueCategory } from "@/types/techniques";
import { createTechniqueCategory, editTechniqueCategory } from "@/actions/techniqueCategory";
import { toast } from "sonner";

interface TechniqueCategoryModalProps {
  onSuccess?: (data: { name: string; description: string }) => void;
  category?: TechniqueCategory,
  trigger?: React.ReactNode;
  onReloadRequested: () => void;
}

export function TechniqueCategoryModal({
  onSuccess,
  category,
  trigger,
  onReloadRequested,
}: TechniqueCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(open) {
      setName(category?.name ?? "");
      setDescription(category?.description ?? "");
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {

      const isFormValid = await validateForm();
      if (!isFormValid) {
          setLoading(false);
          return;
      }

      if (category?.id) {
            await editTechniqueCategory({id: category.id, name, description})
      } else {
          await createTechniqueCategory({ name, description });
      }

      onSuccess?.({ name, description });
      setOpen(false);
      setName("");
      setDescription("");
      toast.success(category ? "Categoria Editada com sucesso!" : "Categoria criada com sucesso!")
      onReloadRequested();
    } catch {
      toast.error(category ? "Não foi possível editar a categoria!" : "Não foi possível criar a categoria!")
      setOpen(false);
      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  }

  async function validateForm() {
    if (!name) {
      toast.error("O nome da categoria de técnica é obrigatório!");
      return false;
    }
    return true;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline">Adicionar nova categoria de técnica</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
            {category ? (<DialogTitle>Editar Categoria</DialogTitle>) : (<DialogTitle>Nova categoria de técnica</DialogTitle>)}
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
              placeholder="Descreva a categoria..."
              rows={3}
            />
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