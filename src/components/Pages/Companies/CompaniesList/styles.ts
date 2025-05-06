import styled, { css } from 'styled-components';
import { BasePaginatorHeader, BasePaginatorListItem } from 'styles/components';
export {
  PaginatorColumn as Column,
  PaginatorActionsColumn as ActionsColumn,
  ActionButton,
  LinkActionButton,
  EditIcon,
} from 'styles/components';

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseGridCss = css`
  grid-template-columns: 60px 140px minmax(200px, 300px) 140px auto 32px;
`;

export const ListHeader = styled(BasePaginatorHeader)`
  ${baseGridCss}
`;

export const ListItem = styled(BasePaginatorListItem)`
  ${baseGridCss}
`;
