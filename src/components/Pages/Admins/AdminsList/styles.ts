import styled, { css } from 'styled-components';
import { BasePaginatorHeader, BasePaginatorListItem } from 'styles/components';
export {
  PaginatorColumn as Column,
  PaginatorActionsColumn as ActionsColumn,
  ActionButton,
  LinkActionButton,
  EditIcon,
  TrashIcon,
  ActivityIndicator,
} from 'styles/components';

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseGridCss = css`
  grid-template-columns: 60px 240px auto 72px;
`;

export const ListHeader = styled(BasePaginatorHeader)`
  ${baseGridCss}
`;

export const ListItem = styled(BasePaginatorListItem)`
  ${baseGridCss}
`;
