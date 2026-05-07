import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DailyWorkouts } from '@/pages/DailyWorkouts'
import { Techniques } from '@/pages/Techniques'
import { TechniqueCategories } from '@/pages/TechniqueCategories'
import { Login } from '@/pages/Login'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from './layouts/Sidebar'

export default function App() {
  const [authed, setAuthed] = useState(
    () => !!localStorage.getItem('tatame-token')
  )

  // Deslogado automaticamente quando a API retorna 401
  useEffect(() => {
    const handler = () => setAuthed(false)
    window.addEventListener('tatame:logout', handler)
    return () => window.removeEventListener('tatame:logout', handler)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('tatame-token')
    localStorage.removeItem('tatame-authed')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Login onLogin={() => setAuthed(true)} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Sidebar onLogout={handleLogout} />}>
            <Route path="/" element={<DailyWorkouts />} />
            <Route path="/technique" element={<Techniques />} />
            <Route path="/techniqueCategory" element={<TechniqueCategories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
