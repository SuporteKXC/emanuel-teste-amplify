import styled from "styled-components";
import { Fonts } from "styles/constants";
import { ModalHeader as Header, ModalContent, FormRow as Row } from "styles/components";
export { ModalContent, Button } from "styles/components";
export { Input, Select, FilterIcon } from "../styles";

export const ModalHeader = styled(Header)`
  width: 100%;
  margin-bottom: 24px;
  padding-bottom: 24px;
  padding-left: 0;
  font-family: ${Fonts.GilroyBold};
  font-size: 20px;
  justify-content: flex-start;
`;

export const FormRow = styled(Row)`
  gap: 0;
`

export const ModalContainer = styled(ModalContent)`
  max-width: 960px;
  padding: 16px 32px;
  
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 0;
  gap: 12px;
`;
