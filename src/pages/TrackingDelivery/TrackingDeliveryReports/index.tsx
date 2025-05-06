import { DataTable } from "@/components/ui/DataTable";
import TrackingDeliveryLayout from "@/layouts/TrackingDelivery/TrackingInvoiceLayout";
import { useColumns } from "./columns";
import { useGetReports } from "@/queries/Reports/getReports";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useCallback } from "react";
import {
  DeliveryVoucherFilter,
  DeliveryVouchersListActions,
} from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { DataFilter } from "@/components/ui/DataFilter";
import { FilterForm } from "../DeliveryVouchers/List/FilterForm";
import { useGenerateReport } from "@/queries/Reports/generateReport";
import { notify } from "@/services";

const TrackingDeliveryReports = () => {
  const { columns } = useColumns();
  const { data, isLoading, refetch } = useGetReports("delivery-voucher");
  const { mutate, isPending } = useGenerateReport();
  const dispatch = useDispatch();

  const {
    data: deliveryVouchers,
    loading,
    statusFilter,
    filters,
  } = useSelector((state: RootState) => state.deliveryVoucherList);

  const onCheckedChange = useCallback(
    (id: string, checked: boolean) => {
      const newStatusFilter = statusFilter.map((status) => {
        if (id === "all") {
          return {
            ...status,
            checked: checked,
          };
        }
        if (status.id === "all" && status.id !== id) {
          return {
            ...status,
            checked: false,
          };
        }
        if (status.id === id) {
          return {
            ...status,
            checked: checked,
          };
        }
        return status;
      });
      dispatch(DeliveryVouchersListActions.setStatusFilter(newStatusFilter));
    },
    [dispatch, statusFilter]
  );

  const handleFilters = useCallback(
    (data: Partial<DeliveryVoucherFilter>) => {
      const qry = {
        type: "delivery-voucher",
        params: data,
      };

      mutate(qry, {
        onSuccess: () => {
          refetch();
          notify("success", "Seu relátorio está sendo processado");
        },
        onError: () => {
          notify("error", "Oops! não foi possível processar seu relatório");
        },
      });
    },
    [dispatch]
  );

  return (
    <TrackingDeliveryLayout>
      <section className="w-full flex flex-col gap-6">
        <DataFilter
          checkeboxOptions={statusFilter}
          onCheckedChange={onCheckedChange}
        >
          <FilterForm
            initialValues={filters}
            onSubmit={handleFilters}
            isLoading={loading}
            data={deliveryVouchers}
            isReport={true}
          />
        </DataFilter>
        <DataTable data={data ?? []} columns={columns} isLoading={isLoading} />
      </section>
    </TrackingDeliveryLayout>
  );
};

export default TrackingDeliveryReports;
