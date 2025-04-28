import styled from 'styled-components';
import { Fullscreen, ExitFullscreen } from '@styled-icons/boxicons-regular';
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const Button = styled.button.attrs({ type: 'button' })`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 50%;
  position: absolute;
  right: 48px;
  top: 48px;
  background-color: #121212;
  color: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  transition: 300ms ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const IconFullscreen = styled(Fullscreen).attrs({ size: 24 })`
  color: #fff;
`;

export const IconExitFullscreen = styled(ExitFullscreen).attrs({ size: 24 })`
  color: #fff;
`;
