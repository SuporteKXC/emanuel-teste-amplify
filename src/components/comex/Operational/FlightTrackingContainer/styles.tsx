import styled, { css } from "styled-components";
import { Colors, ColorScheme, Fonts, OrderItemStatus } from "styles/constants";
export { Center, Button, ActivityIndicator } from "styles/components";

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

export const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InformationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InformationText = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? Colors.Green : Colors.Black)};
  font-family: ${({ active }) =>
    active ? Fonts.GilroySemiBold : Fonts.GilroyRegular};
  font-size: 12px;
`;
export const InformationLabel = styled.span`
  color: ${Colors.Gray70};
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
`;
