import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { BaseButtonStyle } from 'styles/components';
import { Fonts, ColorScheme, Colors } from 'styles/constants';

type ColumnColor = 'normal' | 'red' | 'green';

export const BasePaginatorHeader = styled.div.attrs({
  className: 'paginator-header',
})`
  display: grid;
  gap: 0 16px;
  align-items: center;
  padding: 16px 0px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
  font-size: 13px;
  margin-bottom: 8px;

  @media (max-width: 1800px) {
    gap: 0 8px;
  }

  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
`;

export const BasePaginatorListItem = styled.div.attrs({
  className: 'paginator-list-item',
})`
  display: grid;
  gap: 0 16px;
  align-items: center;
  background-color: transparent;
  padding: 12px 0px;
  border-radius: 6px;
  color: ${ColorScheme.Text};
  font-family: ${Fonts.OpenSans};
  font-size: 13px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  @media (max-width: 1800px) {
    gap: 0 8px;
  }
`;

interface IPaginatorColumn {
  color?: ColumnColor;
}

const getColor = (color?: ColumnColor) => {
  switch (color) {
    case 'red':
      return css`
        color: ${Colors.Magenta};
      `;
    case 'green':
      return css`
        color: ${Colors.Green};
      `;
    case 'normal':
    default:
      return css`
        color: currentColor;
      `;
  }
};

export const PaginatorColumn = styled.div.attrs({
  className: 'paginator-column',
})<IPaginatorColumn>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  ${(props) => getColor(props.color)};
`;

export const EmptyListPlaceholder = styled.div`
  padding: 16px 0px;
  font-size: 13px;
`;

export const PaginatorActionsColumn = styled(PaginatorColumn)`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  position: sticky;
  right: 0;
  gap: 0 8px;
  background: linear-gradient(90deg, #fff9, #fff 20%);
`;

// action Button

export type ActionButtonMood = 'primary' | 'danger' | 'void';

interface IActionButton {
  mood?: ActionButtonMood;
}

const applyActionButtonMood = (mood?: ActionButtonMood) => {
  switch (mood) {
    case 'danger':
      return css`
        color: ${Colors.Magenta};
      `;
    case 'void':
      return css`
        color: currentColor;
      `;
    case 'primary':
    default:
      return css`
        color: ${Colors.Orange};
      `;
  }
};

export const ActionButton = styled.button<IActionButton>`
  ${BaseButtonStyle};
  padding: 0 4px;
  ${({ mood: color }) => applyActionButtonMood(color)};
`;

export const LinkActionButton = styled(Link)<IActionButton>`
  ${BaseButtonStyle};
  padding: 0 4px;
  ${({ mood: color }) => applyActionButtonMood(color)};
`;
