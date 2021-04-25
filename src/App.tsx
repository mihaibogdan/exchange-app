import React from 'react';

import ThemeProvider from 'context/Theme';
import AccountsProvider from 'context/Accounts';
import ExchangeRatesProvider from 'context/ExchangeRates';
import GlobalStyles from 'common/styles/globalStyles';
import RoundedFlag from 'common/components/RoundedFlag';
import Typography from 'common/components/Typography';
import ExchangeWidget from 'components/ExchangeWidget';

const App = () => (
  <ThemeProvider>
    <GlobalStyles />

    <AccountsProvider>
      <ExchangeRatesProvider>
        <RoundedFlag country="GB" />
        <Typography variant="h1" color="text">
          Exchange app
        </Typography>
        <ExchangeWidget />
      </ExchangeRatesProvider>
    </AccountsProvider>
  </ThemeProvider>
);

export default App;
