import express from 'express'
import * as planServices from '../services/planServices'
import { toNewPlanEntry, toPlanEntry } from '../utils/planUtils'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(planServices.getEntries())
})

router.get('/:id', (req, res) => {
  try {
    const plan = planServices.findById(+req.params.id)
    if (plan === undefined) throw new Error("The plan doesn't exists")
    res.status(200).send(plan)
  } catch (e: unknown) {
    (e instanceof Error)
      ? res.status(400).send(e.message)
      : res.status(500).send('Oops! An unknown error has happened')
  }
})

router.post('/', (req, res) => {
  try {
    const newPlanEntry = toNewPlanEntry(req.body)
    const addedPlanEntry = planServices.addPlan(newPlanEntry)
    res.json(addedPlanEntry)
  } catch (e: unknown) {
    (e instanceof Error)
      ? res.status(400).send(e.message)
      : res.status(500).send('Oops! An unknown error has happened')
  }
})

router.put('/', (req, res) => {
  try {
    const currentPlan = toPlanEntry(req.body)
    const updatedPlanEntry = planServices.updatePlan(currentPlan)
    if (updatedPlanEntry === undefined) throw new Error("The plan doesn't exists")
    res.json(updatedPlanEntry)
  } catch (e: unknown) {
    (e instanceof Error)
      ? res.status(400).send(e.message)
      : res.status(500).send('Oops! An unknown error has happened')
  }
})

router.delete('/:id', (req, res) => {
  try {
    const plan = planServices.deletePlan(+req.params.id)
    if (plan === undefined) throw new Error("The plan doesn't exists")
    res.status(200).send(plan)
  } catch (e: unknown) {
    (e instanceof Error)
      ? res.status(400).send(e.message)
      : res.status(500).send('Oops! An unknown error has happened')
  }
})

export default router
