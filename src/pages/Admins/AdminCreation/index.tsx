import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { AdminCreationForm } from 'components/Pages/Admins';
import * as S from './styles';

export const AdminCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const onCreate = useCallback((): void => {
    navigate('/configuracoes/administradores');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Novo administrador"
            icon={<S.AdminIcon />}
            actions={
              <S.LinkButton size="small" to="/configuracoes/administradores">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <AdminCreationForm onCreate={onCreate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
