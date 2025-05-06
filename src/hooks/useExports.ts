import React, { useCallback, useMemo } from "react";
import { SnapshotExportActions } from "store/ducks/management/snapshot/exportSnapshot";
import { SnapshotDivergentExportActions } from "store/ducks/management/snapshotDivergent";
import {
  ImportExportData,
  ImportExportQuery,
  SnapshotDivergentExportData,
  SnapshotDivergentExportQuery,
  SnapshotExportData,
  SnapshotExportQuery,
  TransfersQuery,
  TransferListData
} from "contracts/management";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { useTranslation } from "react-i18next";
import { exportToCSV, peso } from "utils";
import { ImportExportActions } from "store/ducks/management";
import { ITransferFilter, TransfersExportActions } from "store/ducks/management/transfer";

/**Export Snapshot */

export const useSnapshotExport = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingSnapshotExport, progress: loadedProgress } =
    useSelector((state: RootState) => state.snapshotExport);

  const progress = useMemo(() => loadedProgress, [loadedProgress]);

  const formatNumber = useCallback(
    (number?: string | number | null) =>
      Number(number) ? String(peso(Number(number))) : "0,00",
    []
  );

  const exportMapper = React.useCallback(
    (item: SnapshotExportData[]) => {
      const body = [];

      for (const exportData of item) {
        const { snapshot, productId, productCode, productName } = exportData;
        if (Boolean(snapshot?.length)) {
          for (const { snapshot_date, ...rest } of snapshot) {
            body.push({
              [t("management.relatorio.dtsnapshot")]: snapshot_date
              ? format(new Date(snapshot_date), "dd/MM/yyyy")
              : "",
              [t("management.relatorio.idproduto")]: productId ?? "",
              [t("management.relatorio.planta")]: rest.plant_code ?? "",
              [t("management.relatorio.codigoproduto")]: productCode ?? "",
              [t("management.relatorio.nomeproduto")]: productName ?? "",
              [t("management.relatorio.lote")]: rest.batch ?? "",
              [t("management.relatorio.lote")]: rest.batch ?? "",

              //sap
              [t("management.relatorio.qtdsap")]: formatNumber(
                rest.company_qty
              ),
              [t("management.relatorio.qtdwms")]: formatNumber(
                rest?.warehouse_qty
              ),
              [t("management.relatorio.qtdsapbloqueado")]: formatNumber(
                rest?.company_blocked_qty
              ),
              [t("management.relatorio.qtdwmsbloqueado")]: formatNumber(
                rest?.warehouse_blocked_qty
              ),
              [t("management.relatorio.qtdsaprestrito")]: formatNumber(
                rest?.company_restricted_qty
              ),
              [t("management.relatorio.qtdsapbloqueadototal")]: formatNumber(
                rest?.company_total_blocked_qty
              ),
              [t("management.relatorio.qtdsaptotal")]: formatNumber(
                rest.company_total_qty
              ),
              [t("management.relatorio.qtdwmstotal")]: formatNumber(
                rest?.warehouse_total_qty
              ),
              [t("management.relatorio.valorsap")]: formatNumber(
                rest?.company_value
              ),
              [t("management.relatorio.valorwms")]: formatNumber(
                rest?.warehouse_value
              ),
              [t("management.relatorio.valorsapbloqueado")]: formatNumber(
                rest?.company_blocked_value
              ),
              [t("management.relatorio.valorwmsbloqueado")]: formatNumber(
                rest?.warehouse_blocked_value
              ),
              [t("management.relatorio.valorsaprestrito")]: formatNumber(
                rest?.company_restricted_value
              ),
              [t("management.relatorio.valorsapbloqueadototal")]: formatNumber(
                rest?.company_total_blocked_value
              ),
              [t("management.relatorio.valorwmstotal")]: formatNumber(
                rest?.warehouse_total_value
              ),
              [t("management.relatorio.valorsaptotal")]: formatNumber(
                rest?.company_total_value
              ),
              [t("management.relatorio.divergenciaqtd")]: formatNumber(
                rest?.diff_qty
              ),
              [t("management.relatorio.divergenciavalor")]: formatNumber(
                rest?.diff_value
              )
            });
          }
        } else {
          body.push({
            [t("management.relatorio.idproduto")]: productId ?? "",
            [t("management.relatorio.codigoproduto")]: productCode ?? "",
            [t("management.relatorio.nomeproduto")]: productName ?? "",
          });
        }
      }

      return body;
    },
    [t]
  );

  const prepareData = React.useCallback(
    async (data: SnapshotExportData[]) =>
      exportToCSV(
        exportMapper(data),
        "SNAPSHOT - " + format(new Date(), "dd-MM-yyyy")
      ),
    []
  );

  const exportSnapshot = React.useCallback(
    (query?: SnapshotExportQuery) =>
      dispatch(SnapshotExportActions.request({ ...query }, prepareData)),
    [dispatch]
  );

  return {
    exportSnapshot,
    loadingSnapshotExport,
    progress,
  };
};

