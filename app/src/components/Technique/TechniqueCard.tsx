import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
// import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
// import { TechniqueModal } from "./TechniqueModal";
import { DeleteButton } from "../DeleteButton";
import { deleteTechnique } from "@/actions/technique";


type Props = {
    id: number
  name: string
  description?: string
  categoryName: string
  linkedTechniqueName?: string
}

export function TechniqueCard({id, name, description, categoryName, linkedTechniqueName} : Props) {
    return (
        <Card key={id} className="w-64 h-full">
            <div className="flex flex-row px-2 justify-between">
                <DeleteButton title="Você tem certeza que deseja Deletar essa técnica?" description="Essa ação não pode ser desfeita." onConfirm={() => deleteTechnique(id)}/>
                {/* <TechniqueModal trigger={<Button variant="outline"><Pencil/></Button>} category={{id, name, description}}>
                </TechniqueModal> */}
            </div>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
              <CardContent>
                <p>Categoria: {categoryName}</p>
                {linkedTechniqueName && (
                  <p>Técnica relacionada: {linkedTechniqueName}</p>
                )}
              </CardContent>
            </CardHeader>
        </Card>
    )
}