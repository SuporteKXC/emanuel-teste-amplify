import styled from "styled-components";
import { ColorScheme, Colors, Fonts } from "styles/constants";
import { FilterIcon as Filter, XIcon } from "styles/components";
export { Input, Select } from "components";
export { SearchIcon } from "styles/components";
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

    .select-container {
      margin: 0;
      max-width: min-content;
      width: 170px;

      .select__control  {
        width: 170px;
        display:flex;
        height: 38px;
        align-items: center;
        border-radius: 6px;
      }
      .select__placeholder {
        font-size: 12px;
        font-family: ${Fonts.OpenSans};
        color: ${ColorScheme.Text};
        white-space: nowrap;
      }
      .select__option {
        font-size: 14px;
        color: ${Colors.Gray70};
        border-bottom: 1px solid ${Colors.Gray30};
      }
      .select__indicator {
        padding: 0 0 0 8px;
      }
      .select__value-container {
        padding-left: 0;
        font-size: 14px;
      }
    }

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
`;

export const ButonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: auto;
  gap: 12px;
`;

export const FilterIcon = styled(Filter)`
  color: transparent;
  stroke: ${Colors.Gray60};
  stroke-width: 1pt;
  width: 28px;
  height: 28px;
  &:hover {
    color: ${Colors.Gray60};
  }
`;

export const ButtonFilter = styled.button`
  display: flex;
  align-items: center;
`

export const ClearIcon = styled(XIcon)`
  color: ${Colors.Gray50};
  width: 22px;
  height: 22px;
`

export const ButtonClear = styled(ButtonFilter)`
  background: ${Colors.Gray20};
  padding: 2px;
  border-radius: 50%;
  &:hover {
    background: ${Colors.Gray30};
  }
`