/**Export Snapshot divergence*/

export const useDivergenceExport = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingDivergenceExport, progress: loadedProgress } =
    useSelector((state: RootState) => state.snapshotDivergentExport);

  const progress = useMemo(() => loadedProgress, [loadedProgress]);

  const formatNumber = useCallback(
    (number?: string | number | null) =>
      Number(number) ? String(peso(Number(number))) : "0,00",
    []
  );

  const exportMapper = React.useCallback(
    (item: SnapshotDivergentExportData[]) => {
      const body = [];
      for (const exportData of item) {
        const {
          snapshotDivergent,
          productId,
          productCode,
          productDescription,
        } = exportData;
        if (Boolean(snapshotDivergent?.length)) {
          for (const { snapshot_date, ...rest } of snapshotDivergent) {
            body.push({
              [t("management.relatorio.idproduto")]: productId ?? "",
              [t("management.relatorio.planta")]: rest.plant_code ?? "",
              [t("management.relatorio.codigoproduto")]: productCode ?? "",
              [t("management.relatorio.nomeproduto")]: productDescription ?? "",
              [t("management.relatorio.lote")]: rest.batch ?? "",
              [t("management.relatorio.lote")]: rest.batch ?? "",

              //sap
              [t("management.relatorio.qtdsap")]: formatNumber(
                rest.company_qty
              ),
              [t("management.relatorio.qtdsaptotal")]: formatNumber(
                rest.company_total_qty
              ),
              [t("management.relatorio.qtdsapbloqueado")]: formatNumber(
                rest?.company_blocked_qty
              ),
              [t("management.relatorio.qtdsapbloqueadototal")]: formatNumber(
                rest?.company_total_blocked_qty
              ),
              [t("management.relatorio.qtdsaprestrito")]: formatNumber(
                rest?.company_restricted_qty
              ),
              [t("management.relatorio.valorsap")]: formatNumber(
                rest?.company_value
              ),
              [t("management.relatorio.valorsaptotal")]: formatNumber(
                rest?.company_total_value
              ),
              [t("management.relatorio.valorsapbloqueado")]: formatNumber(
                rest?.company_blocked_value
              ),
              [t("management.relatorio.valorsapbloqueadototal")]: formatNumber(
                rest?.company_total_blocked_value
              ),
              [t("management.relatorio.valorsaprestrito")]: formatNumber(
                rest?.company_restricted_value
              ),

              //wms
              [t("management.relatorio.qtdwms")]: formatNumber(
                rest?.warehouse_qty
              ),
              [t("management.relatorio.qtdwmstotal")]: formatNumber(
                rest?.warehouse_total_qty
              ),
              [t("management.relatorio.qtdwmsbloqueado")]: formatNumber(
                rest?.warehouse_blocked_qty
              ),
              [t("management.relatorio.valorwms")]: formatNumber(
                rest?.warehouse_value
              ),
              [t("management.relatorio.valorwmstotal")]: formatNumber(
                rest?.warehouse_total_value
              ),
              [t("management.relatorio.valorwmsbloqueado")]: formatNumber(
                rest?.warehouse_blocked_value
              ),

              //...
              [t("management.relatorio.divergenciaqtd")]: formatNumber(
                rest?.diff_qty
              ),
              [t("management.relatorio.divergenciavalor")]: formatNumber(
                rest?.diff_value
              ),
              [t("management.relatorio.tipojustificativa")]:
                rest?.justification[0]?.name ?? "",

              [t("management.relatorio.justificativa")]:
                rest?.justification[0]?.comment ?? "",

              [t("management.relatorio.nomeusuario")]:
                rest?.justification[0]?.userName ?? "",

              [t("management.relatorio.dataJustificativa")]: rest
                ?.justification[0]?.justifiedAt
                ? format(
                    new Date(rest?.justification[0]?.justifiedAt),
                    "dd/MM/yyyy"
                  )
                : "",

              [t("management.relatorio.dtsnapshot")]: snapshot_date
                ? format(new Date(snapshot_date), "dd/MM/yyyy")
                : "",
            });
          }
        } else {
          body.push({
            [t("management.relatorio.idproduto")]: productId ?? "",
            [t("management.relatorio.codigoproduto")]: productCode ?? "",
            [t("management.relatorio.nomeproduto")]: productDescription ?? "",
          });
        }
      }

      return body;
    },
    [t]
  );

  const prepareData = React.useCallback(
    async (data: SnapshotDivergentExportData[]) =>
      exportToCSV(
        exportMapper(data),
        "DIVERGENCIA - " + format(new Date(), "dd-MM-yyyy")
      ),
    []
  );

  const exportDivergence = React.useCallback(
    (query?: SnapshotDivergentExportQuery) =>
      dispatch(
        SnapshotDivergentExportActions.request({ ...query }, prepareData)
      ),
    [dispatch]
  );

  return {
    exportDivergence,
    loadingDivergenceExport,
    progress,
  };
};


