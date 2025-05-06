import styled from 'styled-components';
import { Colors, ColorScheme } from 'styles/constants';
import { FieldContainer } from 'styles/components';
export { FieldError, FieldLabel } from 'styles/components';

export const Container = styled(FieldContainer)`
  margin-right: 16px;
  input {
    font-size: inherit;
    border-radius: 6px;
    background: ${Colors.White};
    border: 1px solid ${Colors.Gray50};
    color: ${ColorScheme.Text};
    height: 48px;
    padding: 0 16px;
  }
`;
