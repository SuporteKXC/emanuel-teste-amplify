import styled from "styled-components";
import { Filter } from "@styled-icons/heroicons-solid/Filter";
import { Colors } from "styles";
export { FormRow, Button, Loading, ButtonMini } from "styles/styled-components";

export const Container = styled.div`
  display: flex;
  column-gap: 16px;
`;

export const ButtonFilter = styled.button.attrs({ type: "button" })`
  &:hover {
    svg {
      fill: ${Colors.Gray50};
      stroke-width: 0;
    }
  }
`;

export const IconFilter = styled(Filter).attrs({ size: 24 })`
  fill: transparent;
  stroke: ${Colors.Gray50};
  stroke-width: 1pt;
`;

export const IconFilterButton = styled(Filter).attrs({ size: 24 })<{
  active: boolean;
}>`
  fill: ${({ active }) => (active ? Colors.Gray50 : "transparent")};
  stroke: ${Colors.Gray50};
  stroke-width: 1pt;
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
    background: ${Colors.Line};
    border-radius: 3px;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px ${Colors.Line} solid;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${Colors.Black};
  margin-left: 16px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-left: none;
  border-right: none;

  button {
    margin-right: 16px;
  }

  button:last-child {
    margin-right: 0;
  }
`;
