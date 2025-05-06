import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseButtonStyle, FormActions as FormActionsStyle } from 'styles/components';
import { ColorScheme, Colors, Fonts } from 'styles/constants';
import { Webcol as Icon } from "styles/components";
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
  margin-left: auto;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
  font-size: 14px;
`;

export const FooterInfo = styled.div`
  display: flex;
  padding: 5px;
  margin-top: 25px;
  font-size: 13px;
  background: ${Colors.Gray70};
  color: ${Colors.Gray30};
  align-items: center;
`;

export const Webcol = styled(Icon)`
  filter: grayscale(1.0);
  margin-right: 2px;
`

export const InputsWrapper = styled.div`
  ${FormActionsStyle};
  margin-top: 0px;
`;

export const FormActions = styled.div`
  margin-bottom: 16px;
`;

export const ForgotWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  
  margin-bottom: 16px;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px
`;