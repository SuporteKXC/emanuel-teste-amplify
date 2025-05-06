import styled, { css } from "styled-components";
import { Colors, Fonts } from "styles/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 23px;
`;

export const Content = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  word-wrap: nowrap;
`;

export const Info = styled.div`
  display: flex;
  color: ${Colors.Gray70};
  background: ${Colors.White};
  flex-direction: column;
  padding: 24px;
  white-space: nowrap;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  width: 474px;
  min-height: 83px;
  border-radius: 6px;
  align-items: center;
  gap: 5px;
`;

const gridTemplate = css`
  grid-template-columns: 100px 80px 90px 85px;
`;

export const Header = styled.div`
  display: grid;
  ${gridTemplate}
  font-family: ${Fonts.GilroyBold};
  font-size: 11px;
  gap: 24px;
  p {
    text-transform: uppercase;
  }
`;

export const Values = styled(Header)<{ isAlert?: boolean }>`
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  color: ${({isAlert})=> isAlert && Colors.Magenta};
`

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 16px;
  color: ${Colors.Gray70};

  p {
    font-family: ${Fonts.GilroyHeavy};
    text-transform: uppercase;
  }
`