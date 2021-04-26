import React, { useContext } from 'react';

import ExchangeWidget from 'common/components/ExchangeWidget';
import {
  ExchangeRatesContext,
  IExchangeRatesContext,
} from 'context/ExchangeRates';
import { Container } from 'common/styles/layout';

const Exchanges = () => {
  const { exchangeRates } = useContext<IExchangeRatesContext>(
    ExchangeRatesContext
  );

  if (!exchangeRates) return null;

  return (
    <Container>
      <ExchangeWidget mainCurrency="EUR" secondaryCurrency="USD" />
    </Container>
  );
};

export default Exchanges;
