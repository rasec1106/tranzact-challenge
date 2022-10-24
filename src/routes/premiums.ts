import express from 'express'
import * as premiumServices from '../services/premiumServices'
import { toPremiumRequest } from '../utils/premiumUtils'
const router = express.Router()

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

export default router
