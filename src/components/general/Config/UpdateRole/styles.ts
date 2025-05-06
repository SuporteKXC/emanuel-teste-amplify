import styled from "styled-components";
import { ColorScheme, Fonts } from 'styles/constants';
export {
  ActivityIndicator,
  Button,
  FormActions,
  FormRow,
} from 'styles/components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 2fr 2fr;
  padding: 12px;
  width: 100%;
  margin-top: 13px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const CheckContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  grid-column: 1/-1;
  `
  
export const ChecksHeader = styled.div`
  grid-column: 1;
  display: flex;
  align-items: center;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Text};
  
  & button:nth-child(1) {
    margin-left: 5px;
    margin-right: 12px;
  }
`
export const ContainerButton = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 12px;
  
`

export const Ghost = styled.div`
  width:100%;
  background:transparent
`