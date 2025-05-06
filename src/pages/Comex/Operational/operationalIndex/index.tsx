import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  RootState } from "store";
import { ListOperational } from "components";
import * as S from "./styles";
import ExportExcel from "components/shared/ExportExcel";
import { useTranslation } from "react-i18next";
import { FilterOperational } from "components";
import { ExportOrderItemsActions, OrderItemActions, SelectedIdsActions, UpdateProcessCriticalActions } from "store/ducks/comex/operational";
import { ExportOrderItem, OrderItemData } from "contracts";
import { exportToCSV, peso } from "utils";
import { Button } from "@/components/ui/ButtonGs";
import AddJustification from "./AddJustification";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { usePermission } from "@/hooks/usePermission";
import { format, subDays } from "date-fns";
import { useNavigate } from "react-router-dom";

export const Operational: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { hasPermissionTo } = usePermission();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const navigate = useNavigate()

  const { ids: selectedOrderItems, pos: selectedPos } = useSelector(
    (state: RootState) => state.orderItemSelectedIdsReducer
  );
  const { data: exportOrderItems, loading: exportLoading } = useSelector(
    (state: RootState) => state.exportOrderItems
  );

  const { currentCountry, loading: loadCountries } = useSelector(
    (state: RootState) => state.country
  );

  const { data: filterData } = useSelector(
    (state: RootState) => state.operationalFilterData
  );

  const fetchExportOrderItems = useCallback(() => {

    dispatch(
      ExportOrderItemsActions.request(
        {
          ...filterData,
          limit: "undefined",
          registerDateStart:  format(subDays(new Date(), 30),'yyyy-MM-dd'),
          registerDateEnd: format(new Date(),'yyyy-MM-dd')
          // ...formRef.current?.getData(),
        },
        generateFile
      )
    );
  }, [filterData]);

  const delayStatusMessage = (data: string) => {
    if (data == "G") {
      return "no prazo";
    } else if (data == "R") {
      return "em atraso";
    } else if (data == "W") {
      return "sem status";
    } else {
      return null;
    }
  };

  const generateFile = useCallback(
    (exportOrderItems: ExportOrderItem[]) => {
      if (!exportOrderItems) return;

      const fileName = `Order-itens ${new Date().toLocaleDateString(
        i18n.language,
        {
          day: "2-digit",
          month: "2-digit",
        }
      )}`;

      const exportFile = exportOrderItems?.map((orderItem) => ({
        [t(`comex.operational.export.plantDestiny`)]:
          orderItem?.plant_destiny,
        [t(`comex.operational.export.PO`)]: orderItem?.po,
        ["Customer PO"]: orderItem?.customer_po,
        [t(`comex.operational.export.item`)]: orderItem?.item,
        [t(`comex.operational.export.status`)]: orderItem?.process_status,
        [t(`comex.operational.export.emAndamento`)]: delayStatusMessage(
          orderItem?.delay_status
        ),
        [t(`comex.operational.export.processCritical`)]: orderItem?.process_critical ? (!!Number(orderItem?.process_critical) ? 'Sim' : 'Não') : '-',
        [t(`comex.operational.export.product`)]: orderItem?.product_code,
        [t(`comex.operational.export.description`)]:
          orderItem?.product_description,
        [t(`comex.operational.export.quantity`)]: peso(Number(orderItem?.quantity)),
        [t(`comex.operational.export.unidadeMedida`)]: orderItem?.unity_of_measure,
        [t(`comex.operational.export.valor`)]: orderItem?.invoice_value,
        [t(`comex.operational.export.NCM`)]: orderItem?.ncm,
        [t(`comex.operational.export.registerDate`)]: orderItem?.register_date
          ? new Date(orderItem?.register_date).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.etdDate`)]: orderItem?.etd_date
          ? new Date(orderItem?.etd_date).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.atdDate`)]: orderItem?.atd_date
          ? new Date(orderItem?.atd_date).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.etaDate`)]: orderItem?.eta_date
          ? new Date(orderItem?.eta_date).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.ataDate`)]: orderItem?.ata_date
          ? new Date(orderItem?.ata_date).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.grOriginal`)]: orderItem?.gr_original
          ? new Date(orderItem?.gr_original).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.actualGR`)]: orderItem?.gr_actual
          ? new Date(orderItem?.gr_actual).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.dtBooking`)]:
          orderItem?.booking_confirmation_date
            ? new Date(
                orderItem?.booking_confirmation_date
              ).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.numBooking`)]: orderItem?.booking_number
          ? orderItem?.booking_number
          : "-",
        [t(`comex.operational.export.portEntryDate`)]:
          orderItem?.port_entry_date
            ? new Date(orderItem?.port_entry_date).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.recebDocs`)]: orderItem?.docs_received_date
          ? new Date(orderItem?.docs_received_date).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.agProtocoloLI`)]:
          orderItem?.post_import_license_release_date
            ? new Date(
                orderItem?.post_import_license_release_date
              ).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.agDeferimentoLI`)]:
          orderItem?.protocol_mapa_in26_date
            ? new Date(orderItem?.protocol_mapa_in26_date).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.registroDI`)]:
          orderItem?.data_do_registro_da_di
            ? new Date(orderItem?.data_do_registro_da_di).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.desembaraco`)]:
          orderItem?.customs_clearance_date
            ? new Date(orderItem?.customs_clearance_date).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.emissaoNFe`)]: orderItem?.invoice_date
          ? new Date(orderItem?.invoice_date).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.numeroNF`)]: orderItem?.doc_num,
        [t(`comex.operational.export.docsTransito`)]:
          orderItem?.transport_doc_delivery_date
            ? new Date(
                orderItem?.transport_doc_delivery_date
              ).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.loadingAt`)]:
          orderItem?.loading_at_the_terminal
            ? new Date(orderItem?.loading_at_the_terminal).toLocaleDateString()
            : "-",
        [t(`comex.operational.export.plantDelivery`)]: orderItem?.plant_delivery
          ? new Date(orderItem?.plant_delivery).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.entrega`)]: orderItem?.gr_effective
          ? new Date(orderItem?.gr_effective).toLocaleDateString()
          : "-",
        [t(`comex.operational.export.justification`)]: orderItem?.justifications,
        [t(`comex.operational.export.supplierCode`)]: orderItem?.supplier_code ? orderItem?.supplier_code : "-",
        [t(`comex.operational.export.supplier`)]: orderItem?.supplier_description ? orderItem?.supplier_description : "-",
        [t(`comex.operational.export.exception`)]: orderItem?.supplier_is_special == 1 as unknown as boolean || orderItem?.supplier_is_special == "SIM" ? "SIM" : "NAO"
      }));

      exportToCSV(exportFile, fileName);
    },
    [exportOrderItems, exportLoading]
  );


  const fetchOrders = useCallback(
    () => dispatch(OrderItemActions.request(filterData)),
    [dispatch, filterData]
  );


  const handleUpdateSuccess = () => {
    dispatch(SelectedIdsActions.clearSelectedIds())

    fetchOrders()
  }

  const handleUpdateProcessCritial = () => {
    dispatch(
      UpdateProcessCriticalActions.request(
        {
          ids: selectedOrderItems
        },
        handleUpdateSuccess
      )
    );
  }

  return (
    <S.Container>
      <S.Header>
        <div className="wrapper">
          <S.CogIcon height={30} width={30} />
          {t("comex.topMenu.operational.title")}
        </div>
        <ExportExcel
          loading={exportLoading}
          onExport={() => {navigate('/comex/importation/order-reports')}}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <AddJustification>
                <Button.Root
                  disabled={
                    selectedOrderItems.length === 0 ||
                    !hasPermissionTo("CREATEJUSTIFICATION")
                  }
                  variant="white"
                  className="enabled:bg-green-400 p-4 text-xs enabled:hover:bg-green-500 enabled:text-white"
                >
                  Adicionar Justificativas
                </Button.Root>
              </AddJustification>
            </TooltipTrigger>
            {!hasPermissionTo("CREATEJUSTIFICATION") && (
              <TooltipContent>Não possui permissão!</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <Button.Root
                  disabled={
                    selectedOrderItems.length === 0 ||
                    !hasPermissionTo("UPDATE_PROCESS_CRITICAL")
                  }
                  variant="white"
                  className="enabled:bg-green-400 p-4 text-xs enabled:hover:bg-green-500 enabled:text-white"
                  onClick={handleUpdateProcessCritial}
                >
                  {t("comex.operational.orderItem.processCritical.update")}
                </Button.Root>
            </TooltipTrigger>
            {!hasPermissionTo("UPDATE_PROCESS_CRITICAL") && (
              <TooltipContent>Não possui permissão!</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <S.ClickWrapper onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? <S.TogglerOpenIcon /> : <S.TogglerCloseIcon />}{" "}
          {t("comex.filterandButton.filter")}
        </S.ClickWrapper>
      </S.Header>

      {isFilterOpen && <FilterOperational />}

      <ListOperational />
    </S.Container>
  );
};

export default Operational;
