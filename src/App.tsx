import React from 'react';

import ThemeProvider from 'context/Theme';
import GlobalStyles from 'styles/globalStyles';

const App = () => (
  <ThemeProvider>
    <GlobalStyles />
    <h1>Exchange app</h1>
  </ThemeProvider>
);

export default App;
