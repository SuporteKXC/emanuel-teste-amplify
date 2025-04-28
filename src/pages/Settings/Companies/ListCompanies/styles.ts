import styled from "styled-components";
import { Settings } from "@styled-icons/ionicons-outline";
import { Loading } from "styles/styled-components";

export {
  PageContainer,
  PageHeader,
  PageContent,
  ButtonMini,
} from "styles/styled-components";

export const IconSetting = styled(Settings).attrs({ size: 24 })``;

export const LoadingPage = styled(Loading)`
  margin-left: 16px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  button {
    &:first-child {
      margin-right: 24px;
    }
  }
`;
