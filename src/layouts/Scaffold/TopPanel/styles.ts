import styled, { css } from 'styled-components';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
import { BasePanel, BaseButtonStyle, LogOutCircle } from 'styles/components';
export { AdminIcon, CompanyIcon, WarehouseIcon } from 'styles/components';

export const TopPanel = styled(BasePanel)`
  flex-direction: row;
  width: 100%;
  padding: 8px 32px;
  margin-bottom: 32px;
  font-size: 14px;
  justify-content: space-between;
  font-family: ${Fonts.GilroySemiBold};
`;

export const Domain = styled.div<{ isHover?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  ${({ isHover }) =>
    isHover &&
    css`
      background: ${Colors.Gray10};
      border-radius: 50%;
      position: relative;
      justify-content: center;
      height: 100%;
      aspect-ratio: 1;
      transition: all 0.3s;
      cursor: pointer;

      :hover {
        background: ${Colors.Gray40};
      }
    `}
`;

export const Version = styled.div`
  right: 50%;
  align-self: center;
  font-style: italic;
  color: ${Colors.Gray50};
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 16px;
`;

export const User = styled.span``;

export const LogoutButton = styled.button`
  ${BaseButtonStyle};
  background: ${Colors.Blue10};
  color: ${ColorScheme.Primary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 10px;
`;

export const LogoutIcon = styled(LogOutCircle).attrs({
  size: 20,
})``;
