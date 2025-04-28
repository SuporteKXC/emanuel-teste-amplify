import styled from 'styled-components';
import { CheckmarkSquare2Outline } from '@styled-icons/evaicons-outline/CheckmarkSquare2Outline';
import { SquareOutline } from '@styled-icons/evaicons-outline/SquareOutline';
import { fonts, Colors } from 'styles';

export {
  FieldContainer,
  FieldError,
  FieldLabel,
} from 'styles/styled-components';

export const OptionsContainer = styled.div`
  flex-direction: row;
  columns: 2;
  column-gap: 24px;

  @media screen and (max-width: 414px) {
    columns: 1;
  }
`;

export const Option = styled.label`
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  font-family: ${fonts.GilroyRegular};
`;

export const Icons = styled.div.attrs({ className: 'icons' })``;

export const Input = styled.input`
  appearance: none;
  &:checked + .icons > .checked {
    display: initial;
  }
  &:not(:checked) + .icons > .unchecked {
    display: initial;
  }
`;

export const CheckedIcon = styled(CheckmarkSquare2Outline).attrs({
  size: 24,
  className: 'checked',
})`
  color: ${Colors.Orange};
  margin-right: 10px;
  display: none;
`;

export const UncheckedIcon = styled(SquareOutline).attrs({
  size: 24,
  className: 'unchecked',
})`
  color: #606060;
  margin-right: 10px;
  display: none;
`;
