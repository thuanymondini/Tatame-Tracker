import { TechniqueModal } from './TechniqueModal'
import { deleteTechnique } from '@/actions/technique'
import type { Technique, TechniqueCategory } from '@/types/techniques'
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

type Props = {
  id: number
  name: string
  description?: string | null
  category: TechniqueCategory
  linkedTechnique: Technique | null
  onReloadRequested: () => void
}

export function TechniqueCard({ id, name, description, category, linkedTechnique, onReloadRequested }: Props) {
  const col = CAT_PALETTE[((category?.id ?? 1) - 1) % CAT_PALETTE.length]

  async function onConfirmDelete() {
    try {
      await deleteTechnique(id)
      toast.success('Técnica deletada com sucesso!')
      onReloadRequested()
    } catch {
      toast.error('Não foi possível deletar a técnica!')
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
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.12)'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
        const footer = el.querySelector<HTMLDivElement>('[data-footer]')
        if (footer) footer.style.opacity = '1'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.transform = ''
        el.style.boxShadow = ''
        const footer = el.querySelector<HTMLDivElement>('[data-footer]')
        if (footer) footer.style.opacity = '0'
      }}
    >
      {/* Body */}
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f1f8', marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 13, color: '#8b8fa8', lineHeight: 1.4, marginBottom: 12, minHeight: 18 }}>
          {description ?? <span style={{ color: '#555870', fontStyle: 'italic' }}>Sem descrição</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {category?.name && (
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, fontWeight: 500, background: col.bg, color: col.c, border: `1px solid ${col.c}33` }}>
              {category.name}
            </span>
          )}
          {linkedTechnique && (
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, background: '#1e2030', color: '#555870', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
              {linkedTechnique.name}
            </span>
          )}
        </div>
      </div>

      {/* Footer — hover-revealed */}
      <div
        data-footer
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', display: 'flex', justifyContent: 'flex-end', gap: 6, opacity: 0, transition: 'opacity 0.15s' }}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ActionBtn danger>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
            </ActionBtn>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Deletar esta técnica?</AlertDialogTitle>
              <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={onConfirmDelete}>Deletar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <TechniqueModal
          technique={{ id, name, description: description ?? '', category, linked_technique: linkedTechnique }}
          onReloadRequested={onReloadRequested}
          trigger={
            <ActionBtn>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
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
