import styled from 'styled-components';
import { Colors, fonts } from 'styles';
export {
  FieldContainer,
  FieldError,
  FieldLabel,
} from 'styles/styled-components';

export const FileInput = styled.input.attrs({
  type: 'file',
})`
  position: absolute;
  left: -30000px;
  visibility: hidden;
`;

export const FakeInput = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${fonts.OpenSans};
  font-size: 14px;
  color: ${Colors.Gray100};
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  height: 50px;
  width: 100%;
`;

export const FileName = styled.div`
  padding: 16px;
`;

export const Button = styled.button.attrs({
  type: 'button',
})`
  background-color: ${Colors.Gray30};
  color: #fff;
  padding: 0px 32px;
  border-radius: 0px 6px 6px 0px;
`;
