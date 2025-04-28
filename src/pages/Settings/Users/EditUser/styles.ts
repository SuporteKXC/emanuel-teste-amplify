import styled from 'styled-components';
import { Settings } from '@styled-icons/ionicons-outline';
import { ArrowNarrowLeft } from '@styled-icons/heroicons-outline';
import { Plus } from '@styled-icons/heroicons-solid';
import { Loading, Button } from 'styles/styled-components';
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

export const EditContainer = styled.div`
  display: flex;
  width: 100%;
  margin-right: 0;
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  width: 100%;
  /* flex-wrap: row; */
`;

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
  margin-bottom: 8px;
`;

export const Text = styled.article`
  font-size: 14px;
  color: ${Colors.Gray40};
  margin-bottom: 24px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
`;

export const Drax = styled.div`
  width: 0px;
  height: 0px;
  left: 0px;
  position: absolute;
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
