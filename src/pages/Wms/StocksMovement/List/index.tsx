import React from "react";
import * as S from "./styles";
import { IStocksList } from "interfaces/stocks";
import { useTranslation } from "hooks";
import { translations } from "./translations";
import { format } from "date-fns";
// import { CalendarIcon } from 'lucide-react';
// import { date, moeda } from 'utils';

interface IGridStocksProps {
  stocks: IStocksList[] | Record<string, any>[];
}

interface IStockProps {
  stock: IStocksList | Record<string, any>;
}

const Item: React.FC<IStockProps> = ({ stock }) => {
 
  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{stock?.id || "--"}</S.ItemValue>
        <S.ItemValue>{stock?.entranceDate ? format(new Date(stock?.entranceDate), "dd/MM/yyyy HH:mm") : "---"}</S.ItemValue>
        <S.ItemValue>{stock?.client?.tradeName}</S.ItemValue>
        <S.ItemValue>{stock?.product?.code || "--"}</S.ItemValue>
        <S.ItemValue>{stock?.product?.name || "--"}</S.ItemValue>
        <S.ItemValue>{stock?.productUnit?.name || "--"}</S.ItemValue>
        <S.ItemValue>
          {stock?.quantity?.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || "--"}
        </S.ItemValue>
        <S.ItemValue>{stock?.batch || "--"}</S.ItemValue>
      </S.ItemContent>
    </S.ItemContainer>
  );
};
export const ListStocks: React.FC<IGridStocksProps> = ({ stocks = [] }) => {
  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>Id</S.Label>
        <S.Label>Data de entrada</S.Label>
        <S.Label>Cliente</S.Label>
        <S.Label>Código</S.Label>
        <S.Label>Produto</S.Label>
        <S.Label>UN</S.Label>
        <S.Label>QTD</S.Label>
        <S.Label>Lote</S.Label>
      </S.Header>
      <S.Separator />
      {stocks.length > 0
        ? stocks.map((stock) => <Item stock={stock} key={stock.id} />)
        : getTranslation("noResult")}
    </S.Container>
  );
};
