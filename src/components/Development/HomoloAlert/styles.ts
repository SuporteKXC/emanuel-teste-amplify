import styled from 'styled-components';
import { Fonts } from 'styles/constants';
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: #de1745;
  position: sticky;
  top: 0;
  z-index: 9999;
`;

export const Message = styled.span`
  color: #fff;
  font-family: ${Fonts.OpenSans};
  font-weight: 600;
  font-size: 14px;
`;
