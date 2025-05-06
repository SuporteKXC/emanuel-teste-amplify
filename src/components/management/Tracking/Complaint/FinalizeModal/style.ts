import styled, { css } from "styled-components";
import { Colors, Fonts } from "@/styles/constants";
import { XIcon } from "styles/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Colors.Gray70};
  width: 940px;
  height: auto;
  /* max-height: 620px; */
  padding: 40px;
  background: ${Colors.White};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  position: absolute;
  margin: 100px 0;
  overflow-y: scroll;
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Cor de fundo da trilha */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Cor de fundo do "thumb" */
    border-radius: 5px; /* Borda arredondada do "thumb" */
  }
  ::-webkit-scrollbar {
    width: 10px; /* Largura da barra de rolagem */
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Colors.Gray70};
  margin-bottom: 25px;
  height: 19px;
  font-family: ${Fonts.GilroyBold};
  font-size: 16px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const ModalCloseButton = styled.button`
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

export const CloseIcon = styled(XIcon)`
  color: ${Colors.White};
`;

export const ListContainer = styled.div`
  /* height: 200px; */
  /* overflow-y: scroll; */
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

const gridTemplate = css`
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: 1310px) {
    grid-template-columns: 1fr 0.5fr repeat(5, 1fr) 0.5fr;
  }

  gap: 25px;
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
  height: 200px;
  overflow-y: scroll;
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
