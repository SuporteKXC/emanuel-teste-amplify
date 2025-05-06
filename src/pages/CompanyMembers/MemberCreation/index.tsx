import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { MemberCreationForm } from 'components/Pages/CompanyMembers';
import * as S from './styles';

export const CompanyMemberCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const onCreate = useCallback((): void => {
    navigate('/configuracoes/clientes/usuarios');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Novo usuário de cliente"
            icon={<S.UserRectangleIcon />}
            actions={
              <S.LinkButton size="small" to="/configuracoes/clientes/usuarios">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <MemberCreationForm onCreate={onCreate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
