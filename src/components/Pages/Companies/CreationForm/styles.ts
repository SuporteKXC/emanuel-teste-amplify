import styled from 'styled-components';
export {
  FormRow,
  Button,
  LinkButton,
  ActivityIndicator,
  FormActions,
} from 'styles/components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  flex: 1 0 100%;
  form {
    width: 100%;
  }
`;
