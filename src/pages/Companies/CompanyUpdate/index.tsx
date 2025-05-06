import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { CompanyUpdateForm } from 'components/Pages/Companies';
import * as S from './styles';

export const CompanyUpdatePage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.fetchCompany);

  const onUpdate = useCallback((): void => {
    navigate('/configuracoes/clientes');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Editar cliente"
            icon={<S.CompanyIcon />}
            isLoading={loading}
            actions={
              <S.LinkButton size="small" to="/configuracoes/clientes">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <CompanyUpdateForm companyId={id} onUpdate={onUpdate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
