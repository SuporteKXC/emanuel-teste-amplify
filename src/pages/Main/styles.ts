import styled from 'styled-components';
import qrCodeSara from 'assets/images/qrcode-sara.svg';
import qrCodeApp from 'assets/images/qrcode-app.svg';
import avatarSara from 'assets/images/sara.png';
import avatarApp from 'assets/images/app.svg';
import { Colors, fonts } from 'styles';

export const Container = styled.main`
  display: flex;
  width: 100vw;
  max-width: 1920px;
  height: 100vh;
  background: ${Colors.Gray100};
  object-fit: cover;
  margin: 0 auto;
  position: relative;
`;

export const Content = styled.section`
  width: 100vw;
  max-width: 1920px;
  height: 100vh;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;

  .siteBlindado {
    position: absolute;
    bottom: 48px;
    left: 48px;
    z-index: 1;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  column-gap: 64px;
  width: max-content;
  z-index: 2;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.White};
  border-radius: 6px;
  padding: 56px 32px 32px 32px;
  margin-bottom: 32px;
  box-shadow: 0px 5px 30px rgba(77, 14, 65, 0.35);
  z-index: 3;
`;

export const QRCodeSara = styled.img.attrs({ src: qrCodeSara })`
  width: 160px;
`;

export const QRCodeApp = styled.img.attrs({ src: qrCodeApp })`
  width: 160px;
`;

export const AvatarSara = styled.img.attrs({ src: avatarSara })`
  width: 80px;
  margin-top: -90px;
`;

export const AvatarApp = styled.img.attrs({ src: avatarApp })`
  width: 80px;
  margin-top: -90px;
`;

export const Name = styled.span`
  display: block;
  padding: 16px 0;
  font-size: 14px;
  font-family: ${fonts.GilroyBold};
  color: ${Colors.Gray100};
`;

export const Text = styled.article`
  font-family: ${fonts.OpenSans};
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.White};
  text-align: center;
  max-width: 224px;
`;
