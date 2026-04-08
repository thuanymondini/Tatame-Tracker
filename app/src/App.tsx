import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Workouts } from '@/pages/Workouts'
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
            <Route path="/" element={<Workouts />} />
            <Route path="/technique" element={<Techniques />} />
            <Route path="/techniqueCategory" element={<TechniqueCategories />} />
          </Route>
          {/* <Route path="/" element={<Dashboard />} /> */}

          {/* Categorias */}
          {/* <Route path="/categories" element={<CategoriesList />} /> */}
          {/* <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/categories/:id/edit" element={<CategoryForm />} /> */}

          {/* Técnicas */}
          {/* <Route path="/techniques" element={<TechniquesList />} />
          <Route path="/techniques/new" element={<TechniqueForm />} />
          <Route path="/techniques/:id" element={<TechniqueDetail />} />
          <Route path="/techniques/:id/edit" element={<TechniqueForm />} /> */}

          {/* Treinos */}
          {/* <Route path="/workouts/new" element={<WorkoutForm />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/workouts/:id/edit" element={<WorkoutForm />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}