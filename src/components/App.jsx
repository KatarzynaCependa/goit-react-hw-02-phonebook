import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import css from 'components/App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
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

  // contactId jako argument
  handleDeleteContact = contactId => {
    // prevState (poprzedni stan) jako argument
    this.setState(prevState => ({
      // metoda filter iteruje przez tablicę prevState.contacts i zwraca nową tablicę spełniającą poniższy waurunek
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <>
        <h1 className={css.header}>Phonebook</h1>
        {/* przekazujemy funkcję do props onSubmit */}
        <ContactForm onSubmit={this.addNewName} />
        <h2 className={css.header}>Contacts</h2>
        {/* <Filter /> */}
        <ContactList
          contacts={this.state.contacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}
