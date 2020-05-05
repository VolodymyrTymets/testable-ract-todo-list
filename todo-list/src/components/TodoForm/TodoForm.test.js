import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TodoForm from './TodoForm';

const requiredProps = {
  onAddTag: jest.fn(),
};

const setup = (props) => shallow(
  <TodoForm {...requiredProps} {...props}  />);

describe("<TodoForm /> - render", () => {
  it("should render without error", () => {
    const wrapper = setup();
    // if has not snapshots
    expect(wrapper.length).not.toBe(0);
    // if has snapshots
    //expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("should not throw warning with expected props", () => {
    const props = {
      onAddTag: jest.fn(),
    };
    // todo move to utils
    const propError = checkPropTypes(
      TodoForm.propTypes,
      props,
      'prop',
      TodoForm.name);
    expect(propError).toBeUndefined();
  })
});


// todo: move to utils
const findById = (component, id) => component.find(`[data-test="${id}"]`);

describe("<TodoForm /> - components", () => {
  it("should contains form, input, button", () => {
    const wrapper = setup();

    const form = findById(wrapper, 'form');
    const input = findById(wrapper, 'input');
    const button = findById(wrapper, 'button');

    expect(form.length).not.toBe(0);
    expect(input.length).not.toBe(0);
    expect(button.length).not.toBe(0);
  })
});

// todo check snapshot sate for each test

describe("<TodoForm /> - behaviour", () => {
  it("should call onAddTag when submit form", () => {
    const onAddTagMoc = jest.fn();
    const wrapper = setup({ onAddTag: onAddTagMoc });

    const input = findById(wrapper, 'input');
    input.simulate('change', { target: { value: 'test' } });

    // need to update wrapper to allow state update value
    const form = findById(wrapper.update(), 'form');
    form.simulate('submit', { preventDefault: jest.fn() });

    expect(onAddTagMoc).toHaveBeenCalledWith({ title: 'test' })
  })
});

// todo check Mock functions here https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675