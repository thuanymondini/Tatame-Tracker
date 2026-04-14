import { useEffect, useState } from "react";
import { fetchDailyWorkouts } from "@/actions/dailyWorkout";
import type { DailyWorkout } from "@/types/techniques";
import { DailyWorkoutModal } from "@/components/DailyWorkout/DailyWorkoutModal";
import { Toaster } from "sonner";
import { DailyWorkoutCard } from "@/components/DailyWorkout/DailyWorkoutCard";

export function DailyWorkouts() {
  const [workouts, setWorkouts] = useState<DailyWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDailyWorkouts = () => {
    fetchDailyWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError("Erro ao carregar categorias"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDailyWorkouts();
  }, []);
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row p-6">
        <DailyWorkoutModal
          onReloadRequested={() => {loadDailyWorkouts()}}
        />
        <Toaster />
      </div>
      <div className="flex flex-wrap gap-4 px-6">
        {workouts.map((workout) => (
          <DailyWorkoutCard
            id={workout.id}
            training_date={workout.training_date}
            observations={workout.observations}
            techniques={workout.techniques}
            onReloadRequested={() => {loadDailyWorkouts()}}
          />
        ))}
      </div>
    </div>
  );
}
