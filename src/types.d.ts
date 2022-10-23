export interface PlanEntry {
  id: number
  name: string
  description: string
  code: string
}

export type NewPlanEntry = Omit<PlanEntry, 'id'>
