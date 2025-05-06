import React from "react";
import * as S from "./styles";
import { SnapshotListData } from "contracts/management";
import { useTranslation } from "react-i18next";
import TooltipItem from "../TooltipItem";

interface ItemProps {
  item: SnapshotListData;
}

export const SnapshotItem = ({ item }: ItemProps): JSX.Element => {
  const { t } = useTranslation();
  const { productName, productCode, snapshot } = item;
  const totalWarehouseQty = Math.round(Number(item.totalWarehouseQty)) || 0;
  const totalCompanyQty = Math.round(Number(item.totalCompanyQty)) || 0;
  const totalDiffQty = Math.round(Number(item.totalDiffQty)) || 0;
  const not = "---";

  const total = Math.abs(totalDiffQty) + totalCompanyQty + totalWarehouseQty;

  const format = React.useCallback(
    (value: string | number | undefined) =>
      Number(value)?.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  const width = React.useCallback(
    (qtd: number) => Math.round((Math.abs(qtd) * 100) / total) || 0,
    [total]
  );

  return (
    <S.Container>
      <S.Product>
        <S.Title>
          {productCode}
          <p>{productName}</p>
        </S.Title>
        <S.IndicatorContainer>
          <S.IndicatorContent>
            <p>{totalDiffQty}</p>
            <p>SAP/WMS</p>
            <S.Indicator className="diff" width={width(totalDiffQty)} />
          </S.IndicatorContent>
          <S.IndicatorContent>
            <p>{totalCompanyQty}</p>
            <p>SAP</p>
            <S.Indicator className="company" width={width(totalCompanyQty)} />
          </S.IndicatorContent>
          <S.IndicatorContent>
            <p>{totalWarehouseQty}</p>
            <p>WMS</p>
            <S.Indicator
              className="warehouse"
              width={width(totalWarehouseQty)}
            />
          </S.IndicatorContent>
        </S.IndicatorContainer>
      </S.Product>
      <S.Content>
        <S.Header>
          <p>{t("management.snapshot.snapshot.lote")}</p>
          <p>{t("management.snapshot.snapshot.planta")}</p>
          <p>{t("management.snapshot.snapshot.qtdSap")}</p>
          <p>{t("management.snapshot.snapshot.qtdWms")}</p>
          <p>{t("management.snapshot.snapshot.qtdBloqSap")}</p>
          <p>{t("management.snapshot.snapshot.qtdBloqWms")}</p>
          <p>{t("management.snapshot.snapshot.divergencia")}</p>
          <p>{t("management.snapshot.snapshot.status")}</p>
        </S.Header>
        <S.ItemContainer>
          {snapshot.map((item, index) => {
            // const { id } = item;
            // const divergent = Boolean((Number(item.diffValue) !== 0) || (Number(item.diffQty) !== 0))
            return (
              <S.Item divergent={item?.status} key={index}>
                <p className="batch">{item?.batch ?? not}</p>
                <p>{item?.plant_code ?? not}</p>
                <p>
                  {format(item?.company_total_qty)}
                  <TooltipItem
                    items={[
                      `Disponível: ${format(item?.company_qty)}`,
                      `Bloqueado: ${format(item?.company_blocked_qty)}`,
                      `Qualidade: ${format(item?.company_quality_insp_qty)}`,
                      `Restrito: ${format(item?.company_restricted_qty)}`,
                    ]}
                  />
                </p>
                <p>
                  {format(item?.warehouse_total_qty)}
                  <TooltipItem
                    items={[
                      `Disponível: ${format(item?.warehouse_qty)}`,
                      `Bloqueado: ${format(item?.warehouse_blocked_qty)}`,
                    ]}
                  />
                </p>
                <p>
                  {format(item?.company_total_blocked_qty)}
                  <TooltipItem
                    items={[
                      `Bloqueado: ${format(item?.company_blocked_qty)}`,
                      `Qualidade: ${format(item?.company_quality_insp_qty)}`,
                      `Restrito: ${format(item?.company_restricted_qty)}`,
                    ]}
                  />
                </p>
                <p>{format(item?.warehouse_blocked_qty)}</p>
                <p>{format(item.diff_qty)}</p>
                <p className="status">{item?.status ? item?.status : ""}</p>
              </S.Item>
            );
          })}
        </S.ItemContainer>
      </S.Content>
    </S.Container>
  );
};
