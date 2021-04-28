import * as React from 'react';
import { screen } from '@testing-library/react';

import { renderWithTheme } from 'common/utils/jest';
import Loader from './Loader';

describe('Loader', () => {
  it('should render the loader', async () => {
    renderWithTheme(
      <Loader isLoading>
        <p>Test</p>
      </Loader>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render the children', async () => {
    renderWithTheme(
      <Loader>
        <p>Test</p>
      </Loader>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render the children function', async () => {
    const renderContent = jest.fn().mockImplementation(() => <p>Test</p>);
    renderWithTheme(<Loader>{renderContent}</Loader>);

    expect(renderContent).toHaveBeenCalled();
  });
});
