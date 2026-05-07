import { useEffect, useState, useCallback } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { logout as apiLogout, me, type AuthUser } from '@/actions/auth'
import { fetchDailyWorkouts } from '@/actions/dailyWorkout'
import { fetchTechniques } from '@/actions/technique'
import { fetchTechniqueCategories } from '@/actions/techniqueCategory'
import type { DailyWorkout, Technique, TechniqueCategory } from '@/types/techniques'
import type { SidebarContext } from '@/types/layout'

const FONT = "'Geist Variable', system-ui, sans-serif"

const PAGE_TITLES: Record<string, string> = {
  '/': 'Treinos',
  '/technique': 'Técnicas',
  '/techniqueCategory': 'Categorias',
}

const NAV_ITEMS = [
  {
    id: 'workouts', path: '/', label: 'Treinos',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M4 6.5h1M4 17.5h1M20 6.5h-1M20 17.5h-1M4 12h16M3 5.5v2M3 16.5v2M21 5.5v2M21 16.5v2" />
      </svg>
    ),
  },
  {
    id: 'techniques', path: '/technique', label: 'Técnicas',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><path d="M7 7h.01" />
      </svg>
    ),
  },
  {
    id: 'categories', path: '/techniqueCategory', label: 'Categorias',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
]

const STAT_ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M4 6.5h1M4 17.5h1M20 6.5h-1M20 17.5h-1M4 12h16M3 5.5v2M3 16.5v2M21 5.5v2M21 16.5v2" /></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><path d="M7 7h.01" /></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
]

interface SidebarProps {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation()
  const [workouts, setWorkouts] = useState<DailyWorkout[]>([])
  const [techniques, setTechniques] = useState<Technique[]>([])
  const [categories, setCategories] = useState<TechniqueCategory[]>([])
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    me().then(setUser).catch(() => {})
  }, [])

  const refreshCounts = useCallback(() => {
    fetchDailyWorkouts().then(setWorkouts).catch(() => {})
    fetchTechniques().then(setTechniques).catch(() => {})
    fetchTechniqueCategories().then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    refreshCounts()
  }, [refreshCounts])

  const now = new Date()
  const thisMonth = workouts.filter(w => {
    const d = new Date(w.training_date + 'T12:00:00')
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const stats = [
    { label: 'Treinos', value: workouts.length, color: '#a855f7', bg: 'rgba(168,85,247,0.12)', delta: `${thisMonth} este mês` },
    { label: 'Técnicas', value: techniques.length, color: '#22d3ee', bg: 'rgba(6,182,212,0.12)', delta: `${categories.length} categorias` },
    { label: 'Este mês', value: thisMonth, color: '#22c55e', bg: 'rgba(34,197,94,0.12)', delta: `de ${workouts.length} totais` },
    { label: 'Categorias', value: categories.length, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', delta: `${techniques.length} técnicas` },
  ]

  const countFor = (id: string) => {
    if (id === 'workouts') return workouts.length
    if (id === 'techniques') return techniques.length
    return null
  }

  const context: SidebarContext = { refreshCounts }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: FONT }}>

      {/* Sidebar */}
      <aside style={{ width: 220, flexShrink: 0, background: '#161720', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10 }}>

        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #a855f7, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(168,85,247,0.35)', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5h11M6.5 17.5h11M4 6.5h1M4 17.5h1M20 6.5h-1M20 17.5h-1M4 12h16M3 5.5v2M3 16.5v2M21 5.5v2M21 16.5v2" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f1f8' }}>Tatame</div>
            <div style={{ fontSize: 11, color: '#555870' }}>Tracker</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path
            const count = countFor(item.id)
            return (
              <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, fontSize: 14, transition: 'all 0.15s', background: active ? 'rgba(168,85,247,0.15)' : 'transparent', color: active ? '#a855f7' : '#8b8fa8' }}>
                  <span style={{ opacity: active ? 1 : 0.8, flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                  {count !== null && (
                    <span style={{ marginLeft: 'auto', background: 'rgba(168,85,247,0.15)', color: '#a855f7', fontSize: 11, padding: '1px 7px', borderRadius: 99, fontWeight: 500 }}>
                      {count}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: 'white', flexShrink: 0 }}>
              {user ? user.name.slice(0, 2).toUpperCase() : '..'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#f0f1f8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name ?? '—'}</div>
              <div style={{ fontSize: 11, color: '#555870', textTransform: 'capitalize' }}>{user?.belt ?? 'branca'}</div>
            </div>
            <button
              onClick={async () => { try { await apiLogout() } catch { /* ignora erro de rede */ } onLogout() }}
              title="Sair"
              style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#555870', transition: 'all 0.15s', flexShrink: 0, padding: 0 }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555870'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0e0f14' }}>

        {/* Topbar */}
        <div style={{ height: 56, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(14,15,20,0.8)', position: 'sticky', top: 0, zIndex: 5, backdropFilter: 'blur(12px)' }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#f0f1f8' }}>
            {PAGE_TITLES[location.pathname] ?? 'App'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8b8fa8' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </button>
            <button style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8b8fa8' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 28, flex: 1 }}>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: '#161720', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 8, transition: 'border-color 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {STAT_ICONS[i]}
                  </div>
                  <div style={{ fontSize: 11, color: '#555870', fontFamily: 'monospace' }}>{s.delta}</div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 600, color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#8b8fa8' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Page content */}
          <Outlet context={context} />
        </div>
      </div>
    </div>
  )
}
