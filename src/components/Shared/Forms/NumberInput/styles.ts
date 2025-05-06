import styled from 'styled-components';
import { Colors, ColorScheme } from 'styles/constants';
import { FieldContainer } from 'styles/components';
export { FieldError, FieldLabel } from 'styles/components';

export const Container = styled(FieldContainer)`
  justify-content: center;
  input {
    width: 100%;
    font-size: inherit;
    border-radius: 6px;
    background: ${Colors.White};
    border: 1px solid ${Colors.Gray50};
    color: ${ColorScheme.Text};
    height: 48px;
    padding: 0 16px;
  }
`;

export const RangeInput = styled.input`
  width: 100%;
  padding: 0 !important;
`
