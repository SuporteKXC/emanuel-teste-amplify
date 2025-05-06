import styled, { css } from 'styled-components';
import { BasePaginatorHeader, BasePaginatorListItem } from 'styles/components';
import { Colors } from 'styles/constants';
export {
  PaginatorColumn as Column,
  PaginatorActionsColumn as ActionsColumn,
} from 'styles/components';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${Colors.Gray30};
  padding-bottom: 16px;
  margin: 32px 0 16px 0;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseGridCss = css`
  grid-template-columns: 64px 320px auto;
`;

export const ListHeader = styled(BasePaginatorHeader)`
  ${baseGridCss}
`;

export const ListItem = styled(BasePaginatorListItem)`
  ${baseGridCss}
`;
