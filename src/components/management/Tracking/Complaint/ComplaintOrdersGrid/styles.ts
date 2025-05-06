import { Colors, Fonts } from "@/styles/constants";
import styled, { css } from "styled-components";
export { Search } from "@styled-icons/evil/Search";
import { Button, Close } from "styles/components";

export const OrderList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 28px 24px;
`;

const gridTemplate = css`
  grid-template-columns: 1fr 1fr 1fr 120px 1.5fr 1.5fr 1.5fr 1fr 1.5fr repeat(
      3,
      60px
    );
  @media only screen and (max-width: 1310px) {
    grid-template-columns: 1fr 0.5fr repeat(5, 1fr) 0.5fr;
  }

  gap: 10px;
  row-gap: 1px;
  width: 100%;
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

export const ButtonSubmit = styled(Button)`
  display: flex;
  gap: 2px;
  color: #ffff;
  height: 32px;
  background-color: #0085ff;
  max-width: 8rem;
  padding: 6px 12px 6px 8px;
`;

export const MensagemClear = styled.p`
  white-space: nowrap;
  font-size: 12px;
`;

export const InsideFilterContainer = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  h2 {
    margin-bottom: 25px;
  }

  form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 185px) repeat(4, 1fr);
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const Title = styled.div`
  h1 {
    font-size: 24px;
  }
`;
