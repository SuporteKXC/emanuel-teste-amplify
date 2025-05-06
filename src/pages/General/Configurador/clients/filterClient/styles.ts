import styled from "styled-components";
import { Colors } from "styles/constants";
export { Input, Select } from "components";
export { FilterIcon, SearchIcon } from "styles/components";
export { InputJust } from "components/shared/Forms/InputJust";
export { CloseIcon } from "components/shared/Modal/styles";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  margin: 16px 0;
  background: ${Colors.White};
  border-radius: 6px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 12px;

    input {
      ::placeholder {
        color: ${Colors.Gray50};
      }
      width: 200px;
      flex: none;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background: ${Colors.Blue30};
  border-radius: 6px;
  padding: 6px 10px;
  gap: 5px;
  color: ${Colors.White};
  transition: all 150ms;
  flex: none;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(1);
  }
`

export const ButonsWrapper = styled.div`
  display:flex;
  flex-direction: row;
  margin-left: auto;
  gap: 12px;
`
