import styled, { css } from 'styled-components';
import { Colors, Fonts } from 'styles/constants';

const changeColor = (dye: string | undefined) => {
  switch (dye) {
    case 'gray':
      return css`
        background: ${Colors.Gray20};
        :hover {
          background: ${Colors.Gray30};
        }
      `;
    case 'blue':
      return css`
        background: ${Colors.White}99;
        :hover {
          color: ${Colors.White};
          background: ${Colors.Blue10};
        }
      `;
    default:
      return css`
        background: ${Colors.White}99;
        color: ${Colors.Gray60};
        :hover {
          color: ${Colors.White};
          background: ${Colors.Magenta};
        }
      `;
  }
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: +10;
  display: none;
  &.open {
    display: initial;
    animation: ModalSlideUp 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    .modal-content {
      animation: OverlayDarkening 1200ms ease forwards;
    }
  }
`;

export const Modal = styled.div.attrs({
  className: 'modal',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CloseButton = styled.button<{ dye?: string }>`
  background-color: transparent;
  margin-left: auto;
  color: ${Colors.Gray70};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-family: ${Fonts.GilroyBold};
  font-size: 14px;
  transition: background 300ms, color 300ms;
  ${({ dye }) => changeColor(dye)}
`;
