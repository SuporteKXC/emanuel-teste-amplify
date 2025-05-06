import styled, { css } from "styled-components";
import { MapPin } from "@styled-icons/boxicons-solid";
import { Colors } from "styles/constants";
export { FormRow, Button } from "styles/components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 780px;
  max-height: 90vh;
  flex-direction: column;
  background-color: ${Colors.White};
  border-radius: 4px;
  padding: 40px;
  margin: 32px 0;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.Gray70};
    border-radius: 3px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px ${Colors.Gray70} solid;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-left: none;
  border-right: none;

  button:first-child {
    margin-right: 16px;
  }
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${Colors.Black};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-left: none;
  border-right: none;

  button:first-child {
    margin-right: 16px;
  }
`;

export const Icon = styled(MapPin).attrs({ size: 24 })`
  margin-right: 8px;
`;

export const GeolocationWrapper = styled.div<{ active: boolean }>`
  display: none;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 400px;

  margin-bottom: 24px;

  ${({ active }) =>
    active &&
    css`
      display: flex;
    `}

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.Gray70};
    border-radius: 3px;
  }
`;

export const OccurrenceWrapper = styled.div<{ active: boolean }>`
  display: none;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 400px;
  margin-bottom: 24px;

  ${({ active }) =>
    active &&
    css`
      display: flex;
    `}

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.Gray70};
    border-radius: 3px;
  }
`;

export const Geolocation = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 120px 160px auto;
  column-gap: 16px;
  padding: 8px 0;
  border-bottom: 1px ${Colors.Gray70} dotted;

  &:last-child {
    border-bottom: none;
  }
`;

export const Occurrence = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 120px 160px auto;
  column-gap: 16px;
  padding: 8px 0;
  border-bottom: 1px ${Colors.Gray70} dotted;

  &:last-child {
    border-bottom: none;
  }
`;

export const Value = styled.span`
  font-size: 12px;
  color: ${Colors.Gray70};
`;
