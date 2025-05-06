import styled from "styled-components";
import { Truck } from "@styled-icons/boxicons-solid";
import { Colors } from "styles/constants";
export { FormRow, Button } from "styles/components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  flex-direction: column;
  background-color: ${Colors.White};
  border-radius: 4px;
  padding: 40px;
  margin: 32px 0;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.Gray70};
    border-radius: 3px;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px ${Colors.Gray70} solid;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${Colors.Black};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-left: none;
  border-right: none;

  button:first-child {
    margin-right: 16px;
  }
`;

export const Icon = styled(Truck).attrs({ size: 24 })`
  margin-right: 8px;
`;
