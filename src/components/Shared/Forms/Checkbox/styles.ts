import styled from 'styled-components';
import { FieldContainer, Checkbox, CheckboxChecked } from 'styles/components';
import { Colors } from 'styles/constants';
export { FieldLabel, FieldError } from 'styles/components';

export const Container = styled(FieldContainer)``;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 48px;
`;

export const Option = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Icons = styled.div.attrs({ className: 'icons' })`
  padding-right: 8px;
`;

export const Input = styled.input`
  appearance: none;
  &:checked + .icons > .checked {
    display: initial;
  }
  &:not(:checked) + .icons > .unchecked {
    display: initial;
  }
`;

export const CheckedIcon = styled(CheckboxChecked).attrs({
  size: 24,
  className: 'checked',
})`
  color: currentColor;
  display: none;
`;

export const UncheckedIcon = styled(Checkbox).attrs({
  size: 24,
  className: 'unchecked',
})`
  color: ${Colors.Gray50};
  display: none;
`;
