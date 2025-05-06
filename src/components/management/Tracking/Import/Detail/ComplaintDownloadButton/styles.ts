import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";

export const PDFButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 157px;
  align-items: center;
  font-family: ${Fonts.GilroyBold};
  font-size: 12px;
  padding: 8px 16px;
  justify-content: center;
  border-radius: 6px;
  height: 25px;
  gap: 9px;
  background: ${Colors.Gray70};
  color: ${Colors.White};
  transition: transform 0.2s;

  :hover {
    transform: scale(1.03);
  }
  :active {
    transform: scale(1);
  }
  &:disabled {
    opacity: 0.5;
  }
`;
