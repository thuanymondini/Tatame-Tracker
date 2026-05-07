import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { fetchTechniques } from '@/actions/technique'
import type { Technique } from '@/types/techniques'
import type { SidebarContext } from '@/types/layout'
import { TechniqueModal } from '@/components/Technique/TechniqueModal'
import { TechniqueCard } from '@/components/Technique/TechniqueCard'
import { Toaster } from 'sonner'

const FONT = "'Geist Variable', system-ui, sans-serif"

export function Techniques() {
  const { refreshCounts } = useOutletContext<SidebarContext>()
  const [techniques, setTechniques] = useState<Technique[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<number>(0)

  const load = () => {
    fetchTechniques()
      .then(data => setTechniques(data))
      .catch(() => setError('Erro ao carregar técnicas'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleReload = () => { load(); refreshCounts() }

  // Unique categories from loaded techniques
  const uniqueCategories = [...new Map(
    techniques.map(t => [t.category?.id, t.category]).filter(([id]) => id != null)
  ).values()]

  const filtered = techniques.filter(t => {
    const q = search.toLowerCase()
    const matchQ = !q || t.name.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q)
    const matchC = !catFilter || t.category?.id === catFilter
    return matchQ && matchC
  })

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#161720', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0 12px', height: 34, transition: 'border-color 0.15s' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555870" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar técnica..."
              style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: FONT, fontSize: 13, color: '#f0f1f8', width: 160 }}
            />
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={() => setCatFilter(0)}
              style={{ height: 28, padding: '0 12px', borderRadius: 99, fontSize: 12, fontWeight: 500, border: `1px solid ${catFilter === 0 ? '#a855f7' : 'rgba(255,255,255,0.08)'}`, background: catFilter === 0 ? 'rgba(168,85,247,0.15)' : 'transparent', color: catFilter === 0 ? '#a855f7' : '#8b8fa8', cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s' }}
            >
              Todas
            </button>
            {uniqueCategories.map(c => (
              <button
                key={c.id}
                onClick={() => setCatFilter(c.id)}
                style={{ height: 28, padding: '0 12px', borderRadius: 99, fontSize: 12, fontWeight: 500, border: `1px solid ${catFilter === c.id ? '#a855f7' : 'rgba(255,255,255,0.08)'}`, background: catFilter === c.id ? 'rgba(168,85,247,0.15)' : 'transparent', color: catFilter === c.id ? '#a855f7' : '#8b8fa8', cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s' }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <TechniqueModal
          onReloadRequested={handleReload}
          trigger={
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', borderRadius: 8, border: 'none', background: '#a855f7', color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s', boxShadow: '0 0 12px rgba(168,85,247,0.35)', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Nova técnica
            </button>
          }
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555870" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><path d="M7 7h.01" /></svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f1f8' }}>Nenhuma técnica encontrada</div>
          <div style={{ fontSize: 13, color: '#8b8fa8', textAlign: 'center', maxWidth: 240, lineHeight: 1.5 }}>Adicione uma técnica para começar seu catálogo.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {filtered.map(t => (
            <TechniqueCard
              key={t.id}
              id={t.id}
              name={t.name}
              description={t.description}
              category={t.category}
              linkedTechnique={t.linked_technique}
              onReloadRequested={handleReload}
            />
          ))}
        </div>
      )}
    </div>
  )
}
