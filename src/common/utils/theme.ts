import { Theme } from 'typings/theme';
import { THEME } from 'constants/theme';

export const getDefaultTheme = (): Theme => {
  if (localStorage.getItem(THEME)) return <Theme>localStorage.getItem(THEME);

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (darkQuery.matches) return Theme.Dark;
  return Theme.Light;
};
