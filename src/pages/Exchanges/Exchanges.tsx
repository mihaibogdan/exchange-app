import React, { useContext, useMemo } from 'react';

import { ExchangeType } from 'common/types/exchanges';
import ExchangeWidget from 'common/components/ExchangeWidget';
import { AccountsContext, IAccountsContext } from 'context/Accounts';
import {
  ExchangeRatesContext,
  IExchangeRatesContext,
} from 'context/ExchangeRates';
import { Container } from 'common/styles/layout';

const Exchanges = () => {
  const { accounts } = useContext<IAccountsContext>(AccountsContext);
  const { exchangeRates } = useContext<IExchangeRatesContext>(
    ExchangeRatesContext
  );

  const main = useMemo(
    () => ({
      account: accounts.find(a => a.currency === 'GBP'),
      value: '',
    }),
    [accounts]
  );
  const secondary = useMemo(
    () => ({
      account: accounts.find(a => a.currency === 'USD'),
      value: '',
    }),
    [accounts]
  );

  if (!exchangeRates) return null;

  return (
    <Container>
      <ExchangeWidget
        mainAccount={main}
        secondaryAccount={secondary}
        exchangeType={ExchangeType.Sell}
      />
    </Container>
  );
};

export default Exchanges;
