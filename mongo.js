const mongoose = require('mongoose')

const password = process.argv[2]
const url =
`mongodb+srv://stacks:${password}@cluster0.r7r6n.mongodb.net/phonebook-app?retryWrites=true&w=majority`

// Connect to Mongo db Atlas
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// Make Data Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// Convert Schema to model
const Person = mongoose.model('Person', personSchema)

const savePerson = (pname, pnumber) => {
  const person = new Person({
    name: pname,
    number: pnumber
  })

  person.save().then(() => {
    console.log(`Added Name: ${person.name} Number: ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

const getAllPersons = () => {
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  console.log(process.argv.length)
  process.exit(1)
} else if (process.argv.length === 5) {
  console.log(process.argv.length)
  savePerson(process.argv[3], process.argv[4])
}else if (process.argv.length === 3) {
  console.log(process.argv.length)
  getAllPersons()
}
