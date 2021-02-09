import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  html {
    font-size: 20px;
    line-height: 1.5;
  }

  body {
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: center;
  }
`

export default GlobalStyle