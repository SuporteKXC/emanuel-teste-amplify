import React, { useCallback } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import * as S from './styles';
import { cnpj } from 'utils';
import { useTranslation } from 'hooks';

import { translations } from './translations';
import { CompanyCarrier } from 'interfaces/company-carriers';
import {
  DeleteCompanyCarrierState,
  DeleteCompanyCarrierActions,
} from 'store/ducks/settings/company-carriers';

interface IGridCompanyCarrierProps {
  companyCarriers: CompanyCarrier[];
  onDeleteSucess: () => void;
}

interface ItemCompanyCarrierProps {
  companyCarrier: CompanyCarrier;
  onDelete: (id: number) => void;
  loadingDelete: boolean;
}

const Item: React.FC<ItemCompanyCarrierProps> = ({ 
  companyCarrier,
  onDelete,
  loadingDelete,
}) => {
  const { carrier, id } = companyCarrier;
  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{carrier.carrier_code || '---'}</S.ItemValue>
        <S.ItemValue>{carrier.cnpj ? cnpj(carrier.cnpj) : '---'}</S.ItemValue>
        <S.ItemValue>{carrier.trade_name || '---'}</S.ItemValue>
        <S.ItemValue>{carrier.address_city || '---'}</S.ItemValue>
        <S.ItemValue>{carrier.address_state || '---'}</S.ItemValue>
        <S.ButtonTrash onClick={() => onDelete(id)}>
          {loadingDelete ? <S.Loading /> : <S.IconTrash />}
        </S.ButtonTrash>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridCompanyCarriers: React.FC<IGridCompanyCarrierProps> = ({
  companyCarriers = [],
  onDeleteSucess,
}) => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const { loading } = useSelector<RootStateOrAny, DeleteCompanyCarrierState>(
    state => state.deleteCompanyCarrier
  );
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const handleDelete = useCallback(
    (id) => {
      setDeletingId(id);
      dispatch(DeleteCompanyCarrierActions.request(id, () => {
          onDeleteSucess();
          setDeletingId(null);
        }
      ));
    },
    [dispatch, onDeleteSucess]
  );

  return (
    <S.Container>
      {companyCarriers.length > 0 && (
        <>
          <S.Header>
            <S.Label>{getTranslation('codigo')}</S.Label>
            <S.Label>{getTranslation('cnpj')}</S.Label>
            <S.Label>{getTranslation('nomeFantasia')}</S.Label>
            <S.Label>{getTranslation('cidade')}</S.Label>
            <S.Label>{getTranslation('estado')}</S.Label>
          </S.Header>
          {companyCarriers.map(companyCarrier => (
            <Item
              companyCarrier={companyCarrier}
              key={companyCarrier.id}
              onDelete={handleDelete}
              loadingDelete={loading && deletingId === companyCarrier.id}
            />
          ))}
        </>
      )}
    </S.Container>
  );
};
