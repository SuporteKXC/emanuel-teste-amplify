import { createGlobalStyle } from 'styled-components';

import GilroyBold from 'assets/fonts/Gilroy-Bold.otf';
import GilroyExtraBold from 'assets/fonts/Gilroy-ExtraBold.otf';
import GilroyLight from 'assets/fonts/Gilroy-Light.otf';
import GilroyRegular from 'assets/fonts/Gilroy-Regular.otf';
import GilroySemiBold from 'assets/fonts/Gilroy-SemiBold.otf';

import { Colors } from 'styles';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: "GilroyBold";
    src: url(${GilroyBold});
  }

  @font-face {
    font-family: "GilroyExtraBold";
    src: url(${GilroyExtraBold});
  }

  @font-face {
    font-family: "GilroyRegular";
    src: url(${GilroyRegular});
  }
  
  @font-face {
    font-family: "GilroySemiBold";
    src: url(${GilroySemiBold});
  }
  
  @font-face {
    font-family: "GilroyLight";
    src: url(${GilroyLight});
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html,
  body,
  #root {
    height: 100%;
    min-height: 100vh;
    scroll-behavior: smooth;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: #f5f5f5;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    color: ${Colors.Gray30};
    font-weight: normal;
  }

  body.modal-open {
    overflow-y: hidden;
  }
  body.react-select-open {
    .modal-body {
      overflow-y: auto;
      .react-select__menu {
        position: sticky;
      }
    }
  }

  a {
    text-decoration: none;
  }

  button {
    font-family: "GilroyBold";
    border: 0;
    cursor: pointer;
    background-color: transparent;
  }

  input, textarea {
    font-family: "GilroyRegular";
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "GilroyBold";
    font-weight: unset;
  }

  ul {
    list-style: none;
  }

  body.modal-open {
    overflow-y: hidden;
  }

  body.react-select-open {
    .modal-body {
      overflow-y: auto;
      .react-select__menu {
        position: sticky;
      }
    }
  }

  .toastsuccess {
    border-radius: 4px;
    background-color: ${Colors.Green} !important;
  }

  .Toastify__toast--error {
    border-radius: 4px;
    background-color: ${Colors.Red} !important;
  }

  .Toastify__toast-body {
    font-family: "GilroyBold" !important;
    font-size: 14px;
    padding: 0 16px;
  }

  .icon-spin {
    animation: iconSpin 2s infinite linear;
  }

  @keyframes iconSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

export default GlobalStyle;
