import { MonthNumbers } from './../enums'
import { PremiumEntry, PremiumRequest, NonSensitiveInfoPremiumEntry } from './../types'
import { isInteger, isString, isDate, isState, isPlan } from './checkTypes'

const parsePlan = (planFromRequest: any): string => {
  if (!isString(planFromRequest) || !isPlan(planFromRequest)) {
    throw new Error('Incorrect or missing plan')
  }
  return planFromRequest
}
const parseState = (stateFromRequest: any): string => {
  if (!isState(stateFromRequest)) {
    throw new Error('Incorrect or missing state')
  }
  return stateFromRequest
}
const parseBirthDate = (birthDateFromRequest: any): string => {
  if (!isDate(birthDateFromRequest)) {
    throw new Error('Incorrect or missing birth date')
  }
  return birthDateFromRequest
}
const parseAge = (ageFromRequest: any): number => {
  if (!isInteger(ageFromRequest) || ageFromRequest < 0) {
    throw new Error('Incorrect or missing age')
  }
  return +ageFromRequest
}
const getAge = (dateString: string): number => {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
export const toPremiumRequest = (object: any): PremiumRequest => {
  const premiumRequest: PremiumRequest = {
    birthDate: parseBirthDate(object.birthDate),
    state: parseState(object.state),
    plan: parsePlan(object.plan),
    age: parseAge(object.age)
  }
  if (!validateAge(premiumRequest.age, premiumRequest.birthDate)) throw new Error('Age doesn\'t match with birth date')
  return premiumRequest
}
export const toPremiumResponse = (object: PremiumEntry): NonSensitiveInfoPremiumEntry => {
  const premiumEntry: NonSensitiveInfoPremiumEntry = {
    carrier: object.carrier,
    premium: object.premium
  }
  return premiumEntry
}
export const checkBirthDate = (birthDate: string, premium: PremiumEntry): boolean => {
  if (premium.monthOfBirth === '*') return true
  if (!isDate(birthDate)) return false

  const date: Date = new Date(birthDate)
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  return month === premium.monthOfBirth
}
export const checkState = (state: string, premium: PremiumEntry): boolean => {
  if (premium.state === '*') return true
  return state === premium.state
}
export const checkPlan = (plan: string, premium: PremiumEntry): boolean => {
  return premium.plan.includes(plan)
}
export const checkAge = (age: number, premium: PremiumEntry): boolean => {
  if (!isInteger(age)) return false
  return (age >= premium.ageRange.min) && (age <= premium.ageRange.max)
}
export const validateAge = (age: number, birthDate: string): boolean => {
  if (!isDate(birthDate)) return false
  if (!isInteger(age)) return false
  const ageFromBirthDate = getAge(birthDate)
  return age === ageFromBirthDate
}
export const sortPremiumsByCarrierStateMonth = (premiums: PremiumEntry[]): PremiumEntry[] => {
  let sortedPremiums = premiums
  // sort by carrier
  sortedPremiums = sortedPremiums.sort((a, b) => a.carrier > b.carrier ? 1 : a.carrier < b.carrier ? -1 : 0)
  // sort by state
  sortedPremiums = sortedPremiums.sort((a, b) => {
    if (a.carrier === b.carrier) {
      if (a.state === '*') return 1
      return a.state > b.state ? 1 : -1
    }
    return 0
  })
  // sort by month
  sortedPremiums = sortedPremiums.sort((a, b) => {
    if (a.carrier === b.carrier) {
      if (a.state === b.state) {
        return MonthNumbers[a.monthOfBirth] > MonthNumbers[b.monthOfBirth] ? 1 : -1
      }
    }
    return 0
  })
  return sortedPremiums
}
