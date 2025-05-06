import React from 'react';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { AccountUpdateForm } from 'components/Pages/Account/MyAccount';
import * as S from './styles';

export const MyAccountPage: React.FC = () => {
  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader title="Minha conta" icon={<S.UserPinIcon />} />
          <AccountUpdateForm />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
