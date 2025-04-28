import styled from 'styled-components';
import { LogoutCircleR } from '@styled-icons/remix-line';
import { Colors } from 'styles';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 2px dotted ${Colors.White}35;
`;

export const Name = styled.h6`
  font-size: 18px;
  color: ${Colors.White};
`;

export const Logout = styled.button.attrs({
  type: 'button',
})`
  color: ${Colors.Orange};
  margin-left: 16px;
  transition: 300ms ease;
`;

export const LogoutIcon = styled(LogoutCircleR).attrs({ size: 20 })``;
