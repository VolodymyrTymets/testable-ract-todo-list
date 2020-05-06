import React from 'react';
import PropTypes from 'prop-types';

const TodoListItem = ({ todo }) => {
  return (
    <li data-test="list-item" >{todo}</li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.string,
};

export default TodoListItem;
