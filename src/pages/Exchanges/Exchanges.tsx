import React, { useContext } from 'react';

import ExchangeWidget from 'common/components/ExchangeWidget';
import {
  ExchangeRatesContext,
  IExchangeRatesContext,
} from 'context/ExchangeRates';
import { Container } from 'common/styles/layout';
import { StyledTransactionsList } from './styled';
import Loader from 'common/components/Loader';

const Exchanges = () => {
  const { exchangeRates } = useContext<IExchangeRatesContext>(
    ExchangeRatesContext
  );

  return (
    <Container isLoading={!exchangeRates}>
      <Loader isLoading={!exchangeRates}>
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
