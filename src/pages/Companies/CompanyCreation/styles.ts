import styled from 'styled-components';
import { BasePanel } from 'styles/components';
import { Colors } from 'styles/constants';
export { CompanyIcon, LinkButton, ArrowLeftIcon } from 'styles/components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: columns;
  gap: 24px;
`;

export const MainPanel = styled(BasePanel)`
  flex: 0 1 100%;
  flex-direction: column;
  background: ${Colors.White};
  padding: 24px;
`;
