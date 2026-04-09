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


type Props = {
    id: number
  name: string
  description?: string
}

export function TechniqueCategoryCard({id, name, description} : Props) {
    return (
        <Card key={id} className="w-64 h-full">
            <div className="flex flex-row px-2 justify-between">
                <DeleteButton title="Você tem certeza que deseja Deletar essa categoria?" description="Essa ação não pode ser desfeita." onConfirm={() => deleteTechniqueCategory(id)}/>
                <TechniqueCategoryModal trigger={<Button variant="outline"><Pencil/></Button>} category={{id, name, description}}>
                </TechniqueCategoryModal>
            </div>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}