import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DailyWorkouts } from '@/pages/DailyWorkouts'
import { Techniques } from '@/pages/Techniques'
import { TechniqueCategories } from '@/pages/TechniqueCategories'
import { ThemeProvider } from "@/components/theme-provider"
import { Topbar } from "./layouts/topbar"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Topbar/>}>
            <Route path="/" element={<DailyWorkouts />} />
            <Route path="/technique" element={<Techniques />} />
            <Route path="/techniqueCategory" element={<TechniqueCategories/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}