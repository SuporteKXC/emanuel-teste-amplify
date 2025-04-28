import React from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { PalletType } from 'interfaces/pallet-type';
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridPalletTypesProps {
  palletTypes: PalletType[] | Record<string, any>[];
}

interface IPalletTypesProps {
  palletType: PalletType | Record<string, any>;
}

const Item: React.FC<IPalletTypesProps> = ({ palletType }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/pallet-types/${palletType.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{palletType.description || '--'}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridPalletTypes: React.FC<IGridPalletTypesProps> = ({
  palletTypes = [],
}) => {
  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('descricao')}</S.Label>
      </S.Header>
      {palletTypes.length > 0 &&
        palletTypes.map((palletType) => <Item palletType={palletType} key={palletType.id} />)}
    </S.Container>
  );
};
