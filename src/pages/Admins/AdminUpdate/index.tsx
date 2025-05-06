import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { AdminUpdateForm } from 'components/Pages/Admins';
import * as S from './styles';

export const AdminUpdatePage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.fetchAdmin);

  const onUpdate = useCallback((): void => {
    navigate('/configuracoes/administradores');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Editar administrador"
            icon={<S.AdminIcon />}
            isLoading={loading}
            actions={
              <S.LinkButton size="small" to="/configuracoes/administradores">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <AdminUpdateForm adminId={id} onUpdate={onUpdate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
