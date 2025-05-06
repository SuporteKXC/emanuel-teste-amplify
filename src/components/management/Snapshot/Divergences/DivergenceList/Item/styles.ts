import styled, { css } from "styled-components";
import { Colors, Fonts } from "styles/constants";
import { MessageIcon as Message } from "styles/components";
import { Loader } from "styles/components";

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
  grid-template-columns: 0.15fr 1fr 0.5fr repeat(6, 1fr) 0.2fr;
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
    width: 100%;
    max-width: 110px;
    text-overflow: ellipsis;
    text-transform: uppercase;
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

export const Item = styled(Header)<{ status?: string }>`
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  padding: 0;
  margin: 0;
  border: none;

  .batch {
    font-family: ${Fonts.GilroyBold};
  }

  .status {
    color: ${({ status }) => (status === "OK" ? Colors.Green : Colors.Magenta)};
    font-family: ${Fonts.GilroyBold};
  }

  p {
    font-family: ${Fonts.OpenSans};
    font-size: 12px;
  }
`;

export const MessageIcon = styled(Message)`
  color: ${Colors.Gray40};
  aspect-ratio: 1;
`;

export const MessageButton = styled.button<{ isCheck: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  height: 17px;

  :hover {
    ${MessageIcon} {
      color: ${Colors.Blue};
    }
  }

  ${({ isCheck }) =>
    isCheck &&
    css`
      ${MessageIcon} {
        color: ${Colors.Blue};
      }
    `}
`;

interface IndicatorProps {
  color?: string;
  size?: number;
}

export const ActivityIndicator = styled(Loader).attrs((props: IndicatorProps) => ({
  size: props.size || 24,
  color: props.color || 'currentColor',
}))`
  animation: Rotate 2s infinite linear;
`;

export const ContainerModal = styled.div`
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