import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import darkTheme from 'themes/dark';

export const renderWithTheme = (Component, props: RenderOptions = {}) =>
  render(<ThemeProvider theme={darkTheme}>{Component}</ThemeProvider>, props);
