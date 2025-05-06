import styled from 'styled-components';
import { Colors, Fonts } from 'styles/constants';
export { ActivityIndicator } from 'styles/components';

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;
  border-bottom: 1px solid ${Colors.Gray30};
  padding-bottom: 24px;
  margin-bottom: 24px;
`;

export const TitleSlot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 8px;
`;

export const Title = styled.span`
  font-family: ${Fonts.GilroyBold};
  font-size: 20px;
`;

export const ActionsSlot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 8px;
  margin-left: auto;
`;
