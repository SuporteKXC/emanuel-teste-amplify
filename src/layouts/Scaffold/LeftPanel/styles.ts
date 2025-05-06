import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Colors,
  ColorScheme,
  Fonts,
  getScrollbarStyle,
  leftPanelScrollbarStyle,
} from 'styles/constants';
import { BasePanel } from 'styles/components';
import { RecallIcon } from 'styles/components';
export {
  ListIcon,
  UserPinIcon,
  SettingsIcon,
  CompanyIcon,
  UserRectangleIcon,
  AdminIcon,
  ArchiveOut,
  DashboardIcon,
} from 'styles/components';

export const LeftPanel = styled(BasePanel)<{ recall: boolean }>`
  flex: 1 0 100%;
  position: sticky;
  width: ${({ recall }) => (recall ? `92px` : `240px`)};
  transition: width 700ms;
  height: calc(100vh - 48px);
  flex-direction: column;
  top: 24px;
  background: ${Colors.Gray70};
  color: ${Colors.White};
`;

export const Container = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  height: 100%;
  ${leftPanelScrollbarStyle()};
`;

export const Recall = styled(RecallIcon)<{ recall: boolean }>`
  display: flex;
  transform: ${({ recall }) => (recall ? `rotate(0deg)` : `rotate(-180deg)`)};
  transition: transform 500ms;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  right: -10px;
  bottom: 70%;
`;

// Header

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.figure`
  margin: 52px 0;
`;

export const LogoImage = styled.img.attrs({
  src: require('assets/images/light-logo.png'),
})``;

// Body

export const NavigationMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 8px;
  ${getScrollbarStyle()};
`;

interface IMenuItem {
  active?: boolean;
  recall: boolean;
}

export const MenuItem = styled(Link)<IMenuItem>`
  display: flex;
  flex-direction: column;
  color: currentColor;
  padding: 8px 32px;
  border-left: 4px solid #ffffff00;
  transition: all 0.2s ease-in-out;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    border-left: 4px solid ${ColorScheme.Primary};
    cursor: pointer;
  }
  ${({ recall }) =>
    recall &&
    css`
      ${MenuItemBody} {
        display: none;
      }
    `}
  ${({ active }) =>
    active &&
    css`
      border-left: 4px solid ${ColorScheme.Primary};
    `}
`;

export const MenuItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 15px;
  margin-bottom: 8px;
  gap: 0 9px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  svg {
    min-width: 23px;
  }
`;

export const MenuItemBody = styled.p`
  font-size: 12px;
  font-family: ${Fonts.OpenSans};
  color: ${ColorScheme.LightText};
  max-height: 51px;
  min-height: 51px;
  min-width: 172px;
  transition: color 1s;
`;

// Footer

export const Footer = styled.div`
  text-align: center;
  font-size: 11px;
  padding: 12px 12px;
  align-self: center;
  margin-top: auto;
  color: ${Colors.Gray50};
`;
