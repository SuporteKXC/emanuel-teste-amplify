import styled from 'styled-components';
import { FormActions } from 'styles/components';

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
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  padding:10px;
  width: 100%;
  margin:10px;
`;

export const CheckContainer = styled.div`
  grid-area: 3 / 1 / 4 / 3;
  `

export const Ghost = styled.div`
  width:100%;
  background:transparent;
`

export const FormActionsNew = styled(FormActions)`
  grid-area: 5 / 2;
`