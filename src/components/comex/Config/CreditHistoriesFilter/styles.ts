import styled from 'styled-components';
import { Colors } from 'styles/constants';
export {
  Button
} from 'styles/components';

export const Filter = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  border-radius: 5px;
  background-color: ${Colors.White};
  animation: ContentSlideIn 500ms ease forwards;
  box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  border-left: 10px solid ${Colors.DarkBlue};
  margin-bottom: 20px;
  margin-left: 1%;
`;

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 10px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-left: auto;
    width: max-content;
`;