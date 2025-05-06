import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { WarehouseCreationForm } from 'components/Pages/Warehouses';
import * as S from './styles';

export const WarehouseCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const onCreate = useCallback((): void => {
    navigate('/configuracoes/armazens');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Novo armazém"
            icon={<S.WarehouseIcon />}
            actions={
              <S.LinkButton size="small" to="/configuracoes/armazens">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <WarehouseCreationForm onCreate={onCreate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
