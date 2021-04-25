import React from 'react';

import ThemeProvider from 'context/Theme';
import AccountsProvider from 'context/Accounts';
import ExchangeRatesProvider from 'context/ExchangeRates';
import GlobalStyles from 'common/styles/globalStyles';

import Exchanges from 'pages/Exchanges';

const App = () => (
  <ThemeProvider>
    <GlobalStyles />

    <AccountsProvider>
      <ExchangeRatesProvider>
        <Exchanges />
      </ExchangeRatesProvider>
    </AccountsProvider>
  </ThemeProvider>
);

export default App;
