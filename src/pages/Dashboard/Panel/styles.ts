import styled from 'styled-components';
import { BasePanel } from 'styles/components';
import { Colors, Fonts } from 'styles/constants';
export { DashboardIcon, LinkButton, PlusIcon } from 'styles/components';

export const MainPanel = styled(BasePanel)`
  padding: 32px;
  flex-direction: column;
`;

export const Container = styled.div`
  iframe {
    border: 0;
    border-radius: 9px;
  }
`;

export const Iframe = styled.iframe.attrs({
  width: '100%',
  height: '800',
})``;

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
