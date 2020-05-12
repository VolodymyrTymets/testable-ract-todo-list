import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

const setup = () => shallow(<App />);

describe("<App /> - render", () => {
 it("should render without error", () => {
  const wrapper = setup();
  expect(wrapper.length).not.toBe(0);
 });
});

