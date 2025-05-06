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

export const ModalTitle = styled.div`
  font-weight: 600;
`;

export const ModalRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  gap: 6px;
  padding: 0 4px;
  
  p {
    font-size: 14px;
  }
`;