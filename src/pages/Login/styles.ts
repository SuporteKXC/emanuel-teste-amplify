import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import bgLogin from 'assets/images/bg-login.jpg';
import { Colors } from 'styles';
import { Button } from 'styles/styled-components';

export { Loading } from 'styles/styled-components';

export const Container = styled.main`
  display: flex;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;

  padding: 48px 48px 48px 96px;
  background: ${Colors.Gray100};

  form {
    display: block;
    flex-direction: column;

    label {
      color: #fff;
    }
  }

  .first {
    margin-bottom: 0;
    input {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .last {
    input {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

export const ImageBackground = styled.figure`
  flex: 1;
  height: 100%;
  background: #ccc url(${bgLogin}) no-repeat center center;
`;

export const Logo = styled.img.attrs({
  src: logo,
})``;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
`;
export const InputsWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 16px;
  color: ${Colors.White};
`;

export const Subtitle = styled.h2`
  font-size: 16px;
  margin-bottom: 24px;
  opacity: 0.7;
  color: ${Colors.White};
`;

export const Ghost = styled.div``;

export const ForgotWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const Forgot = styled(Link)`
  color: white;
  text-decoration: underline;
  font-size: 14px;
`;

export const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 16px;
  align-items: center;
`;

export const SubmitButton = styled(Button)``;
