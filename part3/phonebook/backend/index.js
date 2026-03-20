const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.static('dist'));

const morgan = require("morgan");

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

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.get("/api/persons", (req, res) => {
    res.json(persons);
})

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    })
  }
  const isUniqueName = persons.some(p => p.name === body.name);
  if (isUniqueName) {
    return res.status(409).json({
      error: "name must be unique"
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person);
  res.json(person);
})

app.get("/info", (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personExists = persons.some(p => p.id === id);
  if (!personExists) {
    return res.status(404).end();
  }

  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
