import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box !important;
  }

  body, html {
    height: 100%;
    margin: 0;
  }

  body {
    background: ${(props) => props.theme.background};
    font-size: 14px;
    color: ${(props) => props.theme.text};
    font-family: sans-serif;
    min-height: 100%;
  }
`
