import styled, { css } from 'styled-components';
import { Colors } from 'styles';

type ButtonStyleOption =
  | 'dark'
  | 'primary'
  | 'secundary'
  | 'transparent'
  | 'cancel'
  | 'danger';

interface ButtonStyle {
  btStyle?: ButtonStyleOption;
}

const styleButton = {
  dark: css`
    background-color: ${Colors.Gray30};
    color: #fff;
  `,
  primary: css`
    background-color: ${Colors.Orange};
    color: #fff;
  `,
  secundary: css`
    background-color: #1a1a1a;
    color: #fff;
  `,
  outline: css`
    background-color: transparent;
    color: ${Colors.Red};
    padding: 16px 0;
    border: 2px ${Colors.Red} solid;
  `,
  transparent: css`
    background-color: transparent;
    color: ${Colors.Gray100};
    padding: 16px 0;
  `,
  cancel: css`
    background-color: ${Colors.Gray20};
    color: ${Colors.Gray30};
  `,
  danger: css`
    background-color: ${Colors.Red};
    color: #fff;
  `,
};

export const Button = styled.button<ButtonStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 16px 24px;
  border-radius: 4px;
  transition: 300ms ease;

  :hover {
    transform: scale(0.95);
  }

  ${({ btStyle }) => (btStyle ? styleButton[btStyle] : styleButton.primary)}
`;

export const ButtonMini = styled.button<ButtonStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  transition: 300ms ease;

  :hover {
    transform: scale(0.95);
  }

  ${({ btStyle }) => (btStyle ? styleButton[btStyle] : styleButton.primary)}
`;
