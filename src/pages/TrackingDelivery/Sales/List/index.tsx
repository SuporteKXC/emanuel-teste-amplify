import React, { createRef, useCallback, useEffect, useMemo } from "react";
import { DataTable } from "components/ui/DataTable";
import { DataFilter, TrackingDeliveryFilter } from "./DataFilter";
import { useColumns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { IndicatorCards } from "./IndicatorCards";
import { generateSalesIndicators } from "@/utils/generateSalesIndicators";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SalesLayout from "@/layouts/Sales/SalesLayout";
import {
  SalesOrderIndexActions,
  SalesOrderFilterActions,
} from "@/store/ducks/trackingDelivery/sales-order";
import ModalSalesOrder, {
  ModalShowSalesOrderHandles,
} from "@/components/shared/ModalSalesOrder";
import { date } from "@/utils";

const serializeDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

const SELL_TYPE = {
  IMPORT: 'Local',
  EXPORT: 'Exportação'
} as const

export const modalShowSalesOrderRef = createRef<ModalShowSalesOrderHandles>();

export const Sales: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { columns, selectSalesOrder, isOpen, setIsOpen } = useColumns();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, loading }: { data: any[]; loading: boolean } = useSelector(
    (state: RootState) => state.salesOrderIndex
  );

  const { data: filters } = useSelector(
    (state: RootState) => state.salesOrderFilter
  );

  const onFailure = () => {
    navigate("/");
  };

  const checkboxOptions = [
    { id: "todas", label: t("trackingDelivery.statusFilter.all") },
    {
      id: "pendente",
      label: t("trackingDelivery.statusFilter.pending"),
    },
    { id: "faturado", label: t("trackingDelivery.statusFilter.faturado") },
    {
      id: "em_transito",
      label: t("trackingDelivery.statusFilter.transit"),
    },
    { id: "entregue", label: t("trackingDelivery.statusFilter.delivered") },
  ];

  const fetchSalesOrderindex = useCallback(() => {
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
        };

    dispatch(SalesOrderIndexActions.request(formattedFormFilters, filters.statusFilter));
  }, [dispatch,filters.formFilter,filters.statusFilter]);

  useEffect(() => {
    fetchSalesOrderindex();
  }, [fetchSalesOrderindex]);

  const handleStatusFilter = (status: string, checked: string | boolean) => {
    let updatedState = filters.statusFilter;
    if (status === "todas") {
      updatedState = checked ? checkboxOptions.map((option) => option.id) : [];
    } else {
      updatedState = checked
        ? [...filters.statusFilter, status]
        : filters.statusFilter.filter((item: string) => item !== status);
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
      updatedState = updatedState.filter((item: string) => item !== "todas");
    }

    dispatch(
      SalesOrderFilterActions.setFilterData({
        ...filters,
        statusFilter: updatedState,
      })
    );
    fetchSalesOrderindex()
  };

  const onFilter = (fields: TrackingDeliveryFilter) => {
    let updatedFilterObject = filters.formFilter;

    updatedFilterObject = {
      ...updatedFilterObject,
        justification: fields.justification,
        orderReference: fields.orderReference,
        deliveryDocumentNumber: fields.deliveryDocumentNumber,
        documentNumber: fields.documentNumber,
        plantCode: fields.plantCode,
        sellType: fields.sellType,
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

    dispatch(SalesOrderFilterActions.setFilterData(ret));
  };

  const clearFilters = () => {
    dispatch(SalesOrderFilterActions.reset());
  };

  useEffect(() => {}, [setIsOpen, isOpen]);
  

  const exportData = useMemo(() => 
        data?.map(sale_order => 
          ({
            "Ordem de Venda": sale_order.order_reference ?? "---",
            "Dt. Emissão": sale_order.emission_date ? date(sale_order.emission_date) : '---',
            "Dt. Prazo": sale_order.deadline_date ? date(sale_order.deadline_date) : '---',
            "Nº de entrega": sale_order.delivery_document_number ?? "---",
            "Dt. Faturamento": sale_order.document?.createdAt ?  date(sale_order.document?.createdAt): '---',
            "Dt. Entrega": sale_order.delivery_date ? date(sale_order.delivery_date) : '---',
            "Nº NFe": sale_order.document?.documentNumber ?? "---",
            "Origem": sale_order.company?.nameFantasy ?? "---",
            "Cliente": sale_order.client?.tradeName ?? "---",
            "Tipo de Venda": sale_order.sell_type ? SELL_TYPE[sale_order.sell_type.toUpperCase() as keyof typeof SELL_TYPE] : '---',
          })), 
  [data])


  return (
    <SalesLayout>
      <DataFilter
        className="mb-[14px]"
        onFilter={onFilter}
        clearFilters={clearFilters}
        options={checkboxOptions}
        handleStatusFilter={handleStatusFilter}
      />
      <IndicatorCards
        indicators={generateSalesIndicators(data)}
        isLoading={loading}
      />
      <DataTable
        columns={columns}
        data={data}
        exportTable={true}
        exportData={exportData}
        isLoading={loading}
      />
      <ModalSalesOrder
        salesOrder={selectSalesOrder}
        onClose={() => setIsOpen(false)}
        updateList={()=>fetchSalesOrderindex()}
        ref={modalShowSalesOrderRef}
      />
    </SalesLayout>
  );
};
