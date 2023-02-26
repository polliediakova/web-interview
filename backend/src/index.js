const express = require('express')
const cors = require('cors')
const data = require('./data.json')

const app = express()

app.use(cors())
app.use(express.json())

let todos = data

const PORT = 3001

app.get('/all', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(todos))
})

app.post('/save', (req, res) => {
  todos = { ...todos, ...req.body }
  console.log('Persisted!')
  res.end(JSON.stringify({ responseText: 'Persisted!' }))
})
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
