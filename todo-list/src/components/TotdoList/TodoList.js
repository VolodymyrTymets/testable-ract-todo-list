import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from './components/TodoListItem/TodoListItem';

const TodoList = ({ list }) => {
  return (
    <ul data-test="list" >
      {list.map((todo, index) => (
        <TodoListItem key={index} todo={todo} />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  list: PropTypes.array,
};

export default TodoList;
