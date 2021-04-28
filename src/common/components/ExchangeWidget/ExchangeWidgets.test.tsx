import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StoreContext } from 'contexts/Store';
import ExchangeRatesProvider from 'contexts/ExchangeRates';
import { IAccount } from 'common/types/account';
import { renderWithTheme } from 'common/utils/jest';
import { exchange } from 'common/utils/exchangeRates';
import { getCurrencySymbol } from 'common/utils/currencies';
import ExchangeWidget from './ExchangeWidget';

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
  {
    id: '5f174911-2409-4b3b-a527-62c7ac9b3f10',
    currency: 'USD',
    currencyName: 'United States Dollar',
    balance: 150,
    countryCode: 'US',
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
  <ExchangeRatesProvider>
    <StoreContext.Provider
      value={{
        accounts: mockedAccounts,
        transactions: [],
        exchangeBetweenAccounts: jest.fn(),
      }}
    >
      {children}
    </StoreContext.Provider>
  </ExchangeRatesProvider>
);

describe('ExchangeWidget', () => {
  it('should render a widget with two accounts: EUR and GBP', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );

    expect(
      await screen.findByRole('button', { name: 'EUR' })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'GBP' })
    ).toBeInTheDocument();
  });

  it('should render a widget with two accounts: EUR and GBP', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );

    expect(
      await screen.findByRole('button', { name: 'EUR' })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'GBP' })
    ).toBeInTheDocument();
  });

  it('should disable the button when there is no amount', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );

    expect(await screen.findByRole('button', { name: /sell/i })).toBeDisabled();
  });

  it('should compute the right conversion', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );
    const sellerInput = await screen.findByLabelText('seller');
    const buyerInput = await screen.findByLabelText('buyer');
    userEvent.type(sellerInput, '50');
    expect(buyerInput).toHaveValue(
      `+${exchange(50, 'EUR', 'GBP', mockedExchangedRates)} ${getCurrencySymbol(
        'GBP'
      )}`
    );
  });

  it('should change the account and compute the right conversion', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );
    const sellerAccountButton = await screen.findByRole('button', {
      name: 'EUR',
    });
    const sellerInput = await screen.findByLabelText('seller');
    const buyerInput = await screen.findByLabelText('buyer');
    userEvent.click(sellerAccountButton);
    const USDOption = screen.getByLabelText('USD');
    userEvent.click(USDOption);

    userEvent.type(sellerInput, '50');
    expect(buyerInput).toHaveValue(
      `+${exchange(50, 'USD', 'GBP', mockedExchangedRates)} ${getCurrencySymbol(
        'GBP'
      )}`
    );
  });

  it('should switch from "Sell" to "Buy"', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );
    const toggleTypeButton = await screen.findByLabelText('toggle type');
    userEvent.click(toggleTypeButton);

    expect(screen.getByText('Buy EUR')).toBeInTheDocument();
  });

  it('should reset the inputs after the fulfillment of exchange', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );
    const sellerInput = await screen.findByLabelText('seller');
    const buyerInput = await screen.findByLabelText('buyer');
    const exchangeButton = await screen.findByRole('button', {
      name: /sell eur for gbp/i,
    });
    userEvent.type(sellerInput, '50');
    userEvent.click(exchangeButton);
    expect(sellerInput).toHaveValue('');
    expect(buyerInput).toHaveValue('');
  });

  it('should disable the form if the seller exceeds balance', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );
    const sellerInput = await screen.findByLabelText('seller');
    const exchangeButton = screen.getByRole('button', {
      name: /sell eur for gbp/i,
    });
    userEvent.type(sellerInput, '99999');
    expect(exchangeButton).toBeDisabled();
  });

  it('should disable the form the buyer exceeds balance', async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );
    const toggleTypeButton = await screen.findByLabelText('toggle type');
    userEvent.click(toggleTypeButton);

    const sellerInput = await screen.findByLabelText('seller');
    const exchangeButton = screen.getByRole('button', {
      name: /buy eur for gbp/i,
    });
    userEvent.type(sellerInput, '99999');
    expect(exchangeButton).toBeDisabled();
  });

  it("should change buyer's account and sell", async () => {
    renderWithTheme(
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="GBP" />,
      { wrapper: Contexts }
    );
    const buyerAccountButton = await screen.findByRole('button', {
      name: 'GBP',
    });
    const buyerInput = await screen.findByLabelText('buyer');
    const exchangeButton = screen.getByRole('button', {
      name: /sell eur for gbp/i,
    });
    userEvent.click(buyerAccountButton);
    const GBPOption = screen.getByLabelText('USD');
    userEvent.click(GBPOption);
    userEvent.type(buyerInput, '50');
    userEvent.click(exchangeButton);

    expect(buyerInput).toHaveValue('');
  });
});
