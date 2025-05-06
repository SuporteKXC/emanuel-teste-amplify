import styled from "styled-components";
import { Calendar } from "@styled-icons/boxicons-solid";
import { ArrowRight } from "@styled-icons/bootstrap";
import { Colors, Fonts } from "styles/constants";
export { FormRow, Button } from "styles/components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
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
  width: 100%;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px ${Colors.Gray70} solid;
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

export const IconMessage = styled(Calendar).attrs({ size: 24 })`
  margin-right: 8px;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 32px;
`;

export const Column = styled.div``;

export const Label = styled.h5`
  font-family: ${Fonts.GilroyBold};
  font-size: 12px;
  text-transform: uppercase;
  color: ${Colors.Gray70};
  margin-bottom: 4px;
`;

export const Value = styled.span`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 16px;
  text-transform: uppercase;
  color: ${Colors.Gray50};
`;

export const IconArrowRight = styled(ArrowRight).attrs({ size: 32 })`
  color: ${Colors.Blue};
  margin: 0 48px;
  align-self: center;
`;
