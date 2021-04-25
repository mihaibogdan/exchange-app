import React from 'react';

import ThemeProvider from 'context/Theme';
import GlobalStyles from 'styles/globalStyles';
import RoundedFlag from 'common/components/RoundedFlag';

const App = () => (
  <ThemeProvider>
    <GlobalStyles />
    <RoundedFlag country="GB" />
    <h1>Exchange app</h1>
  </ThemeProvider>
);

export default App;
