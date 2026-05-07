import { TechniqueCategoryModal } from './TechniqueCategoryModal'
import { deleteTechniqueCategory } from '@/actions/techniqueCategory'
import { toast } from 'sonner'
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

const CAT_PALETTE = [
  { bg: 'rgba(99,102,241,0.12)', c: '#818cf8' },
  { bg: 'rgba(168,85,247,0.12)', c: '#c084fc' },
  { bg: 'rgba(6,182,212,0.12)', c: '#22d3ee' },
  { bg: 'rgba(245,158,11,0.12)', c: '#fbbf24' },
  { bg: 'rgba(34,197,94,0.12)', c: '#4ade80' },
]
const CAT_ICONS = ['🛡️', '🔒', '🌀', '⚡', '🎯', '🥋', '💪', '🏋️']

type Props = {
  id: number
  name: string
  description: string | null
  techniqueCount?: number
  onReloadRequested: () => void
}

export function TechniqueCategoryCard({ id, name, description, techniqueCount = 0, onReloadRequested }: Props) {
  const col = CAT_PALETTE[(id - 1) % CAT_PALETTE.length]
  const icon = CAT_ICONS[(id - 1) % CAT_ICONS.length]

  async function onConfirmDelete() {
    try {
      await deleteTechniqueCategory(id)
      toast.success('Categoria deletada com sucesso!')
      onReloadRequested()
    } catch {
      toast.error('Não foi possível deletar a categoria!')
    }
  }

  return (
    <div
      style={{
        background: '#161720',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 16,
        cursor: 'default',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: 240,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.12)'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
        const actions = el.querySelector<HTMLDivElement>('[data-actions]')
        if (actions) actions.style.opacity = '1'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.transform = ''
        el.style.boxShadow = ''
        const actions = el.querySelector<HTMLDivElement>('[data-actions]')
        if (actions) actions.style.opacity = '0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: col.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
          {icon}
        </div>
        <div data-actions style={{ display: 'flex', gap: 6, opacity: 0, transition: 'opacity 0.15s' }}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <ActionBtn danger>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
              </ActionBtn>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Deletar esta categoria?</AlertDialogTitle>
                <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={onConfirmDelete}>Deletar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TechniqueCategoryModal
            category={{ id, name, description }}
            onReloadRequested={onReloadRequested}
            trigger={
              <ActionBtn>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </ActionBtn>
            }
          />
        </div>
      </div>

      <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f1f8' }}>{name}</div>
      <div style={{ fontSize: 13, color: '#8b8fa8', lineHeight: 1.4, flex: 1 }}>{description}</div>
      <div style={{ fontSize: 12, color: col.c, display: 'flex', alignItems: 'center', gap: 4 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><path d="M7 7h.01" /></svg>
        {techniqueCount} {techniqueCount === 1 ? 'técnica' : 'técnicas'}
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
