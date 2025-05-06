import styled from 'styled-components';
import { BasePanel } from 'styles/components';
import { Colors, Fonts } from 'styles/constants';
export { ListIcon, LinkButton, PlusIcon } from 'styles/components';

export const MainPanel = styled(BasePanel)`
  padding: 32px;
  flex-direction: column;
`;

export const Update = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ContentUpdate = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: row;
  font-size: 13px;
  color: ${Colors.Gray50};
  font-family: ${Fonts.GilroySemiBold};
  p {
    font-family: ${Fonts.GilroyRegular};
  }
`;
