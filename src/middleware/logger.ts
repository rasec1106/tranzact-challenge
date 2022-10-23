export const logger = (req: any, res: any, next: any): undefined => {
  console.log('Middleware working', req, res)
  next()
  return undefined
}
