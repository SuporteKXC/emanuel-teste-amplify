import { Colors, Fonts } from "@/styles/constants";
import styled from "styled-components";
export { FormRow } from "styles/components";
export {
  Input,
  Select,
  MaskedInput,
  CheckboxInput,
} from "components/shared/Forms";

export const Description = styled.p``;

export const Title = styled.div`
  margin: 22px 0;
`;

type ButtonProps = {
  mood?: "reset";
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 16px 48px;
  height: 56px;
  border-radius: 4px;
  transition: all 300ms ease 0s;
  background-color: ${({ mood }) =>
    mood === "reset" ? Colors.Gray30 : Colors.Green};
  color: ${({ mood }) => (mood === "reset" ? Colors.Gray60 : Colors.White)};

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

export const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  flex-direction: column;
  background-color: ${Colors.White};
  border-radius: 4px;
  padding: 40px;
  margin: 32px 0;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.Gray20};
    border-radius: 3px;
  }
`;

export const SubTitle = styled.h4`
  font-family: ${Fonts.GilroyBold};
  margin-bottom: 4px;
  padding-bottom: 16px;
  width: 100%;
  border-bottom: 1px solid ${Colors.Gray20};
`;
