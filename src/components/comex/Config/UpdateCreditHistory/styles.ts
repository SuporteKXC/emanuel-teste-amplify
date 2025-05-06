import styled from "styled-components";
import { Link } from "react-router-dom";
import { BaseButtonStyle } from "styles/components";
import { ColorScheme, Fonts } from "styles/constants";
export {
  ActivityIndicator,
  Button,
  FormActions,
  FormRow,
} from "styles/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-row: 2;
  align-items: center;
  column-gap: 10px;
  padding: 10px;
  width: 100%;
  margin: 10px;
`;

export const CheckContainer = styled.div`
  grid-area: 4 / 1 / 4 / 2;
`;

export const GroupContainer = styled.div``;
export const Ghost = styled.div`
  width: 100%;
  background: transparent;
`;
