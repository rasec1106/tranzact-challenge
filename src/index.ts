import express from 'express'
import planRouter from './routes/plans'
import { logger } from './middleware/logger'

const app = express()

// parse form data
app.use(express.urlencoded({ extended: false }))
// transform request body into json
app.use(express.json())
// extra middlewares
app.use(express.static('public'))
app.use('/api', logger)
// routing
app.use('/api/plans', planRouter)
// Error page
app.all('*', (_req, res) => {
  res.status(404).send('Resource not found')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
