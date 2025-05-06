import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";
export {
  Input,
  Select,
  MaskedInput,
  CheckboxInput,
} from "components/shared/Forms";
export { FormRow } from "styles/components";
import { TrashIcon, EditIcon } from "styles/components";

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

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

export const SubTitle = styled.h4`
  font-family: ${Fonts.GilroyBold};
  margin-bottom: 4px;
  padding-bottom: 16px;
  width: 100%;
  border-bottom: 1px solid ${Colors.Gray20};
`;

export const Description = styled.p``;

export const Title = styled.div`
  margin: 22px 0;
`;

export const SapContainer = styled.div``;

export const SapItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #888;
  padding: 10px 0;
`;

export const SapTitle = styled.div`
  span {
    font-weight: bold;
  }
`;

export const SapAction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const CheckboxWrapper = styled.div`
  div {
    padding: 0;
    label {
      margin-right: 12px;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
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

export const DeleteBtn = styled(TrashIcon)`
  color: ${Colors.Orange};
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const EditBtn = styled(EditIcon)`
  color: ${Colors.Green};
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
