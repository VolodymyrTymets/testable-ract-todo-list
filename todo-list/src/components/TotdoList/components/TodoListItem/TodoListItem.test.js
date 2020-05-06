import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';

import TodoListItem from './TodoListItem';

const requiredProps = {
  todo: '',
};

const setup = (props) => shallow(
  <TodoListItem {...requiredProps} {...props}  />);

describe("<TodoListItem /> - render", () => {
  it("should render without error", () => {
    const wrapper = setup();
    // if has not snapshots
    expect(wrapper.length).not.toBe(0);
  });
  it("should not throw warning with expected props", () => {
    const props = {
      todo: '',
    };
    // todo move to utils
    const propError = checkPropTypes(
      TodoListItem.propTypes,
      props,
      'prop',
      TodoListItem.name);
    expect(propError).toBeUndefined();
  })
});


// todo: move to utils
const findById = (component, id) => component.find(`[data-test="${id}"]`);

describe("<TodoListItem /> - components", () => {
  it("should contains list", () => {
    const wrapper = setup();
    const list = findById(wrapper, 'list-item');
    expect(list.length).not.toBe(0);
  })
});

