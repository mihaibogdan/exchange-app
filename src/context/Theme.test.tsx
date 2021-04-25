import * as React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { ITheme, Theme } from 'common/types/theme';
import { THEME } from 'constants/theme';
import ThemeContextProvider from './Theme';

beforeEach(() => window.localStorage.clear());

describe('ThemeContext', () => {
  it('should have a light theme by default', () => {
    const themeProvider = shallow(
      <ThemeContextProvider>Test!</ThemeContextProvider>
    );
    expect(
      (themeProvider.find(ThemeProvider).prop('theme') as ITheme).type
    ).toBe(Theme.Light);
  });

  it('should have get a dark theme from localStorage', () => {
    window.localStorage.setItem(THEME, 'dark');
    const themeProvider = shallow(
      <ThemeContextProvider>Test!</ThemeContextProvider>
    );
    expect(
      (themeProvider.find(ThemeProvider).prop('theme') as ITheme).type
    ).toBe(Theme.Dark);
  });

  it('should start with light theme and then toggle to dark', () => {
    const themeProvider = shallow(
      <ThemeContextProvider>Test!</ThemeContextProvider>
    );
    themeProvider.prop('value').toggleTheme();
    expect(
      (themeProvider.find(ThemeProvider).prop('theme') as ITheme).type
    ).toBe(Theme.Dark);
  });

  it('should save the dark theme to localStorage', () => {
    const themeProvider = shallow(
      <ThemeContextProvider>Test!</ThemeContextProvider>
    );
    themeProvider.prop('value').toggleTheme();
    expect(window.localStorage.getItem(THEME)).toBe(Theme.Dark);
  });
});
