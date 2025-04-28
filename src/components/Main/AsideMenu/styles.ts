import styled, { css } from "styled-components";
import {
  Map,
  TimeFive,
  CheckSquare,
  BarChartAlt2,
} from "@styled-icons/boxicons-solid";
import { World } from "@styled-icons/boxicons-regular/World";
import { MenuAltRight } from "@styled-icons/boxicons-regular";
import { Gumroad } from "@styled-icons/simple-icons";
import logo from "assets/images/logo.png";
import { Colors, fonts } from "styles";

interface IButtonModule {
  active: boolean;
}

export const Container = styled.aside`
  width: 100%;
  max-width: 252px;
  height: 100%;
  min-height: 100vh;
  background-color: ${Colors.Gray100};
  padding: 32px;
  position: relative;
  z-index: 1;
  box-shadow: 5px 0 30px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  overflow-y: auto;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Logo = styled.img.attrs({ src: logo })`
  margin-bottom: 10px;
  width: 100%;
  max-width: 140px;
`;

export const ButtonModule = styled.button.attrs({
  type: "button",
})<IButtonModule>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  background-color: transparent;

  ${({ active }) =>
    !active &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
`;

export const IconTracking = styled(Map).attrs({ size: 16 })`
  margin-right: 8px;
`;

export const IconSchedule = styled(TimeFive).attrs({ size: 16 })`
  margin-right: 8px;
`;

export const IconRouter = styled(Gumroad).attrs({ size: 16 })`
  margin-right: 8px;
`;

export const IconCheckFreight = styled(CheckSquare).attrs({ size: 16 })`
  margin-right: 8px;
`;

export const IconSettings = styled(MenuAltRight).attrs({ size: 16 })`
  margin-right: 8px;
`;

export const IconControlTower = styled(BarChartAlt2).attrs({ size: 16 })`
  margin-right: 8px;
`;

export const IconWorld = styled(World).attrs({ size: 16 })`
  margin-right: 8px;
`;

export const ModuleTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 18px;
  text-align: left;
  margin-bottom: 4px;
  color: ${Colors.White};
`;

export const ModuleDescription = styled.p`
  font-family: ${fonts.OpenSans};
  font-size: 12px;
  line-height: 18px;
  text-align: left;
  color: ${Colors.White}90;
  opacity: 0.8;
`;
