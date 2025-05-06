import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";
import { ArrowLeftIcon } from "styles/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  gap: 64px;
  width: 100%;
  flex-direction: column;
  padding: 32px 0;
`;

export const Box = styled(Content)`
  padding: 0;
  gap: 40px;
`

export const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 63px;
  padding: 16px;
  width: 100%;
  background: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
`

export const Infos = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.div`
  display: inherit;
  align-items: baseline;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  gap: 5px;
  color: ${Colors.Gray70};

  p {
    font-family: ${Fonts.GilroyHeavy};
    text-transform: uppercase;
  }
`;

export const BackButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 90px;
  height: 31px;
  align-items: center;
  font-family: ${Fonts.GilroyBold};
  font-size: 12px;
  padding: 8px 16px;
  justify-content: flex-end;
  border-radius: 6px;
  height: 31px;
  gap: 8px;
  background: ${Colors.Gray70};
  color: ${Colors.White};
  transition: transform 0.2s;

  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(1);
  }

`;

export const Arrow = styled(ArrowLeftIcon)`
  color: ${Colors.White};
`