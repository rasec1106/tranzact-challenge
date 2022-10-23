import express from 'express'
import * as premiumServices from '../services/premiumServices'
import { toPremiumRequest } from '../utils/premiumUtils'
const router = express.Router()

// router.get('/', (_req, res) => {
//   res.send(planServices.getEntries())
// })

// router.get('/:id', (req, res) => {
//   try {
//     const plan = premiumServices.findById(+req.params.id)
//     if (plan === undefined) throw new Error("The plan doesn't exists")
//     res.status(200).send(plan)
//   } catch (e: unknown) {
//     (e instanceof Error)
//       ? res.status(400).send(e.message)
//       : res.status(500).send('Oops! An unknown error has happened')
//   }
// })

router.post('/calculatePremium', (req, res) => {
  try {
    const newPremiumRequest = toPremiumRequest(req.body)
    const premiumEntries = premiumServices.searchEntries(newPremiumRequest)
    res.json({ success: true, results: premiumEntries })
  } catch (e: unknown) {
    (e instanceof Error)
      ? res.status(400).send({ success: false, message: e.message })
      : res.status(500).send({ success: false, message: 'Oops! An unknown error has happened' })
  }
})

// router.put('/', (req, res) => {
//   try {
//     const currentPlan = toPlanEntry(req.body)
//     const updatedPlanEntry = planServices.updatePlan(currentPlan)
//     if (updatedPlanEntry === undefined) throw new Error("The plan doesn't exists")
//     res.json(updatedPlanEntry)
//   } catch (e: unknown) {
//     (e instanceof Error)
//       ? res.status(400).send(e.message)
//       : res.status(500).send('Oops! An unknown error has happened')
//   }
// })

// router.delete('/:id', (req, res) => {
//   try {
//     const plan = planServices.deletePlan(+req.params.id)
//     if (plan === undefined) throw new Error("The plan doesn't exists")
//     res.status(200).send(plan)
//   } catch (e: unknown) {
//     (e instanceof Error)
//       ? res.status(400).send(e.message)
//       : res.status(500).send('Oops! An unknown error has happened')
//   }
// })

// router.post('/reset', (_req, res) => {
//   res.send(planServices.resetPlans())
// })

export default router
