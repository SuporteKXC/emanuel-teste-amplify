import React from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { Product } from 'interfaces/product';
import { useTranslation } from "hooks";
import { translations } from './translations';

interface IGridProductsProps {
  products: Product[] | Record<string, any>[];
}

interface IProductProps {
  product: Product | Record<string, any>;
}

const Item: React.FC<IProductProps> = ({ product }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/products/${product.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{product.code || '--'}</S.ItemValue>
        <S.ItemValue>
          {product.business_line
            ? `${product.business_line.activity_division || '--'}`
            : '--'}
        </S.ItemValue>
        <S.ItemValue>{product.description || '--'}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridProducts: React.FC<IGridProductsProps> = ({
  products = [],
}) => {
  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('codigo')}</S.Label>
        <S.Label>{getTranslation('businessLine')}</S.Label>
        <S.Label>{getTranslation('descricao')}</S.Label>
      </S.Header>
      {products.length > 0 &&
        products.map((product) => <Item product={product} key={product.id} />)}
    </S.Container>
  );
};
