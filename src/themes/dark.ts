import { Theme, ITheme } from 'common/types/theme';

const backgroundColor = (alpha = 1) => `rgba(33, 33, 36, ${alpha})`;
const primaryColor = (alpha = 1) => `rgba(53, 110, 255, ${alpha})`;
const secondaryColor = (alpha = 1) => `rgba(255, 255, 255, ${alpha})`;
const textColor = (alpha = 1) => `rgba(255, 255, 255, ${alpha})`;

const dark: ITheme = {
  type: Theme.Dark,
  palette: {
    background: {
      main: backgroundColor(),
      light: 'rgba(255, 255, 255, 0.04)',
    },
    primary: {
      main: primaryColor(),
      light: backgroundColor(0.24),
    },
    secondary: {
      main: secondaryColor(),
      light: secondaryColor(0.24),
    },
    text: {
      main: textColor(),
      light: textColor(0.6),
    },
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
};

export default dark;
