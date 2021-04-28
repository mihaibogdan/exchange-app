import * as React from 'react';
import { screen } from '@testing-library/react';

import { renderWithTheme } from 'common/utils/jest';
import Typography from './Typography';

beforeEach(() => window.localStorage.clear());

describe('Typography', () => {
  it('should render the text', () => {
    renderWithTheme(<Typography>Typography!</Typography>);
    expect(screen.getByText('Typography!')).toHaveTextContent('Typography!');
  });

  it('should render a paragraph as default', () => {
    renderWithTheme(<Typography>Typography!</Typography>);
    const paragraph = screen.getByText('Typography!') as HTMLElement;
    expect(paragraph.tagName).toBe('P');
  });

  describe('prop: color', () => {
    it('should have color text as default', () => {
      renderWithTheme(<Typography>Typography!</Typography>);

      expect(screen.getByText('Typography!')).toHaveClass('color-text');
    });

    it('should be able to accept a color prop', () => {
      renderWithTheme(<Typography color="primary">Typography!</Typography>);

      expect(screen.getByText('Typography!')).toHaveClass('color-primary');
    });
  });
});
