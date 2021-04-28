import * as React from 'react';

import { renderWithTheme } from 'common/utils/jest';
import Button from './Button';

describe('Loader', () => {
  it('should render a loader with "Test!" as text', () => {
    const { getByRole } = renderWithTheme(<Button>Test!</Button>);
    const button = getByRole('button');
    expect(button).toHaveTextContent('Test!');
  });

  it('should render a text primary button', () => {
    const { getByRole } = renderWithTheme(
      <Button color="primary">Test!</Button>
    );
    const button = getByRole('button');
    expect(button).toHaveClass('color-primary');
  });

  it('should render a contained button', () => {
    const { getByRole } = renderWithTheme(
      <Button variant="contained">Test!</Button>
    );
    const button = getByRole('button');
    expect(button).toHaveClass('variant-contained');
  });

  it('should render a small icon button', () => {
    const { getByRole } = renderWithTheme(
      <Button variant="icon" small>
        Test!
      </Button>
    );
    const button = getByRole('button');
    expect(button).toHaveClass('variant-icon');
    expect(button).toHaveClass('small');
  });
});
