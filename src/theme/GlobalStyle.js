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

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #e2e8f0;
  }

  #root{
    position: relative;
  }

`;

export default GlobalStyle;
