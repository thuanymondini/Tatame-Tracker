import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { DailyWorkoutModal } from "./DailyWorkoutModal";
import { DeleteButton } from "../DeleteButton";
import { deleteDailyWorkout } from "@/actions/dailyWorkout";
import type { Technique } from "@/types/techniques";
import { toast } from "sonner";
import { formatInTimeZone } from "date-fns-tz/formatInTimeZone";
import { ptBR } from "date-fns/locale/pt-BR";

type Props = {
  id: number
  training_date: string
  observations: string|null
  techniques: Technique[],
  onReloadRequested: () => void
}

export function DailyWorkoutCard({id, training_date, observations, techniques, onReloadRequested} : Props) {

    async function onConfirmDeleteDailyWorkout(id: number) {
      try {
        await deleteDailyWorkout(id);
        toast.success("Treino deletado com sucesso!");
        onReloadRequested();
      } catch {
        toast.error("Não foi possível deletar o treino!");
      }
    }

    return (
        <Card key={id} className="w-64 h-full">
            <div className="flex flex-row px-2 justify-between">
                <DeleteButton title="Você tem certeza que deseja Deletar essa técnica?" description="Essa ação não pode ser desfeita." onConfirm={() => onConfirmDeleteDailyWorkout(id)}/>
                <DailyWorkoutModal
                  trigger={<Button variant="outline"><Pencil/></Button>}
                  dailyWorkout={{id, training_date, observations, techniques}}
                  onReloadRequested={onReloadRequested}
                >
                </DailyWorkoutModal>
            </div>
            <CardHeader>
              <CardTitle>{formatInTimeZone(training_date, "America/Sao_Paulo", "PPP", { locale: ptBR })}</CardTitle>
              {observations && (
                <CardDescription>{observations}</CardDescription>
              )}
              <CardContent>
                {techniques && (
                  <>
                    <p>Técnicas do treino:</p>
                    {techniques.map((technique) => (
                      <p key={technique.id}>{technique?.name}</p>
                    ))}
                  </>
                )}
              </CardContent>
            </CardHeader>
        </Card>
    )
}