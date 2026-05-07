import { useState } from 'react'
import { login, register } from '@/actions/auth'

const BELT_COLORS: Record<string, string> = {
  branca: '#e5e7eb',
  azul: '#3b82f6',
  roxa: '#a855f7',
  marrom: '#92400e',
  preta: '#111827',
}
const BELTS = ['branca', 'azul', 'roxa', 'marrom', 'preta']
const FONT = "'Geist Variable', system-ui, sans-serif"

interface Props {
  onLogin: () => void
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: '#8b8fa8', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: FONT }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const INPUT_STYLE: React.CSSProperties = {
  display: 'block', width: '100%', padding: '9px 12px',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
  fontFamily: FONT, fontSize: 14, color: '#f0f1f8',
  background: '#1e2030', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

export function Login({ onLogin }: Props) {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [belt, setBelt] = useState('branca')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = tab === 'login'
        ? await login(email, password)
        : await register(name, email, password, belt)
      localStorage.setItem('tatame-token', data.token)
      localStorage.setItem('tatame-authed', 'true')
      onLogin()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message
      setError(msg ?? 'Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0f14', display: 'flex', alignItems: 'stretch', fontFamily: FONT }}>

      {/* Left panel — branding */}
      <div style={{ width: '45%', background: '#161720', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', padding: '48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'auto' }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg, #a855f7, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(168,85,247,0.35)', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5h11M6.5 17.5h11M4 6.5h1M4 17.5h1M20 6.5h-1M20 17.5h-1M4 12h16M3 5.5v2M3 16.5v2M21 5.5v2M21 16.5v2" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#f0f1f8' }}>Tatame Tracker</div>
            <div style={{ fontSize: 12, color: '#555870' }}>Jiu-Jitsu Training Log</div>
          </div>
        </div>

        {/* Central copy */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#f0f1f8', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 12 }}>
              Registre sua<br />evolução no tatame.
            </div>
            <div style={{ fontSize: 15, color: '#8b8fa8', lineHeight: 1.6, maxWidth: 320 }}>
              Acompanhe treinos, técnicas e categorias para evoluir com consistência.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🥋', text: 'Registre cada treino com técnicas e observações' },
              { icon: '📈', text: 'Acompanhe sua consistência ao longo do tempo' },
              { icon: '🔗', text: 'Conecte técnicas relacionadas e categorize tudo' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{f.icon}</div>
                <span style={{ fontSize: 13, color: '#8b8fa8' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Belt bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 24 }}>
          <span style={{ fontSize: 11, color: '#555870', marginRight: 4 }}>Faixas:</span>
          {BELTS.map(b => (
            <div key={b} style={{ height: 8, flex: 1, borderRadius: 99, background: BELT_COLORS[b], opacity: b === 'branca' ? 0.4 : 0.8, boxShadow: b !== 'branca' ? `0 0 8px ${BELT_COLORS[b]}55` : 'none' }} />
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 64px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#1e2030', borderRadius: 10, padding: 4, marginBottom: 32, border: '1px solid rgba(255,255,255,0.08)' }}>
            {(['login', 'register'] as const).map(id => (
              <button key={id} onClick={() => setTab(id)} style={{ flex: 1, height: 34, borderRadius: 7, border: 'none', background: tab === id ? '#161720' : 'transparent', color: tab === id ? '#f0f1f8' : '#555870', fontFamily: FONT, fontSize: 14, fontWeight: tab === id ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s', boxShadow: tab === id ? '0 1px 3px rgba(0,0,0,0.3)' : 'none' }}>
                {id === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#f0f1f8', letterSpacing: '-0.02em', marginBottom: 6 }}>
              {tab === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </div>
            <div style={{ fontSize: 14, color: '#8b8fa8' }}>
              {tab === 'login' ? 'Entre para continuar seu progresso' : 'Comece a registrar seus treinos hoje'}
            </div>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {tab === 'register' && (
              <>
                <Field label="Nome completo">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" required style={INPUT_STYLE} />
                </Field>
                <Field label="Faixa atual">
                  <div style={{ display: 'flex', gap: 6 }}>
                    {BELTS.map(b => (
                      <button key={b} type="button" onClick={() => setBelt(b)} style={{ flex: 1, height: 34, borderRadius: 8, border: `2px solid ${belt === b ? BELT_COLORS[b] : 'rgba(255,255,255,0.08)'}`, background: belt === b ? `${BELT_COLORS[b]}22` : 'transparent', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <div style={{ width: 14, height: 5, borderRadius: 2, background: BELT_COLORS[b], opacity: b === 'branca' ? 0.5 : 1 }} />
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: '#555870', marginTop: 4, textTransform: 'capitalize' }}>
                    Selecionado: <span style={{ color: BELT_COLORS[belt] }}>{belt}</span>
                  </div>
                </Field>
              </>
            )}

            <Field label="E-mail">
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#555870', pointerEvents: 'none', display: 'flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
                </span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required style={{ ...INPUT_STYLE, paddingLeft: 36 }} />
              </div>
            </Field>

            <Field label="Senha">
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#555870', pointerEvents: 'none', display: 'flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ ...INPUT_STYLE, paddingLeft: 36, paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPwd(v => !v)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#555870', display: 'flex', alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {showPwd
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                    }
                  </svg>
                </button>
              </div>
            </Field>

            {tab === 'login' && (
              <div style={{ textAlign: 'right', marginTop: -6 }}>
                <a href="#" style={{ fontSize: 12, color: '#a855f7', textDecoration: 'none' }} onClick={e => e.preventDefault()}>Esqueci minha senha</a>
              </div>
            )}

            {error && (
              <div style={{ fontSize: 13, color: '#ef4444', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '9px 12px' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ height: 42, borderRadius: 10, border: 'none', background: loading ? '#1e2030' : 'linear-gradient(135deg, #a855f7, #7c3aed)', color: 'white', fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: loading ? 'default' : 'pointer', marginTop: 4, boxShadow: loading ? 'none' : '0 0 20px rgba(168,85,247,0.4)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading
                ? (tab === 'login' ? 'Entrando...' : 'Criando conta...')
                : (tab === 'login' ? 'Entrar' : 'Criar conta')
              }
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: 12, color: '#555870' }}>ou</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <button type="button" disabled={loading} onClick={async () => {
              setLoading(true)
              setError(null)
              try {
                const data = await login('demo@tatame.com', 'demo123')
                localStorage.setItem('tatame-token', data.token)
                onLogin()
              } catch {
                setError('Usuário demo indisponível no momento.')
              } finally {
                setLoading(false)
              }
            }} style={{ height: 42, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: '#1e2030', color: '#8b8fa8', fontSize: 14, fontFamily: FONT, cursor: loading ? 'default' : 'pointer', transition: 'all 0.15s' }}>
              {loading ? 'Entrando...' : 'Entrar como demo'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
