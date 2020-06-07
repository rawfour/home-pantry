import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Montserrat:300,700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: ${({ theme }) => theme.fontSizes.m};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

a{
  text-decoration: none;
}

ul,li{
  list-style: none;
}

  #root{
    position: relative;
  }

`;

export default GlobalStyle;
