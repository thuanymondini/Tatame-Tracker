import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { TechniqueModal } from "./TechniqueModal";
import { DeleteButton } from "../DeleteButton";
import { deleteTechnique } from "@/actions/technique";
import type { Technique, TechniqueCategory } from "@/types/techniques";
import { toast } from "sonner";


type Props = {
  id: number
  name: string
  description?: string|null
  category: TechniqueCategory
  linkedTechnique: Technique | null
  onReloadRequested: () => void
}

export function TechniqueCard({id, name, description, category, linkedTechnique, onReloadRequested} : Props) {

    async function onConfirmDeleteTechnique(id: number) {
      try {
        await deleteTechnique(id);
        toast.success("Técnica deletada com sucesso!");
        onReloadRequested();
      } catch {
        toast.error("Não foi possível deletar a técnica!");
      }
    }

    return (
        <Card key={id} className="w-64 h-full">
            <div className="flex flex-row px-2 justify-between">
                <DeleteButton title="Você tem certeza que deseja Deletar essa técnica?" description="Essa ação não pode ser desfeita." onConfirm={() => onConfirmDeleteTechnique(id)}/>
                <TechniqueModal
                  trigger={<Button variant="outline"><Pencil/></Button>}
                  technique={{id, name, description: description ?? "", category, linked_technique: linkedTechnique}} 
                  onReloadRequested={onReloadRequested}>
                </TechniqueModal>
            </div>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
              <CardContent>
                <p>Categoria: {category?.name}</p>
                {linkedTechnique && (
                  <p>Técnica relacionada: {linkedTechnique?.name}</p>
                )}
              </CardContent>
            </CardHeader>
        </Card>
    )
}