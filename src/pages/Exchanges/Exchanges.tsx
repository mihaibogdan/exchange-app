import React, { useContext } from 'react';

import ExchangeWidget from 'common/components/ExchangeWidget';
import {
  ExchangeRatesContext,
  IExchangeRatesContext,
} from 'context/ExchangeRates';
import { Container } from 'common/styles/layout';
import Loader from 'common/components/Loader';
import { StyledTransactionsList } from './styled';

const Exchanges = () => {
  const { exchangeRates } = useContext<IExchangeRatesContext>(
    ExchangeRatesContext
  );
  const isLoading = !exchangeRates;
  return (
    <Container isLoading={isLoading}>
      <Loader isLoading={isLoading}>
        {() => (
          <>
            <ExchangeWidget mainCurrency="EUR" secondaryCurrency="USD" />
            <StyledTransactionsList />
          </>
        )}
      </Loader>
    </Container>
  );
};

export default Exchanges;
