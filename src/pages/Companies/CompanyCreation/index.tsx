import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { CompanyCreationForm } from 'components/Pages/Companies';
import * as S from './styles';

export const CompanyCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const onCreate = useCallback((): void => {
    navigate('/configuracoes/clientes');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Novo cliente"
            icon={<S.CompanyIcon />}
            actions={
              <S.LinkButton size="small" to="/configuracoes/clientes">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <CompanyCreationForm onCreate={onCreate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
