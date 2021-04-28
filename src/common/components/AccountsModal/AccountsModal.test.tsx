import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StoreContext } from 'contexts/Store';
import { IAccount } from 'common/types/account';
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

const mockedExchangedRates = {
  base: 'USD',
  rates: {
    EUR: 0.824834,
    GBP: 0.717073,
    USD: 1,
  },
};

fetchMock.mockResponse(JSON.stringify(mockedExchangedRates));

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
  it('should render two currencies', async () => {
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
    userEvent.type(input, 'EUR');
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
    userEvent.type(input, 'MISSING');
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
    userEvent.type(input, 'GBP');

    const GBPOption = screen.getByLabelText('GBP');
    const GBPAccount = mockedAccounts.find(a => a.currency === 'GBP');
    userEvent.click(GBPOption);
    expect(onSelectAccount).toHaveBeenCalledWith(GBPAccount);
  });
});
