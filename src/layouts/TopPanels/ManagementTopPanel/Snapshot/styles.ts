import styled, { css } from 'styled-components';
import { Colors, Fonts } from 'styles/constants';
export {
  AdminIcon,
  CompanyIcon,
  WarehouseIcon,
  OptionButton,
  ActivityIndicator,
} from 'styles/components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${Colors.Gray70};
  background-color: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  margin: 16px;
  padding: 15px 0px 17px;
`;

interface IMenuItem {
  readonly $active?: boolean;
}

const menuItemBaseStyle = ($active: boolean | undefined) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: currentColor;
  transition: 300ms;
  position: relative;
  padding: 0 24px;

  ::after {
    content: '';
    display: block;
    width: 0;
    height: 4px;
    background: ${Colors.Blue30};
    transition: 300ms ease;
    position: absolute;
    bottom: -17px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    ${$active && css`width: 100%;`}
  }

  &:hover {
    cursor: pointer;
    ::after {
      width: 100%;
    }
  }
`

export const MenuItem = styled(NavLink)<IMenuItem>`
  text-transform: capitalize;
  ${({ $active }) => menuItemBaseStyle($active)}
`;

export const MenuItemWithOptions = styled.div<IMenuItem>`
  ${({ $active }) => menuItemBaseStyle($active)}
`;
