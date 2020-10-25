import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

  }

  body {
    background: #fff;
    color: black;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Poppins, serif;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    font-size: 13px;
    color:#22E0A1;
  }

  label {
    color: black;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
