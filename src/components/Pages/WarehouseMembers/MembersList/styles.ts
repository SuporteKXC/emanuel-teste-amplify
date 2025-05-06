import styled, { css } from 'styled-components';
import { BasePaginatorHeader, BasePaginatorListItem } from 'styles/components';
import { Colors, Fonts } from 'styles/constants';
import { FilterIcon } from 'styles/components';
export { FormRow, FormActions, Button } from 'styles/components';

export {
  PaginatorActionsColumn as ActionsColumn,
  ActionButton,
  LinkActionButton,
  EditIcon,
  TrashIcon,
  ActivityIndicator,
  LoginIcon,
  PackageSolidIcon,
} from 'styles/components';

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseGridCss = css`
  grid-template-columns: 60px 240px 240px auto 72px;
`;

export const ListHeader = styled(BasePaginatorHeader)`
  ${baseGridCss}
`;

export const ButtonModal = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 3px;
  min-width: 13px;
  height: 13px;
  top: 0;
  right: 0;
  border-radius: 50%;
  background: ${Colors.Gray70};
  color: ${Colors.White};
  font-family: ${Fonts.GilroySemiBold};
  font-size: 10px;
`;

export const ListItem = styled(BasePaginatorListItem)`
  ${baseGridCss}
`;

export const Container = styled.div`
  .filter {
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 360px)) auto;
    gap: 16px;
    border-bottom: 1px solid ${Colors.Gray30};
    width: 100%;
    padding-bottom: 24px;
    margin-bottom: 24px;
    .field-container {
      margin-bottom: 0px;
    }
  }
`;

const gridTemplate = css`
  grid-template-columns: 1.2fr 1fr 1fr 0.5fr;
  gap: 15px;
  width: 100%;
`;

export const Column = styled.div`
  display: grid;
  ${gridTemplate};
  font-family: ${Fonts.OpenSans};
  font-size: 13px;
  padding: 8px 0;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }
`;

export const IconFilter = styled(FilterIcon)`
  color: transparent;
  width: 27px;
  height: 27px;
  stroke: ${Colors.Gray60};
  stroke-width: 1pt;
`;

export const ButtonFilter = styled.button.attrs({ type: 'button' })`
  display: flex;
  justify-self: end;
  align-items: center;
  justify-content: center;
  width: min-content;
  &:hover {
    svg {
      color: ${Colors.Gray60};
      stroke-width: 0;
    }
  }
`;
