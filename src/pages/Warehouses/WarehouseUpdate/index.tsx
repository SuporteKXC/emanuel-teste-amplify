import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { Scaffold } from 'layouts';
import { FormPageHeader } from 'components/Shared';
import { WarehouseUpdateForm } from 'components/Pages/Warehouses';
import * as S from './styles';

export const WarehouseUpdatePage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.fetchWarehouse);

  const onUpdate = useCallback((): void => {
    navigate('/configuracoes/armazens');
  }, [navigate]);

  return (
    <Scaffold>
      <S.PageContainer>
        <S.MainPanel>
          <FormPageHeader
            title="Editar armazém"
            icon={<S.WarehouseIcon />}
            isLoading={loading}
            actions={
              <S.LinkButton size="small" to="/configuracoes/armazens">
                <S.ArrowLeftIcon /> Voltar
              </S.LinkButton>
            }
          />
          <WarehouseUpdateForm warehouseId={id} onUpdate={onUpdate} />
        </S.MainPanel>
      </S.PageContainer>
    </Scaffold>
  );
};
