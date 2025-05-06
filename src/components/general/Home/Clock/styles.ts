import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  bottom: 37px;
  right: 30px;
  z-index: 1;
`;

export const Hours = styled.h2`
  font-family: ${Fonts.GilroyBold};
  font-size: 37px;
  color: white;
`;

export const Gerasinergia = styled.h4`
  color: white;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
`;
