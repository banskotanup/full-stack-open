import { useState } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '9876543210', id: 1 },
    { name: 'Anup Banskota', number: '9876543210', id: 2 },
    { name: 'Sanam Mishra', number: '9876543210', id: 3 },
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const personsToShow = persons.filter((p) => {
    return p.name.toLowerCase().includes(filterName.toLowerCase());
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleInputChange = (e) => {
    setFilterName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={ handleInputChange } />
      <h2>add a new</h2>
      <PersonForm handleFormSubmit={handleFormSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={ handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={ personsToShow} />
    </div>
  )
}

export default App