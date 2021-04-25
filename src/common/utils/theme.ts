import { Theme } from 'common/types/theme';
import { THEME } from 'common/constants/theme';

export const getDefaultTheme = (): Theme => {
  if (localStorage.getItem(THEME)) return <Theme>localStorage.getItem(THEME);

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (darkQuery.matches) return Theme.Dark;
  return Theme.Light;
};
