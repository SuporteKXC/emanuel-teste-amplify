import styled from 'styled-components';
import { Settings } from '@styled-icons/ionicons-outline';
import { ArrowNarrowLeft } from '@styled-icons/heroicons-outline';
import { Loading } from 'styles/styled-components';
import { Colors } from 'styles';

export {
  PageContainer,
  PageHeader,
  PageContent,
  Button,
  ButtonMini,
  BoxContainer,
  FormFooter,
  FormRow,
  Loading,
} from 'styles/styled-components';

export const IconSetting = styled(Settings).attrs({ size: 24 })``;

export const LoadingPage = styled(Loading)`
  margin-left: 16px;
`;

export const IconArrowLeft = styled(ArrowNarrowLeft).attrs({ size: 20 })`
  margin-right: 8px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
`;

export const LastUpdate = styled.div`
  width: 100%;
  label {
    display: block;
    font-family: GilroySemiBold;
    font-size: 14px;
    color: ${Colors.Gray100};
    margin-top: 8px;
  }
  p {
    display: flex;
    align-items: center;
    height: 50px;
  }
`;
