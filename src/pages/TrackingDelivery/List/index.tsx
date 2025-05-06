import React, { useCallback, useEffect } from "react";
import { DataTable } from "components/ui/DataTable";
import { DataFilter, TrackingDeliveryFilter } from "./DataFilter";
import { useColumns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  DocumentsListActions,
  DocumentsFilterActions,
} from "@/store/ducks/trackingDelivery/documents";
import { IndicatorCards } from "./IndicatorCards";
import { generateDocumentIndicators } from "@/utils/generateDocumentIndicators";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import TrackingDeliveryLayout from "@/layouts/TrackingDelivery/TrackingInvoiceLayout";
import { useNavigate } from "react-router-dom";
import ImportGeolocation from "@/components/ui/ImportGeolocation";
import ImportInvoice from "@/components/ui/ImportInvoice";
import ModalInvoiceCancel from "./ModalInvoiceCancel";
import { useAuth, usePermission } from "hooks";
import { Document, DocumentItem } from "@/contracts/trackingDelivery";
import { friendlyStatusMessage } from "@/components/trackingDelivery/InvoiceStatusIcons";
import { ExportAodExcel } from "@/components/ui/ExportAodExcel";

const serializeDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

const statusReset = ['todas', 'sem_status', 'transito', 'transito_atraso', 'entregue', 'cancelado', 'devolucao']

