import styled, { css } from "styled-components";
import { Colors, Fonts, getScrollbarStyle } from "styles/constants";
import Horus from "assets/images/horus-logo.png";
export const PageContainer = styled.div`
  display: flex;
  background: ${Colors.Gray20};
  height: 100vh;
  position: relative;
`;

export const Backdrop = styled.div`
  width: 100%;
  overflow: auto;
  z-index: 1;
  position: relative;
  ${getScrollbarStyle()}
`;

export const HorusWrapper = styled.div`
  display: flex;
  position: relative;
  background: red;
  width: 100%;
  height: 10px;
`;

export const HorusContainer = styled.div`
  display: flex;
  padding-left: 50px;
  flex-direction: row;
  position: absolute;
  bottom: 37px;
  left: 0;
  align-items: center;
  z-index: 99;
  gap: 16px;
`;

export const PageContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: blue;
  z-index: 99;
`;

export const HorusContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 12px;
  font-family: ${Fonts.OpenSans};
  color: ${Colors.White};
  p {
    font-size: 16px;
    font-family: ${Fonts.GilroyBold};
  }
`;

export const HorusLogo = styled.img.attrs({ src: Horus })``;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
`;

export const LeftPanelSlot = styled.div`
  flex: 1 0 240px;
`;

export const MainSlot = styled.div`
  display: flex;
  flex: 1 1 100%;
  height: 100%;
  flex-direction: column;
`;

interface IChildrenSlot {
  paddingZero?: boolean;
}
export const ChildrenSlot = styled.main<IChildrenSlot>`
  /* animation: ContentSlideIn 1000ms ease forwards; */
  padding: 8px 20px 16px;

  ${({ paddingZero }) =>
    paddingZero &&
    css`
      padding: 0px;
    `}
`;

export const Warning = styled.div`
  width: 100%;
  height: 40px;
  background-color: #007cef;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.p`
  color: white;
  font-weight: 700;
  font-family: ${Fonts.GilroyRegular};
`;
