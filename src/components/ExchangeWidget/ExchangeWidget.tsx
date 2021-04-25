import React, { useContext } from 'react';

import { ExchangeRatesContext } from 'context/ExchangeRates';
import Typography from 'common/components/Typography';
import { exchange } from 'common/utils/exchangeRates';

const Exchange = () => {
  const { exchangeRates } = useContext(ExchangeRatesContext);

  return (
    <Typography>
      1 EUR = {exchange(1, 'EUR', 'RON', exchangeRates)} RON
    </Typography>
  );
};

export default Exchange;
