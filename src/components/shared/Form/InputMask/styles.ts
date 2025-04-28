import styled, { css } from 'styled-components';
import ReactInputMask from 'react-input-mask';
import { fonts } from 'styles/fonts';
import { Colors } from 'styles/colors';
import { Loading } from 'styles/styled-components';

export {
  FieldContainer,
  FieldError,
  FieldLabel,
} from 'styles/styled-components';

export const InputMask = styled(ReactInputMask)`
  font-family: ${fonts.OpenSans};
  font-size: 14px;
  color: ${Colors.Gray100};
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  max-height: 50px;
  width: 100%;

  ${({ hidden }) =>
    hidden &&
    css`
      max-width: 0;
      max-height: 0;
    `}
`;

export const IsLoading = styled(Loading).attrs({ size: 18 })`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
