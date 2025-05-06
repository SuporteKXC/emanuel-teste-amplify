import { createGlobalStyle, css } from 'styled-components';
import GilroyBold from 'assets/fonts/Gilroy-Bold.otf';
import GilroySemiBold from 'assets/fonts/Gilroy-SemiBold.otf';
import GilroyRegular from 'assets/fonts/Gilroy-Regular.otf';
import { Fonts, ColorScheme, Colors, getScrollbarStyle } from './constants';

const general = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }
  #root {
    scroll-behavior: smooth;
  }
  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: ${Colors.Gray20};
    font-family: ${Fonts.GilroyRegular}, sans-serif;
    color: ${ColorScheme.Text};
    font-size: 16px;
    font-weight: normal;
    ${getScrollbarStyle()};
  }
  body.no-scroll {
    overflow: hidden;
  }
  a {
    text-decoration: none;
  }
  button {
    font-family: ${Fonts.GilroyBold};
    border: 0;
    cursor: pointer;
    background-color: transparent;
  }
  input,
  textarea {
    font-family: ${Fonts.OpenSans};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${Fonts.GilroyBold};
    color: ${ColorScheme.Text};
    font-weight: unset;
  }
  ul {
    list-style: none;
  }
`;

const animations = css`
  @keyframes ZoomIn {
    to {
      transform: scale(1.05);
    }
  }

  @keyframes ContentSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-24px);
    }
    50% {
      transform: translateY(0px);
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes ModalSlideUp {
    from {
      transform: translateY(240px);
    }
    to {
      transform: translateY(0px);
    }
  }

  @keyframes OverlayDarkening {
    from {
      box-shadow: #00000000 0 0 200vw 200vw, #00000044 0 32px 24px -16px;
    }
    to {
      box-shadow: #00000088 0 0 200vw 200vw, #00000044 0 32px 24px -16px;
    }
  }

  @keyframes Rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

const fontface = css`
  @font-face {
    font-family: 'Gilroy-Bold';
    src: url(${GilroyBold});
  }
  @font-face {
    font-family: 'Gilroy-SemiBold';
    src: url(${GilroySemiBold});
  }
  @font-face {
    font-family: 'Gilroy-Regular';
    src: url(${GilroyRegular});
  }
`;

const toastify = css`
  .Toastify {
    .toastsuccess {
      border-radius: 4px;
      background: ${Colors.Green};
      color: ${Colors.White};
    }

    .toasterror {
      border-radius: 4px;
      background: ${Colors.Magenta};
      color: ${Colors.White};
    }

    .Toastify__toast-body {
      font-family: ${Fonts.GilroySemiBold};
      font-size: 14px;
      padding: 0 16px;
      svg {
        fill: currentColor;
      }
    }

    button {
      color: currentColor;
    }

    .Toastify__progress-bar--animated {
      background: currentColor;
    }
  }
`;

export default createGlobalStyle`
    ${general};
    ${fontface};
    ${toastify};
    ${animations};
`;
