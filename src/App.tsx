import React from 'react';

import ThemeProvider from 'context/Theme';
import StoreProvider from 'context/Store';
import ExchangeRatesProvider from 'context/ExchangeRates';
import GlobalStyles from 'common/styles/globalStyles';

import Exchanges from 'pages/Exchanges';

const App = () => (
  <ThemeProvider>
    <GlobalStyles />

    <StoreProvider>
      <ExchangeRatesProvider>
        <Exchanges />
      </ExchangeRatesProvider>
    </StoreProvider>
  </ThemeProvider>
);

export default App;
