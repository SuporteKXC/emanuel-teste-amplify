import styled from "styled-components";
import { Colors, fonts } from "styles";

export const Container = styled.div<{ options: number }>`
  display: flex;
  gap: 50px;
  padding: 16px;
  align-items: center;
  justify-content: start;
  margin-bottom: 14px;
  border-radius: 10px;
  background-color: white;
  p {
    cursor: pointer;
    font-family: ${fonts.GilroyBold};
    color: black;
  }
`;

export const Option = styled.p<{ active: boolean }>`
  cursor: pointer;
  font-family: ${fonts.GilroyBold};
  color: black;
  ${(e) =>
    e.active ? `margin-bottom: ${Colors.Orange}; color: ${Colors.Orange}` : ""}
`;
