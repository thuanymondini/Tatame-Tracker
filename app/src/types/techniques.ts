export type TechniqueCategory = {
  id: number
  name: string
  description: string | null
}

export type Technique = {
  id: number
  name: string
  description: string | null
  category: TechniqueCategory
  linked_technique: Technique|null
}

export type DailyWorkout = {
  id: number
  training_date: string
  observations: string | null
  techniques: Technique[]
}