export const TrackingDelivery: React.FC = () => {
  const { hasPermissionTo } = usePermission();
  const dispatch: AppDispatch = useDispatch();
  const { columns, modalCancelInvoiceRef } = useColumns();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { documents, loading }: { documents: any; loading: boolean } =
    useSelector((state: RootState) => state.documentsList);
  const { data: filters } = useSelector(
    (state: RootState) => state.documentsFilter
  );

  const onFailure = () => {
    navigate("/");
  };

  const checkboxOptions = [
    { id: "todas", label: t("trackingDelivery.statusFilter.all") },
    {
      id: "sem_status",
      label: t("trackingDelivery.statusFilter.withoutStatus"),
    },
    { id: "transito", label: t("trackingDelivery.statusFilter.transit") },
    {
      id: "transito_atraso",
      label: t("trackingDelivery.statusFilter.transitDelay"),
    },
    { id: "entregue", label: t("trackingDelivery.statusFilter.delivered") },
    { id: "cancelado", label: t("trackingDelivery.statusFilter.canceled") },
    { id: "devolucao", label: t("trackingDelivery.statusFilter.return") },
  ];

  const fetchDocumentsList = useCallback(() => {
    const formattedFormFilters = {
      ...filters.formFilter,
      emissionDateStart: filters.formFilter.emissionDateStart
        ? filters.formFilter.emissionDateStart
        : null,
      emissionDateEnd: filters.formFilter.emissionDateEnd
        ? filters.formFilter.emissionDateEnd
        : null,
      deadlineDateStart: filters.formFilter.deadlineDateStart
        ? filters.formFilter.deadlineDateStart
        : null,
      deadlineDateEnd: filters.formFilter.deadlineDateEnd
        ? filters.formFilter.deadlineDateEnd
        : null,
      deliveryDateStart: filters.formFilter.deliveryDateStart
        ? filters.formFilter.deliveryDateStart
        : null,
      deliveryDateEnd: filters.formFilter.deliveryDateEnd
        ? filters.formFilter.deliveryDateEnd
        : null,
      originCity: filters.formFilter.originCity
        ? filters.formFilter.originCity.split(",")[0].trim()
        : null,
      destinationCity: filters.formFilter.destinationCity
        ? filters.formFilter.destinationCity.split(",")[0].trim()
        : null,
    };

    dispatch(
      DocumentsListActions.request(
        formattedFormFilters,
        filters.statusFilter,
        () => {},
        onFailure
      )
    );
  }, [dispatch, filters.formFilter, filters.statusFilter]);

  useEffect(() => {
    fetchDocumentsList();
  }, [fetchDocumentsList]);

  const handleStatusFilter = (status: string, checked: string | boolean) => {
    let updatedState = filters.statusFilter;
    if (status === "todas") {
      updatedState = checked ? checkboxOptions.map((option) => option.id) : [];
    } else {
      updatedState = checked
        ? [...filters.statusFilter, status]
        : filters.statusFilter.filter((item) => item !== status);
    }

    if (
      updatedState.length === checkboxOptions.length - 1 &&
      !updatedState.includes("todas")
    ) {
      updatedState = [...updatedState, "todas"];
    } else if (
      updatedState.length <= checkboxOptions.length - 1 &&
      updatedState.includes("todas")
    ) {
      updatedState = updatedState.filter((item) => item !== "todas");
    }

    dispatch(
      DocumentsFilterActions.setFilterData({
        ...filters,
        statusFilter: updatedState,
      })
    );
  };

  const onFilter = (fields: TrackingDeliveryFilter) => {
    let updatedFilterObject = filters.formFilter;

    if (fields.documentNumber) {
      updatedFilterObject = {
        ...updatedFilterObject,
        documentNumber: fields.documentNumber,
      };
    }

    if (fields.carrierId) {
      updatedFilterObject = {
        ...updatedFilterObject,
        carrierId: fields.carrierId,
      };
    }

    if (fields.clientId) {
      updatedFilterObject = {
        ...updatedFilterObject,
        clientId: fields.clientId,
      };
    }

    if (fields.origin) {
      updatedFilterObject = {
        ...updatedFilterObject,
        originCity: fields.origin,
      };
    }

    if (fields.destination) {
      updatedFilterObject = {
        ...updatedFilterObject,
        destinationCity: fields.destination,
      };
    }

    if (fields.emissionDate) {
      let formattedDateStart = undefined;
      if (fields.emissionDate.from) {
        formattedDateStart = serializeDate(fields.emissionDate.from);
      }
      let formattedDateEnd = undefined;
      if (fields.emissionDate.to) {
        formattedDateEnd = serializeDate(fields.emissionDate.to);
      } else {
        formattedDateEnd = serializeDate(new Date());
      }

      updatedFilterObject = {
        ...updatedFilterObject,
        emissionDateStart: formattedDateStart,
        emissionDateEnd: formattedDateEnd,
      };
    }

    if (
      fields.deadlineDate &&
      fields.deadlineDate.from &&
      fields.deadlineDate.to
    ) {
      const formattedDateStart = serializeDate(fields.deadlineDate.from);

      let formattedDateEnd = undefined;
      if (fields.deadlineDate.to) {
        formattedDateEnd = serializeDate(fields.deadlineDate.to);
      } else {
        formattedDateEnd = serializeDate(new Date());
      }

      updatedFilterObject = {
        ...updatedFilterObject,
        deadlineDateStart: formattedDateStart,
        deadlineDateEnd: formattedDateEnd,
      };
    }

    if (
      fields.deliveryDate &&
      fields.deliveryDate.from &&
      fields.deliveryDate.to
    ) {
      const formattedDateStart = serializeDate(fields.deliveryDate.from);

      let formattedDateEnd = undefined;
      if (fields.deliveryDate.to) {
        formattedDateEnd = serializeDate(fields.deliveryDate.to);
      } else {
        formattedDateEnd = serializeDate(new Date());
      }

      updatedFilterObject = {
        ...updatedFilterObject,
        deliveryDateStart: formattedDateStart,
        deliveryDateEnd: formattedDateEnd,
      };
    }

    const ret = {
      ...filters,
      formFilter: updatedFilterObject,
    };

    dispatch(DocumentsFilterActions.setFilterData(ret));
  };

  const exportData = () => {
  
    const data = Array.isArray(documents) && documents.flatMap((document: Document) => {
 
      return document.documentItems.map((item: DocumentItem) => {
        return {
          NF: document.documentNumber,
          "Número de Envío": document.shipmentNumber,
          Série: document.documentDigit,
          "Chave NFe": document.chaveNfe,
          Origem: document.originCity,
          "UF Origem": document.originState,
          Destino: document.destinationCity,
          "UF Destino": document.destinationState,
          Emissão:
            document.emissionDate &&
            new Date(document.emissionDate).toLocaleDateString("pt-BR"),
          Entrega:
            document.deliveryDate &&
            new Date(document.deliveryDate).toLocaleDateString("pt-BR"),
          Prazo: document.deadlineDate,
          Emitente: document.company.nameFantasy,
          "CNPJ Emitente": document.company.cnpj,
          Destinatário: document.client.tradeName,
          "CNPJ Destinatário": document.client.cnpj,
          Transportadora: document.carrier.tradeName,
          "CNPJ Transportadora": document.carrier.cnpj,
          Ocorrências: document.documentOccurrences
            .map((it: any) => it?.occurrenceType)?.[0],
          Status: friendlyStatusMessage[document.status],
          "Código produto": item.productCode,
          Produtos: item.productDescription,
          Peso: item.unityValue,
          CFOP: item.cfop,
          "Justificativa Tipo": item.justification_type,
          Justificativa: item.justification_description,
          Quantidade: item.quantity,
          Unidade: item.unityType,
          "Peso total": item.totalValue,
          Comprovante: item.document_delivery
        };
      });
    });
    return data;
  };

  const exportAodData = () => {
    const data = Array.isArray(documents) && documents.flatMap((document: Document) => {

      return {
        "Supplying Plant name": document?.company?.nameFantasy,
        "Supplying Plant": document?.company?.plantCode,
        "Actual Ship date": document?.emissionDate && format(new Date(document?.emissionDate), "MM/dd/yyyy"),
        "Delivery": document?.shipmentNumber,
        "Shipment number": "",
        "N° NF-e": document?.documentNumber,
        "Carrier Name": document?.carrier?.tradeName,
        "Actual Delivery Date (AOD)": document?.deliveryDate && format(new Date(document?.deliveryDate), "MM/dd/yyyy"),
      };
    });

    return data;
  };

  const clearFilters = () => {
    dispatch(DocumentsFilterActions.reset());
    dispatch(DocumentsListActions.request({}, statusReset, () => {}, onFailure));
  };

  return (
    <TrackingDeliveryLayout>
      <DataFilter
        className="mb-[14px]"
        onFilter={onFilter}
        clearFilters={clearFilters}
        options={checkboxOptions}
        handleStatusFilter={handleStatusFilter}
      />
      <IndicatorCards
        indicators={generateDocumentIndicators(documents)}
        isLoading={loading}
      />
      <DataTable
        columns={columns}
        data={documents}
        exportData={exportData()}
        exportTable={true}
        isLoading={loading}
      >
        <div className="flex gap-3">
          {hasPermissionTo("IMPORT_INVOICE_XML") && <ImportInvoice />}
          {hasPermissionTo("IMPORT_GEOLOCATION_XML") && <ImportGeolocation refetchData={fetchDocumentsList}/>}
          <ExportAodExcel data={exportAodData() ? exportAodData() : documents}/>
        </div>
      </DataTable>
      <ModalInvoiceCancel
        ref={modalCancelInvoiceRef}
        documentRefetch={fetchDocumentsList}
      />
    </TrackingDeliveryLayout>
  );
};
