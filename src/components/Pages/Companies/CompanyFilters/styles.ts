import styled from 'styled-components';
import { Colors } from 'styles/constants';
export { FormRow } from 'styles/components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 360px auto;
  gap: 8px;
  border-bottom: 1px solid ${Colors.Gray30};
  width: 100%;
  padding-bottom: 24px;
  margin-bottom: 24px;
  .field-container {
    margin-bottom: 0px;
  }
`;
