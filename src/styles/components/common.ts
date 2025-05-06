import styled, { css } from 'styled-components';
import { Colors, Fonts } from 'styles/constants';

export const BasePanelStyle = css`
  display: flex;
  border-radius: 6px;
  /* box-shadow: 0 12px 20px -8px #00000033; */
  background: ${Colors.White};
`;

export const BasePanel = styled.div`
  ${BasePanelStyle};
`;

export const Center = styled.div`
    font-family: ${Fonts.GilroyBold};
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 1 / -1;
`