import styled from "styled-components";
import { fonts } from "styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  bottom: 48px;
  right: 48px;
  z-index: 1;
`;

export const Hours = styled.h2`
  font-family: ${fonts.GilroySemiBold};
  font-size: 80px;
  line-height: 80px;
  color: white;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
`;

export const Gerasinergia = styled.h4`
  color: white;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
`;
