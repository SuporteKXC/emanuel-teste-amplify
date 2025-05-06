import styled from 'styled-components';
import { Sort, SortDown, SortUp } from 'styles/components';
import { ColorScheme, Fonts } from 'styles/constants';

export const SortableHeader = styled.button.attrs({ type: 'button' })`
  font-family: ${Fonts.GilroySemiBold};
  text-transform: uppercase;
  color: ${ColorScheme.Text};
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 4px;
  svg path {
    fill: currentColor;
  }
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
