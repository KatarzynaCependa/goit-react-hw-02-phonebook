import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import css from 'components/App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  // przyjmuję (name i number) jako argumenty
  // destrukturyzacja obiektu this.state, aby uzyskać dostęp do właściwości { contacts }
  // stosuję metodę map na tablicy contacts, aby utworzyć nową tablicę contactNames, która zawiera tylko imiona kontaktów
  addNewName = (name, number) => {
    const { contacts } = this.state;
    const contactNames = contacts.map(contact => {
      return contact.name;
    });

    if (contactNames.includes(name))
      return alert(`${name} is alredy in contacts`);

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          name,
          number,
          id: nanoid(),
        },
      ],
    }));
  };

  showFilteredContacts = () => {
    // destrukturyzacja stanu komponentu App aby otrzymać dostęp do właściwości contacts (tablica kontaktów) i filter (tekst filtrowania)
    const { contacts, filter } = this.state;
    // metoda filter uruchomiona na tablicy contacts - zwraca nową tablicę z wynikami, które pasują do wartości input
    return contacts.filter(cont =>
      cont.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // contactId jako argument
  handleDeleteContact = contactId => {
    // prevState (poprzedni stan) jako argument
    this.setState(prevState => ({
      // metoda filter iteruje przez tablicę prevState.contacts i zwraca nową tablicę spełniającą poniższy waurunek
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = newValue => {
    this.setState({
      filter: newValue,
    });
  };

  render() {
    return (
      <>
        <h1 className={css.header}>Phonebook</h1>
        {/* przekazujemy funkcję do props onSubmit */}
        <ContactForm onSubmit={this.addNewName} />
        <h2 className={css.header}>Contacts</h2>
        <Filter onChange={this.handleFilterChange} />
        <ContactList
          contacts={this.showFilteredContacts()}
          onDeleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}
