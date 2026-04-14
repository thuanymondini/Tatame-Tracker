import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { TechniqueCategoryModal } from "./TechniqueCategoryModal";
import { DeleteButton } from "../DeleteButton";
import { deleteTechniqueCategory } from "@/actions/techniqueCategory";
import { toast } from "sonner";


type Props = {
    id: number
  name: string
  description: string | null
  onReloadRequested: () => void
}

export function TechniqueCategoryCard({id, name, description, onReloadRequested} : Props) {

    async function onConfirmDeleteTechniqueCategory(id: number) {
      try {
        await deleteTechniqueCategory(id);
        toast.success("Categoria deletada com sucesso!");
        onReloadRequested();
      } catch {
        toast.error("Não foi possível deletar a categoria!");
      }
    }

    return (
        <Card key={id} className="w-64 h-full">
            <div className="flex flex-row px-2 justify-between">
                <DeleteButton title="Você tem certeza que deseja Deletar essa categoria?" description="Essa ação não pode ser desfeita." onConfirm={() => onConfirmDeleteTechniqueCategory(id)}/>
                <TechniqueCategoryModal 
                  trigger={<Button variant="outline"><Pencil/></Button>} 
                  category={{id, name, description}} 
                  onReloadRequested={onReloadRequested}
                >
                </TechniqueCategoryModal>
            </div>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}