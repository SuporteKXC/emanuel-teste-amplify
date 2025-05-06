import styled, { css } from "styled-components";
import { Colors, Fonts } from "styles/constants";
export { ActivityIndicator } from "styles/components";
import { Button, Close } from "styles/components";
import { ArrowLeftIcon } from "styles/components";
export { Search } from "@styled-icons/evil/Search";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
  background-color: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;

  form {
    margin-top: 25px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 24px;
  }
`;

type InputWrapperProps = {
  minmax: number;
};

export const InputWrapper = styled.div<InputWrapperProps>`
  display: grid;
  grid-template-columns: ${({ minmax }) =>
    `repeat(auto-fill, minmax(${minmax}0%, 1fr));`};
  gap: 10px;
  align-items: center;
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

export const DownloadPDF = styled.button`
  display: flex;
  flex-direction: row;
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
    grid-template-columns: repeat(2, 185px) repeat(8, 1fr);
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
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
  grid-template-columns: repeat(2, 0.5fr) 0.5fr repeat(4, 1fr) 0.5fr 1.5fr 0.5fr 0.5fr 0.5fr;

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

export const ImagePreview = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 20px;
  align-items: center;
`;

export const ImageItem = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

export const ImageRemove = styled(Close)`
  width: 18px;
  height: 18px;
  color: #fff;
  cursor: pointer;
  position: absolute;

  background: #000;
  border-radius: 100%;
  &:hover {
    color: #ff0001;
  }
`;
