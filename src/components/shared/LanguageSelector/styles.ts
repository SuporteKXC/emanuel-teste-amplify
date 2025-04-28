import styled, { css } from 'styled-components';
import { Colors } from 'styles';

export const Container = styled.div`
  display: flex;
  width: max-content;
  column-gap: 8px;
`;

interface ButtonProps {
  active: boolean;
}
export const Button = styled.button.attrs({ type: 'button' })<ButtonProps>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(220, 220, 220);
  position: relative;
  transition: 300ms ease;

  &::after {
    content: '';
    display: block;
    width: 0px;
    height: 2px;
    position: absolute;
    bottom: -4px;
    left: 0;
    background-color: ${Colors.Orange};
    transition: 300ms ease;
  }

  &:hover {
    color: ${Colors.Orange};
    &::after {
      width: 100%;
    }
  }

  ${({ active }) =>
    active &&
    css`
      color: ${Colors.Orange};
      &::after {
        width: 100%;
      }
    `}
`;
