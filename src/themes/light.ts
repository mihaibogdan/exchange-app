import { Theme, ITheme } from 'common/types/theme';

const primaryColor = (alpha = 1) => `rgba(53, 110, 255, ${alpha})`;
const secondaryColor = (alpha = 1) => `rgba(33, 33, 36, ${alpha})`;
const textColor = (alpha = 1) => `rgba(33, 33, 36, ${alpha})`;

const light: ITheme = {
  type: Theme.Light,
  palette: {
    background: {
      main: '#FFF',
      light: '#F6F6F6',
    },
    primary: {
      main: primaryColor(),
      light: primaryColor(0.24),
    },
    secondary: {
      main: secondaryColor(),
      light: secondaryColor(0.24),
      contrast: 'rgba(255, 255, 255)',
    },
    text: {
      main: textColor(),
      light: textColor(0.6),
    },
    error: {
      main: '#FF3636',
    },
    border: '#000',
    hover: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
};

export default light;
