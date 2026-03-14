import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [successMessage, setSuccessMessage] = useState("Some success message");
  const [errorMessage, setErrorMessage] = useState("some errors");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initializeData) => {
      console.log("promise fulfilled");
      setPersons(initializeData);
    });
  }, []);

  const personsToShow = persons.filter((p) => {
    return p.name.toLowerCase().includes(filterName.toLowerCase());
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.some((p) => p.name === newName)) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`,
      );
      if (!confirm) {
        return;
      }

      const person = persons.find((p) => p.name === newName);
      const changedPerson = { ...person, number: newNumber };

      personService
        .update(person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id === person.id ? returnedPerson : p)),
          );
          setIsSuccess(true);
          setSuccessMessage(`${newName} phone number changed to ${newNumber}`);
          setTimeout(() => {
            setSuccessMessage(null);
            setIsSuccess(false);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          setIsError(true);
          setErrorMessage(`Person ${newName} was already removed from server.`);
          setTimeout(() => {
            setErrorMessage(null);
            setIsError(false);
          }, 5000);
        });
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setIsSuccess(true);
      setSuccessMessage(`Added ${newName}`);
      setTimeout(() => {
        setSuccessMessage(null);
        setIsSuccess(false);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleInputChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if (!confirm) {
      return;
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.log(err);
        alert(`The person was already removed from server.`);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {isSuccess && <Notification isSuccess={isSuccess} message={successMessage} />}
      {isError && <Notification isError={isError} message={errorMessage} />}
      <Filter value={filterName} onChange={handleInputChange} />
      <h2>add a new</h2>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
