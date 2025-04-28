import styled from 'styled-components';
import { LogoutCircleR } from '@styled-icons/remix-line';
import { Colors } from 'styles';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.h6`
  font-size: 14px;
  color: ${Colors.White};
`;

export const Logout = styled.button.attrs({
  type: 'button',
})`
  color: ${Colors.White};
  margin-left: 16px;
  transition: 300ms ease;
  :hover {
    transform: scale(1.2);
  }
`;

export const LogoutIcon = styled(LogoutCircleR).attrs({ size: 20 })``;
