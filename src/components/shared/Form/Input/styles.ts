import styled, { css } from 'styled-components';
import { fonts } from 'styles/fonts';
import { Colors } from 'styles/colors';
import { Loading } from 'styles/styled-components';
export {
  FieldContainer,
  FieldError,
  FieldLabel,
} from 'styles/styled-components';

export const Input = styled.input<{ isLoading?: boolean }>`
  font-family: ${fonts.OpenSans};
  font-size: 14px;
  color: ${Colors.Gray100};
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  max-height: 50px;
  width: 100%;

  &:disabled {
    background-color: #f2f2f2;
  }

  ${({ hidden }) =>
    hidden &&
    css`
      max-width: 0;
      max-height: 0;
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      padding-right: 32px;
    `}
`;

export const IsLoading = styled(Loading).attrs({ size: 18 })`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
