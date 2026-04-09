export type TechniqueCategory = {
  id: number
  name: string
  description: string
}

export type Technique = {
  id: number
  name: string
  description: string
  category: TechniqueCategory
  linked_technique: Technique
}