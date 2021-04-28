import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeProvider from 'context/Theme';
import { renderWithTheme } from 'common/utils/jest';
import { THEME } from 'common/constants/theme';
import Settings from './Settings';

const Contexts = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

beforeEach(() => {
  localStorage.setItem(THEME, 'dark');
});

describe('Settings', () => {
  it('should open the modal on settings button click', async () => {
    renderWithTheme(<Settings />, { wrapper: Contexts });

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should have the dark theme enabled', async () => {
    renderWithTheme(<Settings />, { wrapper: Contexts });

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should switch to light theme', async () => {
    renderWithTheme(<Settings />, { wrapper: Contexts });

    userEvent.click(screen.getByRole('button'));
    const toggle = screen.getByRole('checkbox');
    userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('should switch to dark theme', async () => {
    localStorage.setItem(THEME, 'light');
    renderWithTheme(<Settings />, { wrapper: Contexts });

    userEvent.click(screen.getByRole('button'));
    const toggle = screen.getByRole('checkbox');
    userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('should switch to light theme and close the modal', async () => {
    renderWithTheme(<Settings />, { wrapper: Contexts });

    userEvent.click(screen.getByRole('button'));
    const toggle = screen.getByRole('checkbox');
    userEvent.click(toggle);
    expect(toggle).not.toBeChecked();

    userEvent.click(screen.getByLabelText('close'));
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });
});
