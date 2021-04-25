import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import darkTheme from 'themes/dark';

export const shallowWithTheme = (Component, theme = darkTheme) =>
  shallow(<ThemeProvider theme={theme}>{Component}</ThemeProvider>);

export const mountWithTheme = (Component, theme = darkTheme) =>
  mount(<ThemeProvider theme={theme}>{Component}</ThemeProvider>);

export const renderWithTheme = (Component, theme = darkTheme) =>
  render(<ThemeProvider theme={theme}>{Component}</ThemeProvider>);
