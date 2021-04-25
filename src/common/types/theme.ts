export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export interface ITheme {
  type: Theme;
  palette: {
    background: string;
    primary: string;
    secondary: string;
    text: string;
  };
}
