import styled from 'styled-components';
import { fonts } from 'styles/fonts';
import { Colors } from 'styles/colors';
export {
  FieldContainer,
  FieldError,
  FieldLabel,
} from 'styles/styled-components';

export const Input = styled.textarea`
  font-family: ${fonts.OpenSans};
  font-size: 14px;
  color: ${Colors.Gray100};
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  width: 100%;
  height: 160px;
  resize: none;
`;
