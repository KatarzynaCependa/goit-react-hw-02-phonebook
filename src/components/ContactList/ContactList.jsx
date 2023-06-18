import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ContactList/ContactList.module.css';

class ContactList extends Component {
  deleteData = (evt, contactId) => {
    this.props.onDeleteContact(contactId);
  };

  render() {
    const { contacts } = this.props;
    return (
      <ul>
        {contacts.map(contact => {
          return (
            <div key={contact.id}>
              <li className={css.listEl}>
                {contact.name}: {contact.number}
                <button
                  type="button"
                  onClick={evt => this.deleteData(evt, contact.id)}
                  className={css.delBtn}
                >
                  Delete
                </button>
              </li>
            </div>
          );
        })}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
