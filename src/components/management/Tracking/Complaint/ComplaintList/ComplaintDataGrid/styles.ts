import styled, { css } from "styled-components";
import { Colors, Fonts } from "styles/constants";
import { ChevronRightIcon } from "styles/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 28px 24px;
`;

export const WaitTitle = styled.span`
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${Colors.Gray70};
`;

export const Wait = styled(Content)`
  padding: 16px;
`;

const gridTemplate = css`
  grid-template-columns: 0.5fr repeat(6, 1fr) 0.4fr min-content;
  gap: 25px;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 24px;
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${Colors.Gray70};

  p {
    font-family: ${Fonts.GilroyHeavy};
  }
`;

export const Title = styled.div`
  display: flex;
  gap: 16px;

  p {
    text-transform: uppercase;
  }

  &.description {
    justify-content: flex-end;
    width: 100%;
  }
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Colors.Gray70};
  flex-direction: column;
  font-family: ${Fonts.GilroyBold};
  font-size: 16px;
  width: 100%;
`;

export const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const IndicatorContent = styled(IndicatorContainer)`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 8px;
  .diff {
    background-color: ${Colors.Magenta};
  }
  .company {
    background-color: ${Colors.Violet};
  }
  .warehouse {
    background-color: ${Colors.Yellow};
  }
`;

export const Indicator = styled.div<{ width: number }>`
  border-radius: 6px;
  width: ${({ width }) => width}px;
  max-width: 100px;
  height: 10px;
`;

export const Header = styled.div`
  display: grid;
  padding-bottom: 14px;
  margin-bottom: 20px;
  color: ${Colors.Gray70};
  ${gridTemplate}
  border-bottom: 1px solid ${Colors.Gray45};

  p {
    font-family: ${Fonts.GilroyBold};
    font-size: 11px;
    width: 100%;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

export const Item = styled(Header)<{ status?: string }>`
  padding: 0;
  margin: 0;
  border: none;
  gap: 24px;

  .batch {
    font-family: ${Fonts.GilroyBold};
  }

  .status {
    display: flex;
    color: ${Colors.White};
    font-size: 10px;
    background: ${({ status }) =>
      status === "AGUARDANDO PLANILHA EMPRESA" ? Colors.Blue30 : Colors.Pink};
    align-items: center;
    font-family: ${Fonts.GilroyBold};
    max-width: min-content;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: default;
    :hover {
      justify-content: flex-end;
    }

    /* FINALIZADO = 'FINALIZADO',
    AGUARDANDO_WMS = 'AGUARDANDO PLANILHA WMS',
    AGUARDANDO_SAP = 'AGUARDANDO PLANILHA SAP',
    AGUARDANDO_COMPLAINT = 'AGUARDANDO COMPLAINT',
    AGUARDANDO_FINALIZACAO = 'AGUARDANDO FINALIZAÇÃO' */

    ${({ status }) =>
      status === "FINALIZADO" &&
      css`
        background: ${Colors.Green};
      `}

    ${({ status }) =>
      status === "AGUARDANDO PLANILHA WMS" &&
      css`
        background: ${Colors.Blue30};
      `}

    ${({ status }) =>
      status === "AGUARDANDO PLANILHA SAP" &&
      css`
        background: ${Colors.Blue30};
      `}

    ${({ status }) =>
      status === "AGUARDANDO COMPLAINT" &&
      css`
        background: ${Colors.Gold};
      `}

    ${({ status }) =>
      status === "AGUARDANDO FINALIZAÇÃO" &&
      css`
        background: ${Colors.Blue30};
      `}
  }

  p {
    font-family: ${Fonts.OpenSans};
    font-size: 12px;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 20px;
  background-color: ${Colors.Gray70};
  transition: transform 0.2s;
  :hover {
    transform: scale(1.2);
  }
  :active {
    transform: scale(1);
  }
`;

export const ArrowRight = styled(ChevronRightIcon)`
  color: ${Colors.White};
`;
