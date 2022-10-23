import { PlanEntry, NewPlanEntry } from '../types'
import plansData from './plans.json'

const plans: PlanEntry[] = plansData as PlanEntry[]
export const getEntries = (): PlanEntry[] => plans

export const findById = (id: number): PlanEntry | undefined => {
  return plans.find(p => p.id === id)
}

export const addPlan = (newPlanEntry: NewPlanEntry): PlanEntry => {
  const newPlan = {
    id: Math.max(...plans.map(p => p.id)) + 1,
    ...newPlanEntry
  }
  plans.push(newPlan)
  return newPlan
}

export const updatePlan = (planEntry: PlanEntry): PlanEntry | undefined => {
  const updatingPlanIndex = plans.findIndex(p => p.id === planEntry.id)
  if (updatingPlanIndex !== -1) plans[updatingPlanIndex] = planEntry
  return updatingPlanIndex !== -1 ? planEntry : undefined
}

export const deletePlan = (id: number): PlanEntry | undefined => {
  const deletingPlanIndex = plans.findIndex(p => p.id === id)
  if (deletingPlanIndex !== -1) {
    return plans.splice(deletingPlanIndex, 1)[0]
  }
  return undefined
}
