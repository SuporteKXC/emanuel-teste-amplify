import React from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styles';
import { ProductException } from 'interfaces/product-exception';
import { useTranslation } from 'hooks';
import { translations } from './translations';
import {
  DeleteProductExceptionActions,
} from 'store/ducks/settings/product-exceptions';

interface IGridProductExceptionsProps {
  productExceptions: ProductException[] | Record<string, any>[];
  onDelete: any;
}

interface IProductExceptionsProps {
  productException: ProductException | Record<string, any>;
  onDelete: any;
}

const Item: React.FC<IProductExceptionsProps> = ({ productException, onDelete }) => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const handleDelete = () => {
    if(productException.id) {
      dispatch(DeleteProductExceptionActions.request(productException.id, onDelete));
    }
  }
  
  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{
          productException.exception ?
          productException.exception.description :
          '--'
        }</S.ItemValue>
        <S.Button     
          btStyle='danger'
          type='button' 
          onClick={handleDelete}
        >
          {getTranslation('remover')}
        </S.Button>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridProductExceptions: React.FC<IGridProductExceptionsProps> = ({
  productExceptions = [],
  onDelete
}) => {
  const { getTranslation } = useTranslation(translations);
  
  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('descricao')}</S.Label>
      </S.Header>
      {productExceptions.length > 0 &&
        productExceptions.map((productException) => <Item productException={productException} key={productException.id} onDelete={onDelete} />)}
    </S.Container>
  );
};
