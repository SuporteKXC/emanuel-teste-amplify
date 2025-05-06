import styled from 'styled-components';
import { FormActions as _FormActions } from 'styles/components';
import { ColorScheme, Fonts } from 'styles/constants';
export { FormRow, Button, ActivityIndicator } from 'styles/components';

export const Container = styled.div`
  width: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
  gap: 6px 0;
`;

export const InfoTitle = styled.h4`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 16px;
`;

export const InfoSubtitle = styled.p`
  color: ${ColorScheme.LightText};
  font-size: 12px;
`;

export const FormActions = styled(_FormActions)`
  justify-content: stretch;
  button {
    flex: 1;
  }
`;
