import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from './components/TodoListItem/TodoListItem';
import styles from './TodoList.module.scss'

const TodoList = ({ list }) => {
  return (
    <div className={`row ${styles['todo-list']}`}>
      <div className="col-lg-6">
        <ul data-test="list" className="list-group">
          {list.map((todo, index) => (
            <TodoListItem key={index} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  list: PropTypes.array,
};

export default TodoList;
