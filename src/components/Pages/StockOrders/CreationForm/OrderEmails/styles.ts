import styled, { css } from 'styled-components';
import { BasePanel } from 'styles/components';
import { Colors } from 'styles/constants';
import { BasePaginatorHeader, BasePaginatorListItem } from 'styles/components';
export {
  FormRow,
  Button,
  ActionButton,
  ActivityIndicator,
  FormActions,
  TrashIcon,
  PaginatorColumn as Column,
  PaginatorActionsColumn as ActionsColumn,
} from 'styles/components';

export const Panel = styled(BasePanel)`
  flex: 0 1 100%;
  flex-direction: column;
  background: ${Colors.White};
  padding: 24px 0px;
`;

export const Container = styled.div`
  padding: 0px 24px;
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseGridCss = css`
  grid-template-columns: 160px 300px auto minmax(0px, max-content);
`;

export const ListHeader = styled(BasePaginatorHeader)`
  ${baseGridCss}
`;

export const ListItem = styled(BasePaginatorListItem)`
  ${baseGridCss}
`;

export const Error = styled.span`
  color: ${Colors.Magenta};
`;

export const ListContainer = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 24px;
  :hover {
    background-color: ${Colors.Gray30};
  }
`;

export const AddBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  border-top: 1px solid ${Colors.Gray10};
  padding-top: 24px;
  margin-top: 24px;
`;
