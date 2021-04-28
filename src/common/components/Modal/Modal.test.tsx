import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from 'common/utils/jest';
import Modal from './Modal';

describe('Modal', () => {
  it('should render the children', async () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Test</p>
      </Modal>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should close the modal when pressing ESC', async () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <p>Test</p>
      </Modal>
    );

    userEvent.keyboard('{esc}');
    expect(onClose).toHaveBeenCalled();
  });
});
