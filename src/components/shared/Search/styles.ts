import styled from 'styled-components';
import { Search } from '@styled-icons/ionicons-solid';
import { Colors } from 'styles';

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 340px;

  form {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;

  input {
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid ${Colors.Gray30};
    padding: 8px 0;
    width: 100%;
    height: auto;
  }
`;

export const SubmitButton = styled.button`
  color: ${Colors.Gray30};
`;
export const IconSearch = styled(Search).attrs({ size: 24 })``;
