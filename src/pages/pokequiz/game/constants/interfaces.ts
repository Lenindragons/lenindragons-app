export interface Pokemon {
  name: string
  type1: string
  type2: string
  habitat: string
  color: string
  height: number
  weight: number
  stage: number | string
}

export interface GridTesteProps {
  actualItem?: Pokemon
  labels: string[]
  items: any[]
}