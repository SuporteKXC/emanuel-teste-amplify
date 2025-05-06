import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";
import { ActivityIndicator } from "styles/components";
export { Input, Select, MaskedInput, CheckboxInput } from "components/shared/Forms";
export { FormRow } from "styles/components";

export const Container = styled.div`
  background: ${Colors.White};
  border-radius: 6px;
  padding: 24px;

  form {
    div {
      gap: 0;
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

export const Title = styled.h3`
  font-family: ${Fonts.GilroyBold};
  margin-bottom: 26px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${Colors.Gray20};
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
  }

  &[type="submit"] {
    margin: 0 16px;
  }

  &[type="button"] {
    background-color: ${Colors.Magenta};
  }

  &:disabled {
    opacity: 0.8;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const Loading = styled(ActivityIndicator)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

export const SubTitle = styled.h4`
  font-family: ${Fonts.GilroyBold};
  margin-bottom: 4px;
  padding-bottom: 16px;
  width: 100%;
  border-bottom: 1px solid ${Colors.Gray20};
`;

export const CheckboxWrapper = styled.div`
  div {
    padding: 0;
    label {
      margin-right: 12px;
    }
  }
`;
