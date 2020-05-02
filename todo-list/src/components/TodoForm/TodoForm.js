import React from 'react';
import PropTypes from 'prop-types';
import styles  from './TodoForm.module.scss'

const ToDoForm = ({ test }) => {
  return (
    <form className={styles['todo-form']} data-test="form">
      <input type="text" data-test="input" />
      <buttom type="submit" data-test="button" >Submit</buttom>
    </form>
  );
};

ToDoForm.propTypes = {
  test: PropTypes.string.isRequired,
};

export default ToDoForm;
