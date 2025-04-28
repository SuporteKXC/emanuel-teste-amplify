import React from 'react';
import * as S from './styles';
import { IStocksList } from 'interfaces/stocks';
import { CalendarIcon } from 'lucide-react';
import { date, moeda } from 'utils';
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridStocksProps {
  stocks: IStocksList[] | Record<string, any>[];
}

interface IStockProps {
  stock: IStocksList | Record<string, any>;
}

const Item: React.FC<IStockProps> = ({ stock }) => {
  return (
    <S.ItemContainer
    >
      <S.ItemContent>
        <S.ItemValue>{stock.id || '--'}</S.ItemValue>
        <S.ItemValue>{stock.client?.tradeName}</S.ItemValue>
        <S.ItemValue>{stock.product.code || '--'}</S.ItemValue>
        <S.ItemValue>{stock.product.name || '--'}</S.ItemValue>
        <S.ItemValue>{stock.productUnit.name || '--'}</S.ItemValue>        
        <S.ItemValue>{stock.quantity.toFixed(2) || '--'}</S.ItemValue>
        <S.ItemValue>{stock.batch || '--'}</S.ItemValue>
        <S.ItemValue>{stock.manufacturingDate ? date(stock.manufacturingDate) : '--'}</S.ItemValue>
        <S.ItemValue>{stock.stockType.toUpperCase() === "AG" ? <CalendarIcon size={20}/> :'--'}</S.ItemValue>
        <S.ItemValue>{stock.expirationDate ? date(stock.expirationDate) : '--'}</S.ItemValue>
        <S.ItemValue>{moeda(stock.price) || '--'}</S.ItemValue>
        <S.ItemValue>{moeda(stock.totalPrice) || '--'}</S.ItemValue>
        <S.ItemValue>{stock.invoiceNumber || "--"}</S.ItemValue>
        </S.ItemContent>
    </S.ItemContainer>
  );
}
export const ListStocks: React.FC<IGridStocksProps> = ({
  stocks = [],
}) => {

  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>Id</S.Label>
        <S.Label>Cliente</S.Label>
        <S.Label>Código</S.Label>
        <S.Label>Produto</S.Label>
        <S.Label>UN</S.Label>
        <S.Label>QTD</S.Label>
        <S.Label>Lote</S.Label>
        <S.Label>Dt. Fab</S.Label>
        <S.Label>AG</S.Label>
        <S.Label>Dt. Venc</S.Label>
        <S.Label>Valor</S.Label>
        <S.Label>Valor total</S.Label>
        <S.Label>NF</S.Label>
      </S.Header>
      <S.Separator/>
      {stocks.length > 0 ?
        stocks.map((stock) => <Item stock={stock} key={stock.id} />) : getTranslation('noResult')}
    </S.Container>
  );
};