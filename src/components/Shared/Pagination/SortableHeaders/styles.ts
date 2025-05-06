import styled, { css } from 'styled-components';
import { Sort, SortDown, SortUp } from 'styles/components';
import { ColorScheme, Fonts } from 'styles/constants';

export const SortableHeader = styled.button.attrs({ type: 'button' })<{
  padding?: boolean;
}>`
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 4px;
  svg path {
    fill: currentColor;
  }
  ${({ padding }) => padding && css`padding: 5px 10px;`}
`;

export const SortIcon = styled(Sort).attrs({
  size: 12,
})``;

export const SortDownIcon = styled(SortDown).attrs({
  size: 12,
})``;

export const SortUpIcon = styled(SortUp).attrs({
  size: 12,
})``;
