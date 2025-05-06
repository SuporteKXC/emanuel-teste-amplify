import styled from 'styled-components';
import { ColorScheme, Colors, Fonts } from 'styles/constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-top: 32px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
interface IMenuItem {
  active?: boolean;
}
export const MenuItem = styled.div<IMenuItem>`
  padding: 15px 40px;
  background-color: ${(props) =>
    props.active ? `${ColorScheme.Primary}` : `${Colors.White}`};
  color: ${(props) =>
    props.active ? `${Colors.White}` : `${ColorScheme.Text}`};
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:not(:last-child) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;
