import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { IAccount } from 'common/types/account';
import { StoreContext } from 'context/Store';
import { renderWithTheme } from 'common/utils/jest';
import AccountsModal from './AccountsModal';

const mockedAccounts: IAccount[] = [
  {
    id: '4a784950-cf9c-414a-9858-734aedc0f4a5',
    currency: 'EUR',
    currencyName: 'Euro',
    balance: 250,
    countryCode: 'EU',
  },
  {
    id: '28172914-2409-4b3b-a527-62c7ac9b3f10',
    currency: 'GBP',
    currencyName: 'British Pound',
    balance: 15040,
    countryCode: 'GB',
  },
];

const Contexts = ({ children }) => (
  <StoreContext.Provider
    value={{
      accounts: mockedAccounts,
      transactions: [],
      exchangeBetweenAccounts: jest.fn(),
    }}
  >
    {children}
  </StoreContext.Provider>
);

describe('AccountsModal', () => {
  it('should render 2 currencies', async () => {
    renderWithTheme(
      <AccountsModal
        isOpen={true}
        selectedAccount={mockedAccounts[0]}
        onSelectAccount={() => {}}
        onClose={() => {}}
      />,
      { wrapper: Contexts }
    );

    expect(screen.getByRole('list').childNodes.length).toBe(2);
  });

  it('should search for EUR', async () => {
    renderWithTheme(
      <AccountsModal
        isOpen={true}
        selectedAccount={mockedAccounts[0]}
        onSelectAccount={() => {}}
        onClose={() => {}}
      />,
      { wrapper: Contexts }
    );

    const input = screen.getByLabelText('search');
    fireEvent.change(input, { target: { value: 'EUR' } });
    expect(screen.getByRole('list').childNodes.length).toBe(1);
  });

  it('should have 0 results after searching for missing currency', async () => {
    renderWithTheme(
      <AccountsModal
        isOpen={true}
        selectedAccount={mockedAccounts[0]}
        onSelectAccount={() => {}}
        onClose={() => {}}
      />,
      { wrapper: Contexts }
    );
    const currenciesList = screen.getByRole('list');
    const input = screen.getByLabelText('search');
    fireEvent.change(input, { target: { value: 'MISSING' } });
    expect(currenciesList.childNodes.length).toBe(0);
  });

  it('should search for GBP and be able to select it', async () => {
    const onSelectAccount = jest.fn();
    renderWithTheme(
      <AccountsModal
        isOpen={true}
        selectedAccount={mockedAccounts[0]}
        onSelectAccount={onSelectAccount}
        onClose={() => {}}
      />,
      { wrapper: Contexts }
    );
    const input = screen.getByLabelText('search');
    fireEvent.change(input, { target: { value: 'GBP' } });

    const GBPOption = screen.getByLabelText('GBP');
    const GBPAccount = mockedAccounts.find(a => a.currency === 'GBP');
    fireEvent.click(GBPOption);
    expect(onSelectAccount).toHaveBeenCalledWith(GBPAccount);
  });
});
