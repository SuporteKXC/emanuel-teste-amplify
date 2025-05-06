import styled, { css } from "styled-components";
import { Colors, ColorScheme, Fonts, OrderItemStatus } from "styles/constants";
export { Center, Button, ActivityIndicator } from "styles/components";
export const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  flex-direction: column;
  background-color: ${Colors.White};
  border-radius: 4px;
  padding: 12px;
  /* margin: 32px 0; */
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

export const ModalRow = styled.div`
  display: flex;

  & :nth-child(1):not(p) {
    margin-left: auto;
  }

  & :nth-child(2) {
    margin-left: 10px;
  }

  & p {
    padding: 15px 5px 30px;
  }
`;
