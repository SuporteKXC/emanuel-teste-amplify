import styled, { css } from "styled-components";
import { Colors, Fonts, getScrollbarStyle } from "styles/constants";
export { MessageIcon } from "styles/components";
import { XIcon } from "styles/components";
import { Form } from "@unform/web";
export { ActivityIndicator } from "styles/components";

const gridTemplate = css`
  grid-template-columns: 2.55fr 1fr 0.5fr 1fr 1fr 1fr;
  width: 100%;
  gap: 24px;
`;

export const JustifyForm = styled(Form)`
  display: block;
  gap: 1rem;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Colors.Gray70};
  width: 940px;
  max-height: 620px;
  padding: 40px;
  background: ${Colors.White};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

export const Title = styled.div`
  display: grid;
  grid-template-columns: 0.1fr auto 2fr;
  align-items: center;
  color: ${Colors.Gray70};
  margin-bottom: 25px;
  height: 19px;
  font-family: ${Fonts.GilroyBold};
  font-size: 16px;
  gap: 8px;
`;

export const CloseIcon = styled(XIcon)`
  color: ${Colors.White};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 1px;
  justify-content: center;
  justify-self: flex-end;
  border-radius: 50%;
  background-color: ${Colors.Gray70};
  transition: background 0.2s;

  :hover {
    background: ${Colors.Magenta};
  }
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${Colors.Gray10};
  max-height: 219px;
  border-top: 1px solid ${Colors.Gray50};
  padding: 17px 17px 30px;
  margin-bottom: 24px;
`;

export const Header = styled.div`
  display: grid;
  padding: 9px 0 14px 0;
  margin-bottom: 18px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  gap: 24px;
  border-bottom: 1px dashed ${Colors.Gray50};
  color: ${Colors.Gray70};
  font-family: ${Fonts.GilroyBold};
  font-size: 11px;

  p{
    text-transform: uppercase;
  }
`;

export const Item = styled.div`
  display: grid;
  text-transform: uppercase;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  gap: 24px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  max-height: 160px;
  ${getScrollbarStyle()};
`;

export const Column = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  
  &.bold {
    font-family: ${Fonts.GilroyBold};
  }

  &.divergence {
    color: ${Colors.Magenta};
  }
`;

export const Submit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 102px;
  background: ${Colors.Orange};
  font-family: ${Fonts.GilroyBold};
  font-size: 12px;
  color: ${Colors.White};
  border-radius: 6px;

  :active {
    transform: scale(0.98);
    opacity: 0.9;
  }
`

export const DivMensage = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  color: #57575E;
  background-color: #fff;
  border-radius: 4px;
  min-height: 96px;
  max-height: 12rem;
  resize: none;
  width: 100%;
  overflow: auto;
  ${getScrollbarStyle()};
`

export const InformantionData = styled.label`
  display: block;
  font-family: "Gilroy-SemiBold";
  font-size: 14px;
  color: #2E2E36;
  margin-bottom: 8px;
`

export const CommentText = styled.p`
  color: ${Colors.Gray50};
  font-family: ${Fonts.OpenSans};
  font-weight: 500;
`

export const TitleText = styled.p`
  font-weight: bold;
  color: #000;
  font-family: ${Fonts.OpenSans};
  margin: 20px 0px;
`