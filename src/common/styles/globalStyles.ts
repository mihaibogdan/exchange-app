import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: ${({ theme }) => theme.typography.fontFamily};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.main};
  }

  button {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }

  #root {
    height: 100%;
  }

  * {
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }
`;

export default GlobalStyle;
