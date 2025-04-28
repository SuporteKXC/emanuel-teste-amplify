import styled from "styled-components";
import { Settings } from "@styled-icons/ionicons-outline";
import { ArrowNarrowLeft } from "@styled-icons/heroicons-outline";
import { Loading } from "styles/styled-components";

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
} from "styles/styled-components";

export const IconSetting = styled(Settings).attrs({ size: 24 })``;

export const LoadingPage = styled(Loading)`
  margin-left: 16px;
`;

export const IconArrowLeft = styled(ArrowNarrowLeft).attrs({ size: 20 })`
  margin-right: 8px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  button{
    margin-right: 10px;
  }
`;