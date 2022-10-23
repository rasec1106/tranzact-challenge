import { Month } from './enums'
export interface PlanEntry {
  id: number
  name: string
  description: string
  code: string
}

export interface PremiumEntry {
  id: number
  carrier: string
  plan: string[]
  state: string
  monthOfBirth: Month
  ageRange: {
    min: number
    max: number
  }
  premium: number
}
export interface PremiumRequest {
  plan: string
  state: string
  birthDate: string
  age: number
}

export type NewPlanEntry = Omit<PlanEntry, 'id'>
export type NonSensitiveInfoPremiumEntry = Pick<PremiumEntry, 'carrier' | 'premium'>
