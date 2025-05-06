import React from 'react';
import * as S from './styles';
import { Formatter } from 'utils';
import { Warehouse } from 'contracts/WarehouseMembers';

interface WarehouseProps extends Partial<Warehouse> {
  hasStock?: boolean;
}

interface Props {
  warehouses: WarehouseProps[];
  onClose: (_?: any | null) => void;
  isOpen: boolean;
  isLoading?: boolean;
  isTopPanel?: boolean;
}

export const WarehousesModal = React.memo((props: Props): JSX.Element => {
  const { warehouses, onClose, isOpen, isLoading, isTopPanel } = props;

  return (
    <S.ModalBackground isOpen={isOpen}>
      <S.ModalContainer isTopPanel={isTopPanel}>
        <S.FormPageHeader
          title="Armazéns permitidos"
          icon={<S.PackageSolidIcon />}
          isLoading={isLoading}
          actions={
            <S.CloseButton onClick={() => onClose()}>
              <S.CloseIcon />
            </S.CloseButton>
          }
        />
        <S.Header>
          <span />
          <p>ARMAZÉM</p>
          <p>CNPJ</p>
          <p>CIDADE</p>
          <p>ESTADO</p>
        </S.Header>
        {warehouses.length &&
          warehouses.map(
            ({
              id,
              tradeName,
              document,
              addressCity,
              addressState,
              hasStock,
            }) => (
              <S.Row key={id}>
                <span
                  title={hasStock ? 'Estoque disponível' : 'Sem estoque'}
                  className={hasStock ? '' : 'isEmpty'}
                />
                <p>{tradeName ?? '---'}</p>
                <p>{document ? Formatter.cnpj(document) : '---'}</p>
                <p>{addressCity ?? '---'}</p>
                <p>{addressState ?? '---'}</p>
              </S.Row>
            )
          )}
      </S.ModalContainer>
    </S.ModalBackground>
  );
});
