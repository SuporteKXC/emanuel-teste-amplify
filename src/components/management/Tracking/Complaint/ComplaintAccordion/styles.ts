import { Colors, Fonts } from "@/styles/constants";
import styled, { css } from "styled-components";

const gridTemplate = css`
  grid-template-columns: 1fr 1fr 1fr 1.8fr 1.8fr 1.7fr 2fr 1fr 2fr repeat(
      3,
      60px
    );
  @media only screen and (max-width: 1310px) {
    grid-template-columns: 1.3fr 0.5fr repeat(5, 1fr) 0.5fr;
  }

  gap: 10px;
  width: 100%;
`;

export const container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 10px;
`;

export const header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  h1 {
    font-size: 24px;
  }
`;

export const title = styled.h2``;

export const content = styled.div`
  border-top: 0.5px solid #cacacc;
`;

export const OrderList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 28px 24px;
`;

export const OrderHeader = styled.div`
  display: grid;
  padding-bottom: 14px;
  margin-bottom: 20px;
  color: ${Colors.Gray70};
  ${gridTemplate}
  border-bottom: 1px solid ${Colors.Gray45};

  p {
    font-family: ${Fonts.GilroyBold};
    font-size: 11px;
    text-transform: uppercase;
    width: 100%;
    max-width: 110px;
    text-overflow: ellipsis;
    white-space: nowrap;
    //overflow: hidden;

    display: flex;
    justify-content: space-between;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

export const Item = styled(OrderHeader)`
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  padding: 0;
  margin: 0;
  border: none;

  p {
    font-family: ${Fonts.OpenSans};
    font-size: 12px;
  }
`;
