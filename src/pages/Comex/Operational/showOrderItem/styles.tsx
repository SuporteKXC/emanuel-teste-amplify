import styled, { css } from "styled-components";
import {
  Colors,
  ColorScheme,
  Fonts,
  getScrollbarStyle,
  OrderItemStatus,
} from "styles/constants";
export { ArrowLeftIcon, CogIcon } from "styles/components/icons";
export { Center, Button, ActivityIndicator } from "styles/components";
import { AlertTriangleOutline } from "@styled-icons/evaicons-outline/AlertTriangleOutline";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
  height: fit-content;
  border-radius: 5px;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 15px 0;
  font-size: 24px;
  font-family: ${Fonts.GilroySemiBold};

  div.wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const GoBack = styled.span`
  a {
    color: inherit;
  }

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  svg {
    margin-right: 10px;
  }
`;

export const Header = styled.p`
  font-family: ${Fonts.GilroyRegular};
  font-size: 13px;
  color: ${ColorScheme.Text};
`;
export const ContentContainer = styled.div`
  padding: 0px;
`;

export const CanceledTag = styled.div`
  background: #ff0001;
  color: #fff;
  position: absolute;
  padding: 5px;
  font-size: 10px;
  font-weight: bold;
  top: 0;
  left: 0;
`

interface ContentHeaderProps {
  critical: string | undefined;
}

export const ContentHeader = styled.header<ContentHeaderProps>`
  font-family: ${Fonts.OpenSans};
  font-size: 16px;
  background: #fff;
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 8px
    ${({ critical }) =>
      critical === "YES" ? OrderItemStatus.Critical : OrderItemStatus.Normal};
  margin-bottom: 30px;
  box-sizing: border-box;

  position: relative;
  overflow: hidden;
`;

export const ContentHeaderDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10%;
  font-size: 14px;
  margin-right: 60px;
  line-height: 20px;

  & span strong {
    font-weight: 700;
    @media (max-width: 620px) {
      display: block;
    }
  }

  & span:nth-child(2) {
    strong {
      font-size: 16px;
    }
  }

  & > div {
    margin-left: auto;
    color: ${Colors.Orange};
    text-transform: uppercase;

    @media (max-width: 620px) {
      margin-left: 0;
    }
  }

  @media (max-width: 620px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const ContentMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const ContentMainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 620px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const ContentModal = styled.div`
  width: 30%;
  background: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 620px) {
    width: 100%;
  }

  p {
    font-family: ${Fonts.GilroySemiBold};
    font-size: 14px;
    color: #8b8d97;
    &:nth-child(odd) {
      color: #292d41;
    }
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
`;

export const ContentInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const History = styled.div`
  width: 65%;
  display: flex;
  align-items: center;

  @media (max-width: 620px) {
    width: 100%;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const Boll = styled.div`
  width: 20px;
  height: 20px;
  background: #3498db;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
  }

  @media (max-width: 620px) {
    display: none;
  }
`;

export const HistoryTitle = styled.div`
  text-align: right;
  position: relative;
  margin-right: 10px;
  p {
    font-family: ${Fonts.GilroySemiBold};
    font-size: 14px;
    color: #292d41;
    line-height: 22px;
  }

  time {
    font-size: 12px;
    color: ${Colors.Gray70};
  }

  @media (max-width: 620px) {
    width: 100%;
    text-align: left;
  }
