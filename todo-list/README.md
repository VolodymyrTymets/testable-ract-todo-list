# Testable Todo app

## To setup test 

### 1 setup deps
>  "enzyme"

>  "jest-enzyme"

>  "enzyme-adapter-react-16" // to react +16

>  "check-prop-types" // to props validation 

>  "enzyme-to-json" // to snapshot testing to props validation

### 2 Add configs to setupTests 
> https://www.npmjs.com/package/enzyme-adapter-react-16


```
import Enzyme from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

```

### 2.1 add .babelrc to remove test-data from dom
> https://www.npmjs.com/package/babel-plugin-react-remove-properties
```
    {
      "env": {
        "production": {
          "plugins": [
            "react-remove-properties", {
              "properties": ["data-test"]
            }
        }
      }
    }
```

### 3 Create `Component.test` file and run
> yarn test --watch
#### 3.1 import deps
```
import React from 'react';
import { shallow } from 'enzyme';

import TodoForm from './TodoForm';
```
 
#### 3.3 Create setup function
```
const setup = (props) => shallow(
  <TodoForm {...props} {...requiredProps} />);

```

#### 3.4 Create First test 

```$xslt
describe("<TodoForm /> - render", () => {
  it("should render without error", () => {
    const wrapper = setup();
    expect(wrapper.length).not.toBe(0);
  });
});
```

#### 3.5 Props validation
```$xslt
  import checkPropTypes from 'check-prop-types';
  it("should not throw warning with expected props", () => {
    const props = {
      test: 'test'
    };
    // todo move to utils
    const propError = checkPropTypes(
      TodoForm.propTypes,
      props,
      'prop',
      TodoForm.name);
    expect(propError).toBeUndefined();
  })
```

#### 3.6 Snapshot validation
> https://www.npmjs.com/package/enzyme-to-json
```$xslt
  import toJson from 'enzyme-to-json';
  
  it("should render without error", () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
```
> then check ./__snapshots__/*

#### 3.7 Dom checking
```$xslt
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
```

#### 3.7 mock functions