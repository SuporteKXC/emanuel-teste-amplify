import LoginBackground from 'assets/images/login-background.png';
import styled from 'styled-components';
import { Colors } from 'styles/constants';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1120px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  @media screen and (max-width: 980px) {
    flex-direction: column;
    max-width: 640px;
    div.art-container {
      flex: 0 0 auto;
      height: 48px;
      width: 100%;
    }
  }
`;

// Email form

export const FormContainer = styled.div.attrs({ className: 'form-container' })`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: ${Colors.White};
  padding: 72px;
`;

export const Logo = styled.div`
  margin-bottom: 30px;
  img{
    width: 130px;
  }
`;

export const Header = styled.header`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 1rem;
  @media screen and (max-width: 980px) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  span {
    font-weight: bold;
  }
`;

// art

export const ArtContainer = styled.div.attrs({ className: 'art-container' })`
  display: flex;
  flex: 0 0 470px;
  width: 470px;
  background: url(${LoginBackground});
  background-position: center;
  background-size: cover;
`;
