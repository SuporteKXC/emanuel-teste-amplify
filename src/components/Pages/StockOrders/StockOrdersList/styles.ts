import styled, { css } from 'styled-components';
import { BasePaginatorHeader, BasePaginatorListItem } from 'styles/components';
export {
  PaginatorColumn as Column,
  PaginatorActionsColumn as ActionsColumn,
  ActionButton,
  ArrowRightCircleIcon,
} from 'styles/components';

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseGridCss = css`
  grid-template-columns:
    60px 140px 90px repeat(2, 140px) 120px 90px auto
    minmax(0px, max-content);
`;

export const ListHeader = styled(BasePaginatorHeader)`
  ${baseGridCss}
`;

export const ListItem = styled(BasePaginatorListItem)`
  ${baseGridCss}
`;
