import styled, { css } from "styled-components";
import { Colors, Fonts } from "styles/constants";

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

const gridTemplate = css`
  grid-template-columns: 1fr 0.5fr repeat(5, 1fr) 0.5fr;

  @media only screen and (max-width: 1310px) {
    grid-template-columns: 1fr 0.5fr repeat(5, 1fr) 0.5fr;
  }

  gap: 25px;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  gap: 16px;
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Colors.Gray70};
  flex-direction: row;
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

// export const Item = styled(Header)<{ divergent?: boolean }>`
export const Item = styled(Header)<{ divergent?: string }>`
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  padding: 0;
  margin: 0;
  border: none;

  .batch {
    font-family: ${Fonts.GilroyBold};
  }

  .status {
    /* color: ${({ divergent }) => (divergent ? Colors.Magenta : Colors.Green)}; */
    color: ${({ divergent }) => (divergent == "ok" ? Colors.Green : Colors.Magenta)};
    font-family: ${Fonts.GilroyBold};
  }

  p {
    font-family: ${Fonts.OpenSans};
    font-size: 12px;
  }
`;
