import { Months, States } from './../enums'

export const isString = (string: string): boolean => {
  return typeof string === 'string' && string.length > 0
}

export const isInteger = (integer: any): boolean => {
  return Number.isInteger(integer)
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const isMonth = (month: any): boolean => {
  return Object.values(Months).includes(month)
}

export const isState = (state: any): boolean => {
  return Object.values(States).includes(state)
}
