import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StoreContextProvider from 'contexts/Store';
import ExchangeRatesProvider from 'contexts/ExchangeRates';
import { renderWithTheme } from 'common/utils/jest';
import Exchanges from './Exchanges';

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
    <StoreContextProvider>{children}</StoreContextProvider>
  </ExchangeRatesProvider>
);

describe('Exchanges', () => {
  it('should be able to sell some EUR', async () => {
    renderWithTheme(<Exchanges />, { wrapper: Contexts });
    const sellerInput = await screen.findByLabelText('seller');
    const exchangeButton = await screen.findByRole('button', {
      name: /sell eur for usd/i,
    });
    userEvent.type(sellerInput, '50');
    userEvent.click(exchangeButton);

    await waitFor(() => expect(screen.getAllByRole('listitem').length).toBe(1));
  });

  it('should be able to buy some EUR', async () => {
    renderWithTheme(<Exchanges />, { wrapper: Contexts });
    const toggleTypeButton = await screen.findByLabelText('toggle type');
    userEvent.click(toggleTypeButton);

    const sellerInput = await screen.findByLabelText('seller');
    const exchangeButton = await screen.findByRole('button', {
      name: /buy eur for usd/i,
    });
    userEvent.type(sellerInput, '50');
    userEvent.click(exchangeButton);

    await waitFor(() => expect(screen.getAllByRole('listitem').length).toBe(1));
  });
});
