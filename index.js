// Modules importations
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors') //  same origin policy and CORS a
// const morganBody = require('morgan-body') 
// const bodyParser = require('body-parser') 


// Morgan token for request loges
morgan.token('content', function (req, res) { 
  body = JSON.stringify(req.body)
  console.log('body', body);
  return (body === {}) ? '' : body
  })// definded morgan token
const tinyContent = morgan(':method :url :status :res[content-length] - :response-time ms :content')

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('build'))// to let express show static file from build folder
app.use(tinyContent)

// must parse body before morganBody as body will be logged
//app.use(bodyParser.json()) 
// hook morganBody to express app
//morganBody(app)



let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  },
  {
    name: 'Mary1 Poppendieck1',
    number: '394-23-64231220',
    id: 5
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})
app.get('/info', (req, res) => {
  res.send(`<div><h3>Phonebook has info for ${persons.length}
     people.</h3><p>${new Date()}</></div>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()

})
const generateId = () => {
  return Math.floor(Math.random() * Math.floor(99999999))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(412).json({
      error: 'name already in phonebook'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
