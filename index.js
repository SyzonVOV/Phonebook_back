require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('data', function getData(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
);

/* app.get("/", (request, response) => {
  response.send("<h1>You are welcomed to personsAPI!</h1>");
}); */

app.get('/info', async (request, response) => {
  const instenceQuantity = await Person.estimatedDocumentCount();
  const currentTime = new Date();
  response.send(`Phonebook has info for ${instenceQuantity} people
  <br><br>${currentTime}`);
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const name = request.body.name;
  const number = request.body.number;

  /* if (!(name && number)) {
    return response.status(400).json({
      error: 'content missing',
    });
  } */

  /*   if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } */

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    //.then(saved => saved.toJSON())
    .then((result) => {
      response.json(result);
      console.log(`added ${name} number ${number} to phonebook`);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  console.log(`file: index.js ~ line 88 ~ request.body =====>`, request.body);
  console.log(`file: index.js ~ line 89 ~ request.params.id =====>`, request.params.id);
  const body = request.body;

  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true })
    .then((updatedPerson) => {
      //console.log(`updatedPerson =====>`, updatedPerson);
      if (updatedPerson) {
        response.json(updatedPerson.toJSON());
      } else {
        response.status(204).end();
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response
    .status(404)
    .send({ error: 'It\'s unknown endpoint. Please check address' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(`file: index.js ~ line 122 ~ errorHandler ~ error`, error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
