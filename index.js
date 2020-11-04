require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('data', function getData (req) {
    return JSON.stringify(req.body)
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get("/", (request, response) => {
  response.send("<h1>You are welcomed to personsAPI!</h1>");
});

/* app.get("/info", (request, response) => {
    const instenceQuantity = persons.length;
    const currentTime = new Date();
  response
  .send(`Phonebook has info for ${instenceQuantity} people
  <br><br>${currentTime}`);
}); */

app.get("/api/persons", (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
});

app.post("/api/persons", (request, response) => {
  const name = request.body.name;
  const number = request.body.number;

  if (!(name && number)) {
    return response.status(400).json({
      error: "content missing",
    });
  }

/*   if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } */

  const person = new Person({
    name,
    number,
  });

  person.save().then(result => {
    response.json(result);
    console.log(`added ${name} number ${number} to phonebook`);
  })

  
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
