import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { getDefaultTheme } from 'utils/theme';
import { THEME } from 'constants/theme';
import { Theme, ITheme } from 'common/types/theme';
import { dark, light } from 'themes';

interface IProps {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext(null);

const ThemeContextProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useState<ITheme>(
    getDefaultTheme() === Theme.Dark ? dark : light
  );

  useEffect(() => {
    const onColorSchemeChanged = e => {
      setTheme(e.matches ? dark : light);
    };

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkQuery.addEventListener('change', onColorSchemeChanged);

    return () => darkQuery.removeEventListener('change', onColorSchemeChanged);
  }, []);

  const toggleTheme = useCallback(() => {
    if (theme.type === Theme.Dark) {
      setTheme(light);
      localStorage.setItem(THEME, Theme.Light);
      return;
    }

    setTheme(dark);
    localStorage.setItem(THEME, Theme.Dark);
  }, [theme, setTheme]);

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [
    theme,
    toggleTheme,
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
