import * as React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Loader', () => {
  it('should render a loader with "Test!" as text', () => {
    const button = shallow(<Button>Test!</Button>);
    expect(button.text()).toBe('Test!');
  });
});
