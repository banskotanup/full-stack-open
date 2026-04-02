require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./model/phonebook");
const cors = require("cors");
app.use(cors());

app.use(express.static('dist'));

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
}

const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
const phonebook = require("./model/phonebook");

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0;
  return String(maxId + 1);
}

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: "1",
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: "2",
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: "3",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.get("/api/persons", (req, res, next) => {
  Person.find({}).then(result => {
    console.log(`Fetched ${result.length} successfully`);
    res.json(result);
  })
    .catch(error => next(error));
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save({}).then(savedPerson => {
    res.json(savedPerson);
  })
    .catch(error => next(error));
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const id = req.params.id;

  Person.findById(id).then(person => {
    if (!person) {
      return res.status(404).end();
    }
    person.name = body.name;
  person.number = body.number;

    return person.save().then(updatedPerson => {
      res.json(updatedPerson);
    });
  })
  .catch(error => next(error));
})

app.get("/info", (req, res) => {
  Person.find({}).then(persons => {
    res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
  })
    .catch(error => {
      console.log(error);
      return res.status(500).send("Error retrieving info");
    });
})

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id).then(p => {
    res.json(p);
  })
    .catch(error => next(error));
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id).then(person => {
    if (!person) {
      return res.status(404).end();
    }
    return res.status(204).end();
  })
    .catch(error => next(error));
})

app.use(errorHandler);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
