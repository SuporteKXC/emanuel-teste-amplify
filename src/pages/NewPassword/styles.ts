import styled from 'styled-components';
import logo from 'assets/images/logo-menu-webcol.png';
import { Colors } from 'styles';
import { PageContainer, PageContent } from 'styles/styled-components';

export {
  PageContent,
  Button,
  ButtonMini,
  BoxContainer,
  FormFooter,
  FormRow,
  Loading,
} from 'styles/styled-components';

export const Container = styled(PageContainer)``;

export const Content = styled(PageContent)`
  width: 100%;
  height: calc(100vh - 74px);
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  form {
    width: 100%;
    button {
      flex: 1;
    }
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 32px;
  background-color: ${Colors.Gray100};
`;

export const Logo = styled.img.attrs({
  src: logo,
})``;

export const Title = styled.h1`
  font-size: 20px;
  color: ${Colors.Gray100};
  margin-bottom: 16px;
  text-align: center;
`;

export const Text = styled.article`
  font-size: 14px;
  text-align: center;
  color: ${Colors.Gray100};
  margin-bottom: 24px;
`;
