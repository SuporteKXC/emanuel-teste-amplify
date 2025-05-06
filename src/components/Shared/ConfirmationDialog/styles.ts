import styled from 'styled-components';
import { ColorScheme } from 'styles/constants';
export { Button } from 'styles/components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: +10;
  display: none;
  transition: all 1000ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 44px;

  &.open {
    .modal {
      animation: OverlayDarkening 1200ms ease forwards,
        ModalSlideUp 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
`;

export const Dialog = styled.div.attrs({ className: 'modal' })`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  background-color: #fff;
  justify-self: stretch;
  max-height: calc(100vh - 4rem);
  height: max-content;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  color: ${ColorScheme.Text};
  @media screen and (min-width: 800px) {
    width: 460px;
  }

  animation: ModalSlideUp 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

export const DialogHeader = styled.div`
  padding: 32px;
`;

export const DialogTitle = styled.h3`
  color: ${ColorScheme.Text};
`;

export const DialogBody = styled.div`
  padding: 12px 32px;
`;

export const DialogMessage = styled.p``;

export const DialogActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
  padding: 24px;
  color: inherit;
  @media (min-width: 801px) {
    button:last-child {
      margin-left: auto;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    button:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
