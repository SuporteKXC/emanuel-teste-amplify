import styled, { css } from 'styled-components';
import { BasePaginatorHeader, BasePaginatorListItem } from 'styles/components';
import { Colors, Fonts } from 'styles/constants';
import { CalendarIcon as Calendar } from 'styles/components';
import { PaginatorColumn } from 'styles/components';
export {
  PaginatorActionsColumn as ActionsColumn,
  ActionButton,
  LinkActionButton,
  EditIcon,
} from 'styles/components';

interface IListItem {
  expire?: string | void | null;
  padding?: boolean;
}

export const Column = styled(PaginatorColumn)<IListItem>`
  border-radius: 5px;
  ${({ padding }) =>
    padding &&
    css`
      padding: 5px 10px;
    `}
  ${({ expire }) => {
    switch (expire) {
      case 'alert':
        return css`
          background-color: ${Colors.Yellow};
          color: ${Colors.Yellow70};
          font-family: ${Fonts.GilroySemiBold};
          width: min-content;
        `;
      case 'expired':
        return css`
          background-color: ${Colors.Pink10};
          color: ${Colors.Red70};
          font-family: ${Fonts.GilroySemiBold};
          width: min-content;
        `;
      default:
        return css``;
    }
  }}
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseGridCss = css`
  grid-template-columns:
    50px 90px 140px 40px 60px repeat(2, 100px) 50px
    100px repeat(2, 100px)
    100px 100px;
`;

export const ListHeader = styled(BasePaginatorHeader)`
  ${baseGridCss}
  padding-left: 5px;
`;

export const ListItem = styled(BasePaginatorListItem)`
  ${baseGridCss}
  padding-left: 5px;
`;

export const CalendarIcon = styled(Calendar).attrs({ width: 20, height: 20 })<{
  overdue?: string | void;
}>`
  border-radius: 5px;
  ${({ overdue }) => {
    switch (overdue) {
      case 'alert':
        return css`
          color: ${Colors.Yellow50};
        `;
      case 'expired':
        return css`
          color: ${Colors.Red70};
        `;
      default:
        return css`
          color: ${Colors.Gray65};
        `;
    }
  }}
`;

export const InfoContent = styled.div`
  display: block;
  width: 100%;
  white-space: pre-line;
  overflow-wrap: break-word;
  font-size: 14px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid;
  border-bottom-color: ${Colors.Gray60};
`;

export const InfoTitle = styled.div`
  padding-right: 4px;
  float: left;
  font-size: 14px;
  color: ${Colors.Gray10};
  font-weight: 600;
  white-space: nowrap;
`;

export const InfoContainer = styled.div`
  display: none;
  flex-direction: column;
  background: ${Colors.Gray65};
  width: 250px;
  padding: 20px;
  border-radius: 5px;
  position: absolute;
  left: -270px;
  animation: showInfo ease-out 200ms;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;

  @keyframes showInfo {
    from {
      transform: translateX(25%) scale(0.7);
      opacity: 0.5;
    }
    to {
      transform: translateX(0%) scale(1);
      opacity: 1;
    }
  }

  ${InfoContent}:last-child {
    padding-bottom: 0px;
    margin-bottom: 0px;
    border-bottom: 0px;
  }
`;

export const Tail = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background: ${Colors.Gray65};
  top: 45%;
  right: -5px;
  transform: rotate(45deg);
  z-index: 0;
`;

export const IconContainer = styled.div`
  display: flex;
  overflow: visible;
  position: relative;
  cursor: pointer;
  align-items: center;
  color: ${Colors.Gray30};
  justify-content: center;
  :hover {
    ${InfoContainer} {
      display: flex;
    }
  }
`;

export const Info = styled.div`
  font-family: ${Fonts.OpenSans};
  width: 100%;

  font-weight: 400;
  font-size: 14px;
  color: ${Colors.White};
`;
