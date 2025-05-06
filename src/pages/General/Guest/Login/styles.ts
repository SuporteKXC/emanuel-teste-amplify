import styled from "styled-components";
import { Fonts,ColorScheme } from "styles/constants";
import { Colors } from "styles/constants";
import LoginBackground from 'assets/images/login-background.png';


export const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 1120px;
    width: 100%;
    min-height: 500px;
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
export const FormContainer = styled.div.attrs({ className: 'form-container' })`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: ${Colors.White};
  padding: 72px;
`;

export const Logo = styled.figure`
  margin-bottom: 30px;
`;

export const LogoImage = styled.img`
  width: 150px;
`;

export const Header = styled.header`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  width: 506px;
`;

export const Subtitle = styled.p`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 16px;
  color: ${Colors.Gray60};
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