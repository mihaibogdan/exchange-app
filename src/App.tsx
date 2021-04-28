import React from 'react';

import ThemeProvider from 'contexts/Theme';
import StoreProvider from 'contexts/Store';
import ExchangeRatesProvider from 'contexts/ExchangeRates';
import GlobalStyles from 'common/styles/globalStyles';

import Settings from 'common/components/Settings';
import Exchanges from 'pages/Exchanges';

const App = () => (
  <ThemeProvider>
    <GlobalStyles />

    <StoreProvider>
      <ExchangeRatesProvider>
        <Exchanges />
      </ExchangeRatesProvider>
    </StoreProvider>

    <Settings />
  </ThemeProvider>
);

export default App;
