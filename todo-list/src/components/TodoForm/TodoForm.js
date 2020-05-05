import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles  from './TodoForm.module.scss'

const ToDoForm = ({ onAddTag }) => {
  const [input, setInput] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    onAddTag({ title: input });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value)
  };

  return (
    <form className={styles['todo-form']} data-test="form" onSubmit={onSubmit}>
      <input type="text" data-test="input" onChange={onChange} />
      <button type="submit" data-test="button" >Submit</button>
    </form>
  );
};

ToDoForm.propTypes = {
  onAddTag: PropTypes.func.isRequired,
};

export default ToDoForm;
