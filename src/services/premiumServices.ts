import {
  checkBirthDate,
  checkState,
  checkPlan,
  checkAge,
  toPremiumResponse,
  sortPremiumsByCarrierStateMonth
} from './../utils/premiumUtils'
import {
  PremiumRequest,
  PremiumEntry,
  PremiumResponse
} from '../types'
import premiumData from './premiums.json'

const initialPremiums: PremiumEntry[] = premiumData as PremiumEntry[]
const premiums: PremiumEntry[] = initialPremiums.map(premium => premium)
export const getEntries = (): PremiumEntry[] => premiums

export const searchEntries = (premiumRequest: PremiumRequest): PremiumResponse[] => {
  const { birthDate, state, plan, age } = premiumRequest
  // sort to apply business logic correctly
  const sortedPremiums = sortPremiumsByCarrierStateMonth(premiums)
  // need only one entry per carrier
  const carriers = new Map()
  sortedPremiums.forEach((p) => {
    carriers.set(p.carrier, 0)
  })
  const filteredPremiums = sortedPremiums.filter(premium => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (carriers.get(premium.carrier)) return false
    if (
      checkBirthDate(birthDate, premium) &&
      checkState(state, premium) &&
      checkPlan(plan, premium) &&
      checkAge(age, premium)
    ) {
      carriers.set(premium.carrier, 1)
      return true
    }
    return false
  })
  return filteredPremiums.map((premium) => toPremiumResponse(premium))
}
