import styled, { css } from 'styled-components';
import { Colors } from 'styles/constants';

export const BasePanelStyle = css`
  display: flex;
  border-radius: 6px;
  /* box-shadow: 0 12px 20px -8px #00000033; */
  background: ${Colors.White};
`;

export const BasePanel = styled.div`
  ${BasePanelStyle};
`;
