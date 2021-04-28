import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IAccount } from 'common/types/account';
import { StoreContext } from 'context/Store';
import { renderWithTheme } from 'common/utils/jest';
import { ExchangeAccountType } from 'common/types/exchanges';
import { getCurrencySymbol } from 'common/utils/currencies';
import { formatNumber } from 'common/utils/numbers';
import ExchangeInput from './ExchangeInput';

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

describe('ExchangeInput', () => {
  it('should render an empty input with EUR as currency', async () => {
    renderWithTheme(
      <ExchangeInput
        account={mockedAccounts[0]}
        value=""
        type={ExchangeAccountType.Seller}
        onValueChange={jest.fn()}
        onAccountChange={jest.fn()}
      />,
      { wrapper: Contexts }
    );

    expect(screen.getByRole('button', { name: /eur/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should show the right balance', async () => {
    renderWithTheme(
      <ExchangeInput
        account={mockedAccounts[0]}
        value=""
        type={ExchangeAccountType.Seller}
        onValueChange={jest.fn()}
        onAccountChange={jest.fn()}
      />,
      { wrapper: Contexts }
    );

    expect(screen.getByRole('button', { name: /balance/i })).toHaveTextContent(
      `Balance: ${formatNumber(mockedAccounts[0].balance)} ${getCurrencySymbol(
        mockedAccounts[0].currency
      )}`
    );
  });

  it('should be able to change the amount', async () => {
    const onValueChange = jest.fn();

    renderWithTheme(
      <ExchangeInput
        account={mockedAccounts[0]}
        value=""
        type={ExchangeAccountType.Seller}
        onValueChange={onValueChange}
        onAccountChange={jest.fn()}
      />,
      { wrapper: Contexts }
    );

    const amountInput = screen.getByRole('textbox');
    const amount = '100';
    userEvent.type(amountInput, amount);

    expect(amountInput).toHaveValue(
      `-${amount} ${getCurrencySymbol(mockedAccounts[0].currency)}`
    );
  });

  it('should clamp the amount to two decimals', async () => {
    const onValueChange = jest.fn();

    renderWithTheme(
      <ExchangeInput
        account={mockedAccounts[0]}
        value=""
        type={ExchangeAccountType.Seller}
        onValueChange={onValueChange}
        onAccountChange={jest.fn()}
      />,
      { wrapper: Contexts }
    );

    const amountInput = screen.getByRole('textbox');
    const amount = '100.13232';
    userEvent.type(amountInput, amount);

    expect(amountInput).toHaveValue(
      `-${100.13} ${getCurrencySymbol(mockedAccounts[0].currency)}`
    );
  });

  it('should be able to select GBP account', async () => {
    const onAccountChange = jest.fn();

    renderWithTheme(
      <ExchangeInput
        account={mockedAccounts[0]}
        value=""
        type={ExchangeAccountType.Seller}
        onValueChange={jest.fn()}
        onAccountChange={onAccountChange}
      />,
      { wrapper: Contexts }
    );

    const accountButton = screen.getByRole('button', { name: /eur/i });
    userEvent.click(accountButton);

    const GBPOption = screen.getByLabelText('GBP');
    const GBPAccount = mockedAccounts.find(a => a.currency === 'GBP');
    userEvent.click(GBPOption);
    expect(onAccountChange).toHaveBeenCalledWith(GBPAccount);
  });

  it('should change the amount when clicking on balance', async () => {
    const onValueChanged = jest.fn();

    renderWithTheme(
      <ExchangeInput
        account={mockedAccounts[0]}
        value=""
        type={ExchangeAccountType.Seller}
        onValueChange={onValueChanged}
        onAccountChange={jest.fn()}
      />,
      { wrapper: Contexts }
    );

    const balanceButton = screen.getByRole('button', { name: /balance/i });
    userEvent.click(balanceButton);

    expect(onValueChanged).toHaveBeenCalledWith(
      formatNumber(mockedAccounts[0].balance)
    );
  });

  it('should be able to close the accounts modal without selecting something', async () => {
    const onAccountChange = jest.fn();

    renderWithTheme(
      <ExchangeInput
        account={mockedAccounts[0]}
        value=""
        type={ExchangeAccountType.Seller}
        onValueChange={jest.fn()}
        onAccountChange={onAccountChange}
      />,
      { wrapper: Contexts }
    );

    const accountButton = screen.getByRole('button', { name: /eur/i });
    userEvent.click(accountButton);

    const closeButton = screen.getByLabelText('close');
    userEvent.click(closeButton);
    expect(onAccountChange).not.toHaveBeenCalled();
  });
});
