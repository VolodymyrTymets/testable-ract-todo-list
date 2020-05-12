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
    <div className={`row ${styles['todo-form']}`}>
      <div className="col-lg-6">
      <form  data-test="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">What to do?:</label>
          <input data-test="input" type="text" className="form-control" onChange={onChange} />
        </div>
        <button className="btn btn-primary" type="submit" data-test="button" >Submit</button>
      </form>
      </div>
    </div>
  );
};

ToDoForm.propTypes = {
  onAddTag: PropTypes.func.isRequired,
};

export default ToDoForm;
