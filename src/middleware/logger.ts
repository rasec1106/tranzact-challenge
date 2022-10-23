export const logger = (req: any, _res: any, next: any): undefined => {
  console.log('Middleware working', req.body)
  next()
  return undefined
}
