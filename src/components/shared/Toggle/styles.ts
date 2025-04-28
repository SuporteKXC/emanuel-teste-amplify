import styled, { css } from 'styled-components';
import { ToggleRight, ToggleLeft } from '@styled-icons/boxicons-solid';
import { Colors, fonts } from 'styles';

export const IconToggleOff = styled(ToggleLeft).attrs({ size: 32 })`
  margin-right: 8px;
`;

export const IconToggleOn = styled(ToggleRight).attrs({ size: 32 })`
  margin-right: 8px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  width: 100%;
  max-width: max-content;
  min-width: 150px;

  &:last-child {
    margin-right: 0;
  }
`;

export const Button = styled.button.attrs({ type: 'button' })<{
  active: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${Colors.Gray20};
  color: ${Colors.Gray30};
  height: 54px;
  border-radius: 4px;

  ${({ active }) =>
    active &&
    css`
      ${IconToggleOn} {
        color: ${Colors.Green};
      }
    `}
`;

export const Label = styled.h5`
  font-family: ${fonts.GilroyBold};
  font-size: 14px;
  color: ${Colors.Gray100};
  margin-bottom: 8px;
`;
