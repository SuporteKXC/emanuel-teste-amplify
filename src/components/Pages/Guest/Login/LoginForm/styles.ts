import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseButtonStyle } from 'styles/components';
import { ColorScheme, Fonts } from 'styles/constants';
import { FormActions as LoginForm } from 'styles/components';
export {
  ActivityIndicator,
  Button,
  FormRow,
} from 'styles/components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ForgotMyPwsLink = styled(Link)`
  ${BaseButtonStyle};
  margin-bottom: 16px;
  justify-content: end;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.LightText};
  font-size: 14px;
`;

export const ActionsLogin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FormActions = styled(LoginForm)`
  display: flex;
  margin-top: 16px !important;
  flex-direction: column;
`;
