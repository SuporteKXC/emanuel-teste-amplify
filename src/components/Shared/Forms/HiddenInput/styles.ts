import styled from 'styled-components';
export { FieldError } from 'styles/components/forms';

export const MainContainer = styled.span.attrs({ className: 'hidden-input' })`
  /* This is a hack to make this component not conflict with the formRow gaps */
  position: fixed;
  width: 0;
  height: 0;
  input {
    position: absolute;
    left: -200vw;
  }
`;
