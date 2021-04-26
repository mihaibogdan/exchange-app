export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export interface ITheme {
  type: Theme;
  palette: {
    background: {
      main: string;
      light: string;
    };
    primary: {
      main: string;
      light: string;
    };
    secondary: {
      main: string;
      light: string;
      contrast: string;
    };
    text: {
      main: string;
      light: string;
    };
    error: {
      main: string;
    };
    border: string;
    hover: string;
  };
  typography: {
    fontFamily: string;
  };
}
