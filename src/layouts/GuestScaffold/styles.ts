import styled from 'styled-components';
import { Colors } from 'styles/constants';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Colors.Gray20};
  min-width: 100vw;
  min-height: 100vh;
  padding: 44px;
  @media screen and (max-width: 768px) {
    padding: 24px;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 0;
`;

export const ChildrenContainer = styled.main`
  z-index: 1;
`;
