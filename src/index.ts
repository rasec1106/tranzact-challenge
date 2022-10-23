import express from 'express'
import planRouter from './routes/plans'
import { logger } from './middleware/logger'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000
app.set('port', PORT)

// parse form data
app.use(express.urlencoded({ extended: false }))
// transform request body into json
app.use(express.json())
// extra middlewares
app.use(express.static('public'))
app.use(cors())
app.use('/api', logger)
// routing
app.use('/api/plans', planRouter)
// Error page
app.all('*', (_req, res) => {
  res.status(404).send('Resource not found')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
