import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { MemberUpdateForm } from 'components/Pages/CompanyMembers';
import * as S from './styles';

export const CompanyMemberUpdatePage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { loading } = useSelector(
    (state: RootState) => state.fetchCompanyMember
  );

  const onUpdate = useCallback((): void => {
    navigate('/configuracoes/clientes/usuarios');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            icon={<S.UserRectangleIcon />}
            title="Editar usuário de cliente"
            isLoading={loading}
            actions={
              <S.LinkButton size="small" to="/configuracoes/clientes/usuarios">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <MemberUpdateForm memberId={id} onUpdate={onUpdate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
