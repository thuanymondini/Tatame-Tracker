import { DailyWorkoutModal } from './DailyWorkoutModal'
import { deleteDailyWorkout } from '@/actions/dailyWorkout'
import type { Technique } from '@/types/techniques'
import { toast } from 'sonner'
import { formatInTimeZone } from 'date-fns-tz/formatInTimeZone'
import { ptBR } from 'date-fns/locale/pt-BR'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const ACCENT_COLORS = ['#a855f7', '#6366f1', '#22c55e', '#f59e0b', '#06b6d4', '#ec4899']

type Props = {
  id: number
  training_date: string
  observations: string | null
  techniques: Technique[]
  onReloadRequested: () => void
}

export function DailyWorkoutCard({ id, training_date, observations, techniques, onReloadRequested }: Props) {
  const accent = ACCENT_COLORS[id % ACCENT_COLORS.length]

  async function onConfirmDelete() {
    try {
      await deleteDailyWorkout(id)
      toast.success('Treino deletado com sucesso!')
      onReloadRequested()
    } catch {
      toast.error('Não foi possível deletar o treino!')
    }
  }

  return (
    <div
      style={{
        background: '#161720',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        width: 260,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,255,255,0.12)'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
        const footer = el.querySelector<HTMLDivElement>('[data-footer]')
        if (footer) footer.style.opacity = '1'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.transform = ''
        el.style.boxShadow = ''
        const footer = el.querySelector<HTMLDivElement>('[data-footer]')
        if (footer) footer.style.opacity = '0'
      }}
    >
      {/* Accent strip */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* Body */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f1f8', marginBottom: 4 }}>
          {formatInTimeZone(training_date, 'America/Sao_Paulo', 'PPP', { locale: ptBR })}
        </div>
        <div style={{ fontSize: 13, color: '#8b8fa8', lineHeight: 1.4, marginBottom: 10, minHeight: 18 }}>
          {observations ?? <span style={{ color: '#555870', fontStyle: 'italic' }}>Sem observações</span>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {techniques.map(t => (
            <span key={t.id} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, background: '#1e2030', color: '#8b8fa8', border: '1px solid rgba(255,255,255,0.08)' }}>
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer — revealed on hover */}
      <div
        data-footer
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', display: 'flex', justifyContent: 'flex-end', gap: 6, opacity: 0, transition: 'opacity 0.15s' }}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ActionBtn danger>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </ActionBtn>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Deletar este treino?</AlertDialogTitle>
              <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={onConfirmDelete}>Deletar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DailyWorkoutModal
          dailyWorkout={{ id, training_date, observations, techniques }}
          onReloadRequested={onReloadRequested}
          trigger={
            <ActionBtn>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </ActionBtn>
          }
        />
      </div>
    </div>
  )
}

function ActionBtn({ children, danger = false, ...props }: { children: React.ReactNode; danger?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8b8fa8', transition: 'all 0.15s', padding: 0 }}
      onMouseEnter={e => {
        const el = e.currentTarget
        if (danger) {
          el.style.background = 'rgba(220,38,38,0.15)'
          el.style.borderColor = 'rgba(220,38,38,0.5)'
          el.style.color = '#ef4444'
        } else {
          el.style.color = '#f0f1f8'
          el.style.borderColor = 'rgba(255,255,255,0.12)'
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.background = '#1e2030'
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.color = '#8b8fa8'
      }}
    >
      {children}
    </button>
  )
}
