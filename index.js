const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
        "name": "Mary1 Poppendieck1",
        "number": "394-23-64231220",
        "id": 5
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
  console.log('Phonebook:', persons)
})
const generateId = () => {
  return  Math.floor(Math.random() * Math.floor(99999999))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('body',body)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }else if(persons.find(person => person.name === body.name )) {
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
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
