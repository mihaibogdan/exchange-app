import React from 'react';

import ThemeProvider from 'context/Theme';
import GlobalStyles from 'common/styles/globalStyles';

import RoundedFlag from 'common/components/RoundedFlag';
import Typography from 'common/components/Typography';

const App = () => (
  <ThemeProvider>
    <GlobalStyles />
    <RoundedFlag country="GB" />
    <Typography variant="h1" color="text">
      Exchange app
    </Typography>
  </ThemeProvider>
);

export default App;
