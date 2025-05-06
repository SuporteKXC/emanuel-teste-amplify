import React from "react";
import * as S from "./styles";
import { ProgressSteps, StepProps } from "components/shared/ProgressSteps";
import { useTranslation } from "react-i18next";
import { StockTransferSnapshot, TransferStockElement } from "contracts/management";
import { date } from "utils";
import { useSelector } from "react-redux";
import { RootState } from "store";

type BatchDetailProps = {
  snapshot: TransferStockElement
  plantDelivery: string
}

export const BatchDetail = React.memo(
  ({ snapshot, plantDelivery }: BatchDetailProps): JSX.Element => {
   
    const {stockTransferSnapshot, batch} = snapshot
    const {regularizedAt, wsmImportDate, sapImportDate, createdAt, stockElement , wmsQty, sapQty, divergencyQty} = stockTransferSnapshot[0]
    const { t } = useTranslation();

    const isRegularizedAuto = !regularizedAt && (wsmImportDate && sapImportDate) && Number(divergencyQty) == 0

    const steps: StepProps[] = [
      // {
      //   title: t("management.tracking.detalhe.chegadanaplanta"),
      //   value: plantDelivery ? date(plantDelivery) : '---',
      //   status: "active",
      // },
      {
        title: t("management.tracking.detalhe.dtentradaarmazem"),
        value: wsmImportDate ? date(wsmImportDate) : '---',
        status: wsmImportDate ? "active" : 'alert',
      },
      {
        title: t("management.tracking.detalhe.dtentradaempresa"),
        value: sapImportDate ? date(sapImportDate) : '---',
        status: sapImportDate ? "active" : 'alert',
      },
      {
        title: t("management.tracking.detalhe.regularizadoem"),
        value: regularizedAt || isRegularizedAuto ? date(regularizedAt || sapImportDate) : '---',
        status: regularizedAt || isRegularizedAuto ? 'active' : 'none'
      },
    ];

    return (
      <S.Container>
        <S.Title>
          <p>{t("management.tracking.detalhe.lote")}</p>{batch ?? ""}
        </S.Title>
        <S.Content>
          <S.Info>
            <S.Header>
              <p>{t("management.tracking.detalhe.qtdarmazem")}</p>
              <p>{t("management.tracking.detalhe.qtdempresa")}</p>
              {/* <p>{t("management.tracking.detalhe.valorarmazem")}</p> */}
              {/* <p>{t("management.tracking.detalhe.valorempresa")}</p> */}
            </S.Header>
            <S.Values>
              <p>{wmsQty}</p>
              <p>{sapQty}</p>
              {/* <p>R$ 10.000,00</p>
              <p>R$ 9.000,00</p> */}
            </S.Values>
            <S.Values isAlert>
              <p></p>
              <p>{divergencyQty}</p>
              <p></p>
              {/* <p>R$ -1.000,00</p> */}
            </S.Values>
          </S.Info>
          <ProgressSteps steps={steps} />
        </S.Content>
      </S.Container>
    )
  }
);