export const useImportTrackingExport = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingImportExport, progress: loadedProgress } =
    useSelector((state: RootState) => state.importExport);
  
  const progress = useMemo(() => loadedProgress, [loadedProgress]);

  const formatNumber = useCallback(
    (number?: string | number | null) =>
      Number(number) ? String(peso(Number(number))) : "0,00",
    []
  );

  const exportMapper = React.useCallback(
    (item: ImportExportData[]) => {
      const body = [];

      for (const exportData of item) {
        const { stockMovementsSnapshot, order, product, productId, invoiceNumber } = exportData;
        const orderItem = order.orderItem.find(item => item.customs_clearance_date !== null)
        if (Boolean(stockMovementsSnapshot?.length)) {
        
          for (const stockMovementSnapshot of stockMovementsSnapshot) {
            body.push({
              [t("management.relatorio.dataChegada")]: orderItem?.plant_delivery
              ? format(new Date(orderItem?.plant_delivery), "dd/MM/yyyy")
              :  "",
              [t("management.relatorio.po")]: order?.order_reference ?? "",
              [t("management.relatorio.nf")]: invoiceNumber ?? "",
              [t("management.relatorio.idproduto")]: productId ?? "",
              [t("management.relatorio.planta")]: order?.company?.plantCode ?? "",
              [t("management.relatorio.codigoproduto")]: product?.code ?? "",
              [t("management.relatorio.nomeproduto")]: product?.description ?? "",
              [t("management.relatorio.lote")]: stockMovementSnapshot?.stockElement?.batch ?? "",

              //sap
              [t("management.relatorio.dtoMovSap")]:
                stockMovementSnapshot?.sapImportDate ?
                format(new Date(stockMovementSnapshot?.sapImportDate), "dd/MM/yyyy") : "",

              [t("management.relatorio.qtdsap")]: formatNumber(
                stockMovementSnapshot?.sapQty
              ),

              [t("management.relatorio.dtoMovWms")]:
                stockMovementSnapshot?.wsmImportDate ?
                format(new Date(stockMovementSnapshot?.wsmImportDate), "dd/MM/yyyy") : "",

              [t("management.relatorio.qtdwms")]: formatNumber(
                stockMovementSnapshot?.wmsQty
              ),

              [t("management.relatorio.divergenciaqtd")]: formatNumber(
                stockMovementSnapshot?.divergencyQty
              ),
              [t("management.relatorio.regularizedAt")]: stockMovementSnapshot?.regularizedAt ? format(new Date(stockMovementSnapshot?.regularizedAt), "dd/MM/yyyy") : "",
              [t("management.relatorio.status")]: stockMovementSnapshot?.status ?? "",
              [t("management.relatorio.complaintNumber")]: stockMovementSnapshot?.complaint[0]?.number ?? "",
              [t("management.relatorio.complaintDescription")]: stockMovementSnapshot?.complaint[0]?.description ?? "",
              
              [t("management.relatorio.responsibility")]: stockMovementSnapshot?.complaint[0]?.responsible?.name ?? "",

              [t("management.relatorio.compaintOpenedBy")]: stockMovementSnapshot?.complaint[0]?.user?.name ?? "",
              [t("management.relatorio.compaintFinishedBy")]: stockMovementSnapshot?.whoisRegularizer?.name ?? ""

            });
          }
        } else {
          body.push({
            [t("management.relatorio.dataChegada")]: orderItem?.plant_delivery
            ? format(new Date(orderItem?.plant_delivery), "dd/MM/yyyy")
            :  "",
            [t("management.relatorio.po")]: order?.order_reference ?? "",
            [t("management.relatorio.nf")]: invoiceNumber ?? "",
            [t("management.relatorio.idproduto")]: productId ?? "",
            [t("management.relatorio.codigoproduto")]: product?.code ?? "",
            [t("management.relatorio.nomeproduto")]: product?.description ?? "",
            [t("management.relatorio.status")]: order?.status ?? "",
            [t("management.relatorio.planta")]: order?.company?.plantCode ?? "",
           
          });
        }
      }

      return body;
    },
    [t]
  );

  const prepareData = React.useCallback(
    async (data: ImportExportData[]) =>
      exportToCSV(
        exportMapper(data),
        "TRACKING - " + format(new Date(), "dd-MM-yyyy")
      ),
    []
  );

  const exportImport = React.useCallback(
    (query?: ImportExportQuery) =>
      dispatch(ImportExportActions.request({ ...query }, prepareData)),
    [dispatch]
  );


  return { exportImport, loadingImportExport, progress }
}


