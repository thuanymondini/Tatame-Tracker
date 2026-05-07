import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { fetchDailyWorkouts } from '@/actions/dailyWorkout'
import type { DailyWorkout } from '@/types/techniques'
import type { SidebarContext } from '@/types/layout'
import { DailyWorkoutModal } from '@/components/DailyWorkout/DailyWorkoutModal'
import { DailyWorkoutCard } from '@/components/DailyWorkout/DailyWorkoutCard'
import { Toaster } from 'sonner'

const FONT = "'Geist Variable', system-ui, sans-serif"

export function DailyWorkouts() {
  const { refreshCounts } = useOutletContext<SidebarContext>()
  const [workouts, setWorkouts] = useState<DailyWorkout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('todos')

  const load = () => {
    fetchDailyWorkouts()
      .then(data => setWorkouts(data))
      .catch(() => setError('Erro ao carregar treinos'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleReload = () => { load(); refreshCounts() }

  // Unique technique names from all workouts (for filter chips)
  const uniqueTechNames = [...new Map(
    workouts.flatMap(w => w.techniques).map(t => [t.id, t.name])
  ).values()].slice(0, 4)

  const filtered = filter === 'todos'
    ? workouts
    : workouts.filter(w => w.techniques.some(t => t.name.toLowerCase() === filter.toLowerCase()))

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: '#8b8fa8', fontFamily: FONT }}>
      Carregando...
    </div>
  )
  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: '#ef4444', fontFamily: FONT }}>
      {error}
    </div>
  )

  return (
    <div style={{ fontFamily: FONT }}>
      <Toaster />

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['todos', ...uniqueTechNames].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                height: 28, padding: '0 12px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                border: `1px solid ${filter === f ? '#a855f7' : 'rgba(255,255,255,0.08)'}`,
                background: filter === f ? 'rgba(168,85,247,0.15)' : 'transparent',
                color: filter === f ? '#a855f7' : '#8b8fa8',
                cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s',
              }}
            >
              {f === 'todos' ? 'Todos' : f}
            </button>
          ))}
        </div>

        <DailyWorkoutModal
          onReloadRequested={handleReload}
          trigger={
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', borderRadius: 8, border: 'none', background: '#a855f7', color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s', boxShadow: '0 0 12px rgba(168,85,247,0.35)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Novo treino
            </button>
          }
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555870" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M4 6.5h1M4 17.5h1M20 6.5h-1M20 17.5h-1M4 12h16M3 5.5v2M3 16.5v2M21 5.5v2M21 16.5v2" /></svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f1f8' }}>Nenhum treino encontrado</div>
          <div style={{ fontSize: 13, color: '#8b8fa8', textAlign: 'center', maxWidth: 240, lineHeight: 1.5 }}>Adicione seu primeiro treino para começar a registrar sua evolução.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {filtered.map(workout => (
            <DailyWorkoutCard
              key={workout.id}
              id={workout.id}
              training_date={workout.training_date}
              observations={workout.observations}
              techniques={workout.techniques}
              onReloadRequested={handleReload}
            />
          ))}
        </div>
      )}
    </div>
  )
}
