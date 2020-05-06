import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';

import TodoList from './TodoList';

const requiredProps = {
  list: [],
};

const setup = (props) => shallow(
  <TodoList {...requiredProps} {...props}  />);

describe("<TodoListItem /> - render", () => {
  it("should render without error", () => {
    const wrapper = setup();
    // if has not snapshots
    expect(wrapper.length).not.toBe(0);
  });
  it("should not throw warning with expected props", () => {
    const props = {
      list: [],
    };
    // todo move to utils
    const propError = checkPropTypes(
      TodoList.propTypes,
      props,
      'prop',
      TodoList.name);
    expect(propError).toBeUndefined();
  })
});


// todo: move to utils
const findById = (component, id) => component.find(`[data-test="${id}"]`);

describe("<TodoForm /> - components", () => {
  it("should contains list", () => {
    const wrapper = setup();
    const list = findById(wrapper, 'list');
    expect(list.length).not.toBe(0);
  })
  it("should contains list on ListItems", () => {
    const testList = ['test', 'test2', 'test3'];
    const wrapper = setup({ list: testList });
    const list = findById(wrapper, 'list');
    expect(list.children().length).toEqual(testList.length);
  })
});

