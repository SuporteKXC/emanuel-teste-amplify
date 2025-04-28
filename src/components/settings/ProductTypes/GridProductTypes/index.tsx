import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { ProductType } from "interfaces/product-type";
import { useTranslation } from 'hooks';

import { translations } from './translations';
interface IGridProductTypesProps {
  productTypes: ProductType[] | Record<string, any>[];
}

interface IProductTypesProps {
  productType: ProductType | Record<string, any>;
}

const Item: React.FC<IProductTypesProps> = ({ productType }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/product-types/${productType.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{productType.description || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridProductTypes: React.FC<IGridProductTypesProps> = ({
  productTypes = [],
}) => {
  const { getTranslation } = useTranslation(translations);
  
  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('descricao')}</S.Label>
      </S.Header>
      {productTypes.length > 0 &&
        productTypes.map((productType) => <Item productType={productType} key={productType.id} />)}
    </S.Container>
  );
};
