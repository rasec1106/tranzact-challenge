import express from 'express'
import * as stateServices from '../services/stateServices'
const router = express.Router()

router.get('/', (_req, res) => {
  const states = stateServices.getEntries()
  // get rid of * wildcard on enum
  states.splice(-1, 1)
  res.send({ success: true, results: states })
})

export default router
