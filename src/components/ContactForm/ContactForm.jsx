import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    addContact({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form action="" onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        <span className={s.namespan}>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={s.input}
          placeholder="Enter name"
        />
      </label>
      <label className={s.label}>
        <span className={s.numberspan}>Number</span>
        <input
          type="text"
          name="number"
          placeholder="Enter phone number"
          value={number}
          onChange={handleChange}
          className={s.input}
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
