import styled, { css } from 'styled-components';
import { ColorScheme, Colors, Fonts } from "styles/constants";
import { AlertTriangleOutline } from "@styled-icons/evaicons-outline/AlertTriangleOutline";
import { ListUl } from "@styled-icons/boxicons-regular/ListUl";

export const ContentMainAlert = styled.div`
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  header {
    display: flex;
    gap: 16px;
    align-items: center;

    h3 {
      font-family: ${Fonts.GilroySemiBold};
      font-size: 14px;
      text-transform: uppercase;
      color: ${ColorScheme.Warning};
    }

    &:after {
      content: "";
      display: block;
      width: 78%;
      height: 1px;
      background: ${ColorScheme.Warning};
    }
  }
`;

export const ConteMainAlertIcon = styled(AlertTriangleOutline)`
  color: ${ColorScheme.Warning};
`;

export const Alerts = styled.section<{isScrolling: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 420px;
  
  overflow-y: auto;
  ${({ isScrolling }) => isScrolling &&
    css`box-shadow: inset 0px -5px 8px -7px rgba(0,0,0,0.3);`
  }

  p {

  }
  
  p > span {
    color: #8b8d97;
  }
`;

const gridTemplates = () => css`
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 20px);
  column-gap: 16px;
`;

export const GridHeader = styled.div`
  display: grid;
  ${gridTemplates()}
  font-family: ${Fonts.GilroySemiBold};
  font-size: 12px;
  text-transform: uppercase;
  height: max-content;
  align-items: center;
`;

export const GridContainer = styled.div`
  height: max-content;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  display: grid;
  ${gridTemplates()}
  align-items: center;
  font-family: ${Fonts.OpenSans};
  font-size: 11px;
  font-weight: 600;
  background-color: ${Colors.White}; 
`;

export const DetailIcon = styled(ListUl)`
  transform: rotateY(180deg);
  cursor: pointer;
`;