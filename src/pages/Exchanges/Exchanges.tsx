import React, { useContext, useReducer } from 'react';

import { ExchangeType } from 'common/types/exchanges';
import ExchangeWidget from 'common/components/ExchangeWidget';
import { AccountsContext, IAccountsContext } from 'context/Accounts';
import {
  ExchangeRatesContext,
  IExchangeRatesContext,
} from 'context/ExchangeRates';
import { Container } from 'common/styles/layout';
import reducer, { IExchangesState } from './logic/reducer';

const init = ({ accounts }): IExchangesState => ({
  main: {
    account: accounts.find(a => a.currency === 'GBP'),
    exchangeValue: '',
  },
  secondary: {
    account: accounts.find(a => a.currency === 'USD'),
    exchangeValue: '',
  },
  type: ExchangeType.Buy,
});

const Exchanges = () => {
  const { accounts } = useContext<IAccountsContext>(AccountsContext);
  const { exchangeRates } = useContext<IExchangeRatesContext>(
    ExchangeRatesContext
  );

  const [state] = useReducer(reducer, { accounts }, init);
  const { main, secondary, type } = state;

  if (!exchangeRates) return null;

  return (
    <Container>
      <ExchangeWidget
        mainAccount={main.account}
        mainValue={main.exchangeValue}
        secondaryAccount={secondary.account}
        secondaryValue={secondary.exchangeValue}
        type={type}
      />
    </Container>
  );
};

export default Exchanges;
