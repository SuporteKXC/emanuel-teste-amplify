import { Fonts, Colors, ColorScheme } from "@/styles/constants";
import styled, { css } from "styled-components";
export { Center, Button, ActivityIndicator } from "styles/components";

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
interface StatusLineProp {
  totalSteps: number;
}
export const ContentShippingStatusLine = styled.div<StatusLineProp>`
  position: relative;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.totalSteps}, 1fr)`};
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
export const ShippingPositioning = styled.div`
  width: 92%;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;
export const ContentShippingStatusLinePosition = styled.div<StatusLineProp>`
  grid-column: 1 / -1;
  width: 100%;
  justify-self: center;
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.totalSteps}, 1fr)`};
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
}

export const PositionBoll = styled.div<PositionBollProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  justify-self: center;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all ease 0.3s;

  span {
    width: 20px;
    height: 20px;
    background: ${Colors.Green};
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