`;

export const UserInfo = styled.div`
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  flex: 1;
  margin-left: 20px;
  position: relative;
  max-height: 8rem;
  overflow: auto;
  ${getScrollbarStyle()};

  &:before {
    content: "";
    left: -10px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 10px 0;
    border-color: transparent #ffffff transparent transparent;

    @media (max-width: 620px) {
      display: none;
    }
  }

  img {
    width: 30px;
    margin-right: 10px;
    border-radius: 100%;
  }

  p {
    font-family: ${Fonts.OpenSans};
    font-size: 12px;
    line-height: 20px;
    color: #292d41;
  }

  @media (max-width: 620px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const ContentMainBody = styled.div`
  display: grid;
  min-width: 100%;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  column-gap: 4%;
  row-gap: 20px;

  @media (max-width: 620px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ContentMainBodyItem = styled.div`
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 6px;
`;

export const ContentMainBodyItemInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 8px;

  p {
    font-family: ${Fonts.GilroySemiBold};
    font-size: 14px;
    color: #292d41;

    &:nth-child(even) {
      font-family: ${Fonts.OpenSans};
      color: ${Colors.Gray70};
      font-size: 12px;
      margin-bottom: 8px;
    }
  }
`;

export const ContentMainBodyItemIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img,
  p {
    font-family: ${Fonts.GilroySemiBold};
    font-size: 14px;
    text-transform: uppercase;
    margin-right: 16px;
  }
  &:after {
    content: "";
    display: block;
    width: 90%;
    height: 1px;
    background: #000;
  }
`;

export const ContentShipping = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 6px;
  width: 100%;

  @media (max-width: 750px) {
    & *:not(:first-child) {
      display: none;
    }
  }
`;

export const ContentJustification = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 6px;
  width: 100%;
  margin-top: 20px;
`;

export const ContentShippingTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 32px;
  @media (max-width: 750px) {
    margin-bottom: 0px;
  }
  span {
    padding-left: 8px;
    color: #8b8d97;
  }
`;
export const ContentShippingTitleItem = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

export const ContentShippingStatusLine = styled.div`
  position: relative;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  row-gap: 10px;
  align-items: center;
  justify-content: space-between;

  & > p {
    font-family: ${Fonts.OpenSans};
    font-weight: 600;
    font-size: 10px;
    padding: 0 10px;
    color: ${Colors.Gray60};
    text-align: center;
    line-height: 14px;
  }
`;
export const ContentShippingStatusLinePosition = styled.div`
  grid-column: 1 / -1;
  width: 92%;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    width: 90%;
    height: 2px;
    background: #c8cfd4;
  }
`;

interface PositionBollProps {
  position: {
    actual: boolean;
    step: number;
  };
  delayStatus: string;
}

export const PositionBoll = styled.div<PositionBollProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  justify-self: center;
  position: relative;
  transition: all ease 0.3s;

  span {
    width: 20px;
    height: 20px;
    background: ${(props) =>
      props.delayStatus === "G" || props.delayStatus === "W"
        ? Colors.Green
        : props.delayStatus === "R"
        ? Colors.Magenta
        : "#c8cfd4"};
    border-radius: 50%;
    position: absolute;
    z-index: 2;
  }

  &:before {
    content: "";
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 500px;
    height: 2px;
    background: ${Colors.Green};
  }

  &:after {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    z-index: 2;
  }

  ${(props) =>
    props.position.actual &&
    css`
      & {
        background: #c8cfd4;
        width: 20px;
        height: 20px;

        span {
          background: #c8cfd4;
          width: 20px;
          height: 20px;
        }
      }
    `}

  &.atual ~ .boll {
    background: #c8cfd4;
    width: 20px;
    height: 20px;
    &:before {
      display: none;
    }
    span {
      background: #c8cfd4;
      width: 20px;
      height: 20px;
    }
  }

  &:nth-child(1) {
    &:before {
      display: none;
    }
  }
`;

export const ChannelSubtitle = styled.div`
  display: flex;
  grid-template-columns: repeat(9, 1fr);
  align-items: center;
  width: 100%;
  justify-content: center;

  font-size: 10px;
  padding: 0 10px;
  color: #8b8d97;
  text-align: center;
  line-height: 14px;
`;

const channelOptions = {
  red: "#F44336",
  yellow: "#FBC02D",
};

export const ChannelLabel = styled.p<{ channel: "yellow" | "red" }>`
  background-color: ${({ channel }) => channelOptions[channel]};
  text-align: center;
  border-radius: 6px;
  color: white;
  font-family: ${Fonts.GilroyBold};
  font-size: 11px;
  padding: 5px;
`;

export const ChecksContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 750px) {
    display: none;
  }
`;

export const CheckInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px;

  /* @media (max-width: 750px) {
    display: none;
  } */
`;

export const CenterTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

export const Check = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1px;
  background: #f7f7f7;
  padding: 10px 20px;

  &:first-child {
    border-radius: 40px 0 0 40px;
    padding-left: 40px;
  }

  &:last-child {
    border-radius: 0 40px 40px 0;
    padding-right: 40px;
  }
`;

export const DivGrid = styled.div`
  display: grid;
  min-width: 15rem;
  grid-template-columns: 10% 90%;
  grid-template-rows: auto auto;
  grid-template-areas:
    "number title"
    "number name";
`;

export const NumberGrid = styled.p`
  grid-area: number;
  text-align: center;
  align-self: center;
  line-height: 16px;
  font-family: ${Fonts.GilroySemiBold};
`;

export const TitleGrid = styled.p`
  grid-area: title;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  font-family: ${Fonts.GilroySemiBold};
`;

export const NameGrid = styled.p`
  grid-area: name;
  text-align: center;
  color: ${ColorScheme.Secondary};
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  font-family: ${Fonts.GilroySemiBold};
`;

export const CheckImage = styled.img`
  margin-right: 10px;
`;

export const CheckInfo = styled.div<{ isOk: boolean }>`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 12px;
  line-height: 16px;
  color: ${Colors.Gray60};

  p:last-child {
    color: ${ColorScheme.Secondary};
    font-weight: 600;
  }
`;

export const CheckInfoText = styled.div`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 12px;
  line-height: 16px;
  color: ${Colors.Gray60};
  text-align: center;
  min-width: 10rem;

  @media (max-width: 900px) {
    min-width: auto;
  }

  p:last-child {
    color: ${ColorScheme.Secondary};
    font-weight: 600;
  }

  span.date {
    color: ${ColorScheme.Secondary};
  }
`;

export const MapToggleTitle = styled.span`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  text-transform: uppercase;
`;

export const MapLayer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${Colors.White};
`;

export const MapHeader = styled.div`
  grid-column: 1 / -1;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & :last-child {
    margin-left: auto;
  }
`;

export const ImageBase = styled.img`
  max-height: 100px;
`;

export const TrackingContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${Colors.White};
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;

  h3 {
    font-family: ${Fonts.GilroySemiBold};
    font-size: 14px;
    color: ${Colors.Gray70};
    text-transform: uppercase;
  }
`;

export const TrackingSubscription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & :last-child {
    margin-left: auto;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  flex-direction: column;
  background-color: ${Colors.White};
  border-radius: 4px;
  padding: 40px;
  margin: 32px 0;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.Gray20};
    border-radius: 3px;
  }
