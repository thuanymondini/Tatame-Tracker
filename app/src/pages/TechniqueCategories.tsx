import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { fetchTechniqueCategories } from '@/actions/techniqueCategory'
import { fetchTechniques } from '@/actions/technique'
import type { TechniqueCategory, Technique } from '@/types/techniques'
import type { SidebarContext } from '@/types/layout'
import { TechniqueCategoryModal } from '@/components/TechniqueCategory/TechniqueCategoryModal'
import { TechniqueCategoryCard } from '@/components/TechniqueCategory/TechniqueCategoryCard'
import { Toaster } from 'sonner'

const FONT = "'Geist Variable', system-ui, sans-serif"

export function TechniqueCategories() {
  const { refreshCounts } = useOutletContext<SidebarContext>()
  const [categories, setCategories] = useState<TechniqueCategory[]>([])
  const [techniques, setTechniques] = useState<Technique[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    Promise.all([fetchTechniqueCategories(), fetchTechniques()])
      .then(([cats, techs]) => { setCategories(cats); setTechniques(techs) })
      .catch(() => setError('Erro ao carregar categorias'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleReload = () => { load(); refreshCounts() }

  const countFor = (catId: number) => techniques.filter(t => t.category?.id === catId).length

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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <TechniqueCategoryModal
          onReloadRequested={handleReload}
          trigger={
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', borderRadius: 8, border: 'none', background: '#a855f7', color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s', boxShadow: '0 0 12px rgba(168,85,247,0.35)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Nova categoria
            </button>
          }
        />
      </div>

      {/* Empty state */}
      {categories.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🥋</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f1f8' }}>Nenhuma categoria</div>
          <div style={{ fontSize: 13, color: '#8b8fa8', textAlign: 'center', maxWidth: 240, lineHeight: 1.5 }}>Crie uma categoria para organizar suas técnicas.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {categories.map(category => (
            <TechniqueCategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              techniqueCount={countFor(category.id)}
              onReloadRequested={handleReload}
            />
          ))}
        </div>
      )}
    </div>
  )
}
