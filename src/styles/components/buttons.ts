import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, Fonts } from 'styles/constants';

export const BaseButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: 300ms ease;
  border-radius: 6px;
  font-family: ${Fonts.GilroyBold};
  gap: 0 0.5rem;
  :hover:not(:disabled) {
    animation: ZoomIn 200ms linear;
    animation-fill-mode: forwards;
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonMood =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'outlinedDanger'
  | 'light'
  | 'void';

interface IButton {
  size?: ButtonSize;
  mood?: ButtonMood;
  fullWidth?: unknown;
}

const applyButtonSize = (size?: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        height: 32px;
        padding: 0 16px;
        font-size: 14px;
        svg {
          zoom: 0.9;
        }
      `;
    case 'large':
      return css`
        height: 54px;
        padding: 0 48px;
        font-size: 18px;
      `;
    case 'medium':
    default:
      return css`
        height: 48px;
        padding: 0 48px;
        font-size: 16px;
      `;
  }
};

const applyButtonMood = (mood?: ButtonMood) => {
  switch (mood) {
    case 'danger':
      return css`
        background-color: ${Colors.Magenta};
        color: ${Colors.White};
      `;
    case 'outlinedDanger':
      return css`
        border: 2px solid ${Colors.Magenta};
        background-color: transparent;
        color: ${Colors.Magenta};
      `;
    case 'warning':
      return css`
        background-color: ${Colors.Gold};
        color: ${Colors.White};
      `;
    case 'light':
      return css`
        background-color: ${Colors.Gray30};
        color: currentColor;
      `;
    case 'void':
      return css`
        background-color: transparent;
        color: currentColor;
      `;
    case 'secondary':
      return css`
        background-color: ${Colors.Green};
        color: ${Colors.White};
      `;
    case 'primary':
    default:
      return css`
        background-color: ${Colors.DarkBlue};
        color: ${Colors.White};
      `;
  }
};

export const Button = styled.button<IButton>`
  ${BaseButtonStyle};
  ${({ mood }) => applyButtonMood(mood)};
  ${({ size }) => applyButtonSize(size)};
`;

export const LinkButton = styled(Link)<IButton>`
  ${BaseButtonStyle};
  ${({ mood }) => applyButtonMood(mood)};
  ${({ size }) => applyButtonSize(size)};
`;
