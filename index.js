const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')


dotenv.config()

const db = require('./db')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// register the test route in server/index.js
const testsRouter = require('./routes/tests')
app.use('/api/tests', testsRouter)

// register the ai route in server/index.js
const aiRouter = require('./routes/ai')
app.use('/api/ai', aiRouter)

// test route to check server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


