import styled from 'styled-components';
import { Settings } from '@styled-icons/ionicons-outline';
import { ArrowNarrowLeft } from '@styled-icons/heroicons-outline';
import { Loading, Button } from 'styles/styled-components';
import { Colors } from 'styles';
import { Plus } from '@styled-icons/heroicons-solid';

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

export const LoadingAdd = styled(Loading)`
  margin-right: 8px;
`;

export const IconArrowLeft = styled(ArrowNarrowLeft).attrs({ size: 20 })`
  margin-right: 8px;
`;

export const Ghost = styled.div`
  width: 100%;
`;

export const HeaderButtons = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
`;

export const IconPlus = styled(Plus).attrs({ size: 20 })`
  margin-right: 8px;
`;

export const ButtonAdd = styled(Button)`
  height: 50px;
`;

export const ButtonAddWrapper = styled.div`
  height: 50px;
  margin-top: 25px;
`;

export const Title = styled.h2`
  margin: 32px 0 8px;
`;

export const Text = styled.article`
  font-size: 14px;
  color: ${Colors.Gray40};
  margin-bottom: 24px;
`;
