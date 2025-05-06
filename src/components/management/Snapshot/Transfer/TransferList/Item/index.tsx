import { useCallback } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { STATUS, TransferListData, TransferStockElement } from "contracts/management";
import { date } from "utils";
import { useNavigate } from "react-router-dom";


type TransferItemProps = {
  data: TransferListData
}

type ItemProps = {
  item: TransferStockElement
  key: number
}

export const TransferItem = ({ data }: TransferItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goTransferDetail = () => {
    const currentId = data?.id
    console.log(data?.id)
    
    if(!currentId) return

    navigate(`/management/tracking/transfer/detail/${currentId}`)
  }

  const Item = useCallback(
    ({item, key}: ItemProps) => {
    const regularizeDate = item.stockTransferSnapshot[0]?.regularizedAt || item.stockTransferSnapshot[0]?.sapImportDate
    const status = item.stockTransferSnapshot[0]?.status


      if(item.stockTransferSnapshot.length === 0) {
        return <></>
      }

      return (
        <S.Item status={status} key={key}>
          <p className="batch">{item?.batch ?? "---"}</p>
          <p>{item.stockTransferSnapshot[0]?.movementType ? item.stockTransferSnapshot[0]?.movementType : '---'}</p>
          <p>{item.stockTransferSnapshot[0]?.wsmImportDate ? date(item.stockTransferSnapshot[0]?.wsmImportDate) : '---'}</p>
          <p>{item.stockTransferSnapshot[0]?.sapImportDate ? date(item.stockTransferSnapshot[0]?.sapImportDate) : '---'}</p>
          <p>{Number(item.stockTransferSnapshot[0]?.sapQty ?? "00").toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          <p>{Number(item.stockTransferSnapshot[0]?.wmsQty ?? "00").toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          <p>{item.stockTransferSnapshot[0]?.regularizedAt || (!item.stockTransferSnapshot[0]?.regularizedAt && item.stockTransferSnapshot[0]?.status == 'FINALIZADO') ? (regularizeDate && date(regularizeDate)) : '---'}</p>
          <p className="status">{status ? status : '---'}</p>
        </S.Item>
      );
    },
    []
  );

  return (
    <S.Container>
      <S.Product>
        <S.Title>
          <p>{data?.code} - {data?.description}</p>
        </S.Title>
      </S.Product>
      <S.Content>
        <S.Header>
          <p>{t("management.snapshot.transfer.lote")}</p>
          <p>{t("management.snapshot.transfer.movementType")}</p>
          <p>{t("management.snapshot.transfer.wsmImportDate")}</p>
          <p>{t("management.snapshot.transfer.sapImportDate")}</p>
          <p>{t("management.snapshot.transfer.sapQty")}</p>
          <p>{t("management.snapshot.transfer.wmsQty")}</p>
          <p>{t("management.snapshot.transfer.regularizedAt")}</p>
          <p>{t("management.snapshot.transfer.status")}</p>
        <S.Button onClick={goTransferDetail}>
          <S.ArrowRight/>
        </S.Button>
        </S.Header>
        <S.ItemContainer>
          { data?.stockElement?.length > 0 && (data?.stockElement?.map((item, index: number) => <Item item={item} key={index}/> ))}
        </S.ItemContainer>
      </S.Content>
    </S.Container>
  );
};
