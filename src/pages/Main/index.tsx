import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import QRCode from 'react-qr-code';
import { AuthState } from 'store/ducks/auth';
import { AsideMenu, Clock } from 'components/Main';
import { BackgroundTransition } from 'components/Main/Background';

import * as S from './styles';

export const Main: React.FC = () => {
  const { data } = useSelector<RootStateOrAny, AuthState>(
    (state) => state.auth
  );
  return (
    <S.Container>
      <Clock />
      <AsideMenu />
      <S.Content>
        {data?.app_access ? (
          <S.ItemWrapper>
            <S.Item>
              <S.Box>
                <S.AvatarSara />
                <S.Name>Sara</S.Name>
                <QRCode
                  value="https://api.whatsapp.com/send/?phone=5524999585260"
                  size={160}
                />
              </S.Box>
              <S.Text>
                Escaneie esse código para iniciar uma conversa com Sara no
                WhatsApp.
              </S.Text>
            </S.Item>
            <S.Item>
              <S.Box>
                <S.AvatarApp />
                <S.Name>Aplicativo</S.Name>
                <QRCode value="https://app.environmental.webcol.systems/" size={160} />
              </S.Box>
              <S.Text>
                Escaneie esse código para acessar o aplicativo de consulta de
                notas fiscais.
              </S.Text>
            </S.Item>
          </S.ItemWrapper>
        ) : (
          <> </>
          )}
      </S.Content>
      <BackgroundTransition />    
    </S.Container>
  );
};
