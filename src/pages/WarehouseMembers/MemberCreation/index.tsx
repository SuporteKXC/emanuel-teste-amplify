import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { MemberCreationForm } from 'components/Pages/WarehouseMembers';
import * as S from './styles';

export const WarehouseMemberCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const onCreate = useCallback((): void => {
    navigate('/configuracoes/armazens/usuarios');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Novo usuário de armazém"
            icon={<S.UserRectangleIcon />}
            actions={
              <S.LinkButton size="small" to="/configuracoes/armazens/usuarios">
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
