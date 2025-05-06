import styled from "styled-components";
import { Close } from "@styled-icons/ionicons-solid";

export const Container = styled.section<{isVisible: boolean;}>`
  width: 100%;
  height: ${({isVisible}) => isVisible ? '600px' : ''};
  grid-column: 1 / -1;
`;

export const Box = styled.div`
  width: 280px;
  padding: 24px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  left: -50%;
`;

export const Label = styled.h3`
  font-size: 15px;
`;

export const Value = styled.p`
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IconClose = styled(Close).attrs({ size: 24 })``;

export const ButtonClose = styled.button.attrs({ type: 'button' })`
  position: absolute;
  top: 12px;
  right: 12px;
`;