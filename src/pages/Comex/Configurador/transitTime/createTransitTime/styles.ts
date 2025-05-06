import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";

export {
  ActivityIndicator,
  Button,
  FormActions,
  FormRow,
} from "styles/components";

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background-color: ${Colors.White};
  align-items: flex-start;
  margin: 15px 0px;
  font-family: ${Fonts.GilroyBold};
  font-weight: bold;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0px;
  background-color: ${Colors.White};
  padding: 25px 15px;
  border-radius: 10px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  width: 100%;

`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
`;
