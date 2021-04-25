import * as React from 'react';

import { mountWithTheme } from 'common/utils/jest';
import Typography from './Typography';

beforeEach(() => window.localStorage.clear());

describe('Typography', () => {
  it('should render the text', () => {
    const typography = mountWithTheme(<Typography>Typography!</Typography>);
    expect(typography.text()).toBe('Typography!');
  });

  it('should render a paragraph as default', () => {
    const typography = mountWithTheme(<Typography>Typography!</Typography>);

    expect(typography.find('p').exists()).toBeTruthy();
  });

  describe('prop: color', () => {
    it('should have color text as default', () => {
      const typography = mountWithTheme(<Typography>Typography!</Typography>);

      expect(typography.find('p').hasClass('color-text')).toBeTruthy();
    });

    it('should be able to accept a color prop', () => {
      const typography = mountWithTheme(
        <Typography color="primary">Typography!</Typography>
      );

      expect(typography.find('p').hasClass('color-primary')).toBeTruthy();
    });

    it('should be able to accept a shade prop', () => {
      const typography = mountWithTheme(
        <Typography color="primary" shade="light">
          Typography!
        </Typography>
      );

      expect(typography.find('p').hasClass('shade-light')).toBeTruthy();
    });
  });
});
