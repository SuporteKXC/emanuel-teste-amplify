import styled from 'styled-components';
import { Colors } from 'styles/constants';

export const PageContainer = styled.div`
  display: flex;
  background: ${Colors.Gray20};
`;

export const Backdrop = styled.div`
  width: 100%;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  max-width: 1920px;
  padding: 24px;
  width: 100%;
  margin: 0 auto;
  gap: 32px;
`;

export const LeftPanelSlot = styled.div`
  flex: 1 0 auto;
`;

export const MainSlot = styled.div`
  display: flex;
  flex: 0 1 100%;
  flex-direction: column;
`;

export const ChildrenSlot = styled.main``;
