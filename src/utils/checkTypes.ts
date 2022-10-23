export const isString = (string: string): boolean => {
  return typeof string === 'string' && string.length > 0
}

export const isInteger = (integer: any): boolean => {
  return Number.isInteger(integer)
}
