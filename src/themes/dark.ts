import { Theme, ITheme } from 'common/types/theme';

const primaryColor = (alpha = 1) => `rgba(53, 110, 255, ${alpha})`;
const secondaryColor = (alpha = 1) => `rgba(255, 255, 255, ${alpha})`;
const textColor = (alpha = 1) => `rgba(255, 255, 255, ${alpha})`;

const dark: ITheme = {
  type: Theme.Dark,
  palette: {
    background: {
      main: 'rgba(33, 33, 36)',
      light: '#2A2A2D',
    },
    primary: {
      main: primaryColor(),
      light: primaryColor(0.12),
    },
    secondary: {
      main: secondaryColor(),
      light: secondaryColor(0.24),
      contrast: 'rgba(33, 33, 36)',
    },
    text: {
      main: textColor(),
      light: textColor(0.6),
    },
    error: {
      main: '#FF3636',
    },
    border: '#FFF',
    hover: 'rgba(255, 255, 255, 0.06)',
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
};

export default dark;
