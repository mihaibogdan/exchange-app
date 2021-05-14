import React, { useState, useMemo } from 'react';

import useInterval from 'common/hooks/useInterval';
import { IRates } from 'common/types/exchanges';

interface IProps {
  children: React.ReactNode;
}
export interface IExchangeRatesContext {
  exchangeRates: IRates;
}

export const ExchangeRatesContext = React.createContext(null);

const ExchangeRatesContextProvider = ({ children }: IProps) => {
  const [exchangeRates, setExchangeRates] = useState<IRates>(null);

  useInterval(
    async () => {
      try {
        const url = 'https://openexchangerates.org/api/latest.json';
        const APP_ID = '556fed899a5243a1a36110dde36a3847';

        const res = await fetch(`${url}?app_id=${APP_ID}`);
        const body = await res.json();
        setExchangeRates(body);
      } catch (err) {
        console.warn(err);
        setExchangeRates({ base: 'USD', rates: {} });
      }
    },
    null,
    true
  );

  const contextValue = useMemo(
    () => ({
      exchangeRates,
    }),
    [exchangeRates]
  );

  return (
    <ExchangeRatesContext.Provider value={contextValue}>
      {children}
    </ExchangeRatesContext.Provider>
  );
};

export default ExchangeRatesContextProvider;
