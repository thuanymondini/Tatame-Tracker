import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Technique, DailyWorkout } from "@/types/techniques";
import { createDailyWorkout, editDailyWorkout } from "@/actions/dailyWorkout";
import { toast } from "sonner";
import { fetchTechniques } from "@/actions/technique";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { parseISO, format } from "date-fns";
import React from "react";
import { MultiSelect } from "../ui/multi-select";
import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

interface DailyWorkoutModalProps {
  onSuccess?: (data: { training_date: string; observations: string|null; techniques: number[] }) => void;
  dailyWorkout?: DailyWorkout,
  trigger?: React.ReactNode;
  onReloadRequested: () => void;
}

export function DailyWorkoutModal({
  onSuccess,
  dailyWorkout,
  trigger,
  onReloadRequested,
}: DailyWorkoutModalProps) {
  const [open, setOpen] = useState(false);
  const [trainingDate, setTrainingDate] = useState(dailyWorkout?.training_date ?? "");
  const [observations, setObservations] = useState(dailyWorkout?.observations ?? "");
  const [techniquesId, setTechniquesId] = useState<number[]>(
    dailyWorkout?.techniques?.map((t: Technique) => t.id) ?? []
  );
  const [loading, setLoading] = useState(false);
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

      if (dailyWorkout?.id) {
            await editDailyWorkout({id: dailyWorkout.id, training_date: trainingDate, observations, techniques: techniquesId})
      } else {
          await createDailyWorkout({training_date: trainingDate, observations, techniques: techniquesId});
      }

      onSuccess?.({training_date: trainingDate, observations, techniques: techniquesId});
      setOpen(false);
      setTrainingDate("");
      setObservations("");
      setTechniquesId([]);
      toast.success(dailyWorkout ? "Técnica Editada com sucesso!" : "Técnica criada com sucesso!")
      onReloadRequested();
    } catch {
      toast.error(dailyWorkout ? "Não foi possível editar a técnica!" : "Não foi possível criar a técnica!")
      setOpen(false);
      setTrainingDate("");
      setObservations("");
      setTechniquesId([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
        fetchTechniques()
        .then((data) => setTechniques(data))
        .catch(() => setError("Erro ao carregar técnicas"))
        .finally(() => setLoading(false));
    }, []);

  useEffect(() => {
      if(open) {
        setTrainingDate(dailyWorkout?.training_date ?? "");
        setObservations(dailyWorkout?.observations ?? "");
        setTechniquesId(dailyWorkout?.techniques?.map((t: Technique) => t.id) ?? []);
      }
    }, [open]);
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    async function validateForm() {
      if (!trainingDate) {
        toast.error("A data do treino é obrigatória!");
        return false;
      } else if (trainingDate > format(new Date(), "yyyy-MM-dd")) {
        toast.error("A data do treino não pode ser no futuro!");
        return false;
      } else if (techniquesId.length === 0) {
        toast.error("Selecione pelo menos uma técnica para o treino!");
        return false;
      }
      return true;
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline">Adicionar novo treino</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
            {dailyWorkout ? (<DialogTitle>Editar Treino</DialogTitle>) : (<DialogTitle>Novo treino</DialogTitle>)}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="name">Data do treino: </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!trainingDate}
                  className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  <CalendarIcon />
                  {trainingDate
                      ? formatInTimeZone(trainingDate, "America/Sao_Paulo", "PPP", { locale: ptBR })
                      : <span>Escolha a data do treino</span>
                    }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={parseISO(trainingDate)} onSelect={(e) => {
                  if (e) setTrainingDate(format(e, "yyyy-MM-dd")); //
                }} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-1">
            <Label htmlFor="observations">Observação</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Descreva o treino..."
              rows={3}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Técnicas do dia:</Label>
            <MultiSelect
              options={techniques.map((t) => ({ value: String(t.id), label: t.name }))}
              value={techniquesId.map(String)}
              onValueChange={(vals) => setTechniquesId(vals.map(Number))}
              placeholder="Selecione técnicas..."
              className="w-full max-w-xs"
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