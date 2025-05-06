import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";
export { Input, Select, MaskedInput } from "components/shared/Forms";
export { FormRow } from "styles/components";

export const ToggleContainer = styled.div`
  width: 160px;
`;

export const Container = styled.div`
  background: ${Colors.White};
  border-radius: 6px;
  padding: 24px;

  form {
    div {
      label {
        color: ${Colors.Gray70};
      }
      input {
        border: 1px solid #c9c9c9;
        border-radius: 4px;
      }
      span {
        font-family: ${Fonts.GilroySemiBold};
      }
      .select__control {
        border: 1px solid #c9c9c9;
        border-radius: 4px;
      }
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 16px 48px;
  height: 56px;
  border-radius: 4px;
  transition: all 300ms ease 0s;
  background-color: ${Colors.Green};
  color: ${Colors.White};

  &[type="reset"] {
    background-color: ${Colors.Gray30};
    color: ${Colors.Gray60};
    margin-right: 16px;
  }

  &:disabled {
    opacity: 0.8;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
