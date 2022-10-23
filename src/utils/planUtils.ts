import { NewPlanEntry, PlanEntry } from '../types'
import { isInteger, isString } from './checkTypes'

const parseId = (idFromRequest: any): number => {
  if (!isInteger(idFromRequest)) {
    throw new Error('Incorrect or missing id')
  }
  return idFromRequest
}
const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name')
  }
  return nameFromRequest
}
const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest)) {
    throw new Error('Incorrect or missing description')
  }
  return descriptionFromRequest
}
const parseCode = (codeFromRequest: any): string => {
  if (!isString(codeFromRequest)) {
    throw new Error('Incorrect or missing code')
  }
  return codeFromRequest
}

export const toNewPlanEntry = (object: any): NewPlanEntry => {
  const newEntry: NewPlanEntry = {
    name: parseName(object.name),
    description: parseDescription(object.description),
    code: parseCode(object.code)
  }
  return newEntry
}

export const toPlanEntry = (object: any): PlanEntry => {
  const updatingEntry: PlanEntry = {
    id: parseId(object.id),
    name: parseName(object.name),
    description: parseDescription(object.description),
    code: parseCode(object.code)
  }
  return updatingEntry
}
