import styled from "styled-components";
import { Settings } from "@styled-icons/ionicons-outline";
import { ArrowNarrowLeft } from "@styled-icons/heroicons-outline";
import { Loading } from "styles/styled-components";

export {
  PageContainer,
  PageHeader,
  PageContent,
  ButtonMini,
  Button,
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
  button {
    &:first-child {
      margin-right: 24px;
    }
  }
`;

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 40px 32px;
  background-color: #fff;
  border-radius: 15px;
  min-height: 20vw;
`;

export const TitleLabel = styled.h2`
  padding: 0px 0px 5px 0px;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 0px 15px 0px;
`;

export const LogHMLT = styled.div`
  .box ul li {
    grid-template-columns: 110px auto;
    font-size: 14px;
  }
  .box ul li span {
    font-size: 14px;
  }

  
`;

export const InfoText = styled.p`
  display: flex;
  flex-direction: column;
  width: 90%;
  text-align: center;
`;

export const BorderContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #444;
  border-radius: 6px;
  max-width: auto;
  padding: 20px;
`;