export const useTransfersExport = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingTransfersExport, progress: loadedProgress } =
    useSelector((state: RootState) => state.transfersExport);
  
  const progress = useMemo(() => loadedProgress, [loadedProgress]);

  const formatNumber = useCallback(
    (number?: string | number | null) =>
      Number(number) ? String(peso(Number(number))) : "0,00",
    []
  );

  const exportMapper = React.useCallback(
    (item: TransferListData[]) => {
      const body = [];

      for (const exportData of item) {
        const { code, description, stockElement } = exportData;
 
        if (Boolean(stockElement?.length)) {
        
          for (const stkElement of stockElement) {
              const { stockTransferSnapshot } = stkElement
                
              if(stockTransferSnapshot.length > 0 ) {

                for(const stkMovementsSnapshots of stockTransferSnapshot) {
                  const { sapQty, wmsQty, wsmImportDate, sapImportDate, regularizedAt, status, divergencyQty} = stkMovementsSnapshots

                  body.push({
                    [t("management.snapshot.transfer.relatorio.sapImportDate")]: sapImportDate
                    ? format(new Date(sapImportDate), "dd/MM/yyyy")
                    :  "",
                    [t("management.snapshot.transfer.relatorio.wsmImportDate")]: wsmImportDate
                    ? format(new Date(wsmImportDate), "dd/MM/yyyy")
                    :  "",
                    [t("management.snapshot.transfer.relatorio.wmsQty")]: formatNumber(wmsQty) ?? "",
                    [t("management.snapshot.transfer.relatorio.sapQty")]: formatNumber(sapQty) ?? "",
                    [t("management.snapshot.transfer.relatorio.divergencyQty")]: formatNumber(divergencyQty) ?? "",
                    [t("management.snapshot.transfer.relatorio.productDescription")]: description ?? "",
                    [t("management.snapshot.transfer.relatorio.productCode")]: code ?? "",
                    [t("management.snapshot.transfer.relatorio.regularizedAt")]: regularizedAt ? format(new Date(regularizedAt), "dd/MM/yyyy") : "",
                    [t("management.snapshot.transfer.relatorio.status")]: status ?? "",
                  });

                }

              }
          }
        }
      }

      return body;
    },
    [t]
  );

  const prepareData = React.useCallback(
    async (data: TransferListData[]) =>
      exportToCSV(
        exportMapper(data),
        "TRANSFERS - " + format(new Date(), "dd-MM-yyyy")
      ),
    []
  );

  const exportTransfers = React.useCallback(
    (query?: ITransferFilter) =>
      dispatch(TransfersExportActions.request({ ...query }, prepareData)),
    [dispatch]
  );


  return { exportTransfers, loadingTransfersExport, progress }
}
