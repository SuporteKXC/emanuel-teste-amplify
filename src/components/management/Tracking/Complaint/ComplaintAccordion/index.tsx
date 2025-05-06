import React, { useState, useId } from "react";

import * as S from "./styles";
import { ArrowDown, ArrowUp, Minus } from "@styled-icons/typicons";
import { date } from "@/utils";

type ComplaintAccordionProps = {
  items: any[];
  title: string;
  onRemove?: (item: any) => void;
};

const ComplaintAccordion = ({
  items,
  title,
  onRemove,
}: ComplaintAccordionProps) => {
  const uniqueId = useId();
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  const handleItemClick = () => {
    if (expandedIndex === uniqueId) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(uniqueId);
    }
  };

  const formatQtdNumber = React.useCallback(
    (value: string | number | undefined) =>
      Number(value)?.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  return (
    <S.container>
      <S.header onClick={handleItemClick}>
        <S.title>{title}</S.title>
        {expandedIndex === uniqueId && <ArrowUp width={21} />}
        {!expandedIndex && <ArrowDown width={21} />}
      </S.header>

      {expandedIndex === uniqueId && (
        <S.content>
          {items.length > 0 && (
            <S.OrderList>
              <S.OrderHeader>
                <p>lote</p>
                <p>po</p>
                <p>nota fiscal</p>
                <p>data de recebimento</p>
                <p>site embarcador</p>
                <p>analista responsável</p>
                <p>planta recebedora</p>
                <p>cód. material</p>
                <p>desc. material</p>
                <p>qtd. total</p>
                <p>qtd. desvio</p>
                <p>#</p>
                <p>tipo</p>
                <p>qtd</p>
              </S.OrderHeader>
              <S.ItemContainer>
                {items.map((item) => {
                  return (
                    <S.Item>
                      <p>{item?.stockElement?.batch}</p>
                      <p>{item?.orderReference}</p>
                      <p>{item?.invoiceNumber}</p>
                      <p>
                        {item?.plant_delivery
                          ? date(item?.plant_delivery)
                          : "---"}
                      </p>
                      <p>{item?.description}</p>
                      <p>{item?.name}</p>
                      <p>{item?.nameFantasy}</p>
                      <p>{item?.materialCode}</p>
                      <p>{item?.materialDescription}</p>
                      <p>{formatQtdNumber(item.sapQty)}</p>
                  <p>{formatQtdNumber(item.divergencyQty)}</p>
                      <p>
                        <Minus
                          width={21}
                          color="#ff0001"
                          onClick={() => {
                            onRemove && onRemove(item);
                          }}
                        />
                      </p>
                      <p>{item?.defectType?.name}</p>
                      <p>{item?.defectQty}</p>
                    </S.Item>
                  );
                })}
              </S.ItemContainer>
            </S.OrderList>
          )}
          {items.length === 0 && <p>Vazio!</p>}
        </S.content>
      )}
    </S.container>
  );
};

export default ComplaintAccordion;
