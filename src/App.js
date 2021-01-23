import { useState, useEffect } from 'react';

import shortid from 'shortid';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

import './App.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts !== null) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const id = shortid.generate();
    const contact = {
      id,
      name,
      number,
    };

    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => id !== contact.id),
    );
  };

  const filterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normilizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter),
    );
  };

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm addContact={addContact} />
      <p className="title statistics">Statistics</p>
      <Filter value={filter} onChange={filterChange} />
      <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
    </div>
  );
}