`;

export const ModalRow = styled.div`
  display: flex;
  padding: 10px;

  & :nth-child(1):not(p) {
    margin-left: auto;
  }

  & :nth-child(2) {
    margin-left: 10px;
  }

  p {
    padding: 10px;
    font-size: 20px;
  }
`;

export const GridHeaderJustification = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 2fr) minmax(0, 2fr) minmax(
      0,
      2fr
    );
  grid-column-gap: 16px;
  align-items: center;
  justify-items: center;
  padding: 10px 0;

  p {
    font-weight: bolder;
    font-family: "Gilroy-SemiBold";
  }
`;

export const GridJustification = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 2fr) minmax(0, 2fr) minmax(
      0,
      2fr
    );
  grid-column-gap: 16px;
  overflow-wrap: break-word;
  align-items: center;
  justify-items: center;
  padding: 10px 0;
`;

export const TooltipBox = styled.div`
  color: #fff;
  width: auto;
  padding: 8px 8px;
  border-radius: 4px;
  display: none;
  & p {
    margin-top: 0.3rem;
    font-family: ${Fonts.OpenSans};
    font-weight: 600;
    font-size: 10px;
    padding: 0 10px;
    color: #fff;
    text-align: center;
    line-height: 14px;
  }
`;

export const TooltipCard = styled.div`
  position: relative;
  & > p {
    font-family: ${Fonts.OpenSans};
    font-weight: 600;
    font-size: 10px;
    padding: 0 10px;
    color: ${Colors.Gray60};
    text-align: center;
    line-height: 14px;
  }

  & p:hover + ${TooltipBox} {
    /* transition: 2s; */
    margin-top: 0.2rem;
    margin-left: 2rem;
    position: absolute;
    /* left: 30px; */
    display: block;
    text-align: center;
    z-index: 9;
    color: #fff;
    background-color: rgba(53, 54, 58);
    padding: 8px 8px;
    border-radius: 4px;
    min-width: 5rem;
  }
`;

export const ContainerTimeLineP = styled.div`
  & > p {
    font-family: ${Fonts.OpenSans};
    font-weight: 600;
    font-size: 10px;
    padding: 0 10px;
    color: ${Colors.Gray60};
    text-align: center;
    line-height: 14px;
  }
`;
