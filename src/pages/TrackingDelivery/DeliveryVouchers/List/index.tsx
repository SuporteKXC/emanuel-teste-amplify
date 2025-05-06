import React, { useCallback, useEffect, useState } from "react";
import TrackingDeliveryLayout from "@/layouts/TrackingDelivery/TrackingInvoiceLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  DeliveryVoucherFilter,
  DeliveryVouchersListActions,
} from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { DataTable } from "@/components/ui/DataTable";
import { useColumns } from "./columns";
import { IndicatorCards } from "./IndicatorCards";
import { DataFilter } from "@/components/ui/DataFilter";
import { DeliveryVoucher } from "@/contracts/trackingDelivery";
import { FilterForm } from "./FilterForm";
import { useNavigate } from "react-router-dom";

export const DeliveryVoucherList: React.FC = () => {
  const [localData, setLocalData] = useState<DeliveryVoucher[]>([]);
  const {
    data: deliveryVouchers,
    loading,
    statusFilter,
    filters,
  } = useSelector((state: RootState) => state.deliveryVoucherList);
  const { columns } = useColumns();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFailure = () => {
    navigate("/");
  };

  const fetchDeliveryVouchersList = useCallback(() => {
    dispatch(
      DeliveryVouchersListActions.request(filters, {}, () => {}, onFailure)
    );
  }, [dispatch, filters]);

  const handleLocalData = useCallback(() => {
    if (deliveryVouchers.length > 0) {
      setLocalData(deliveryVouchers);
    }
  }, [deliveryVouchers]);

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

  const handleFilterByStatus = useCallback(() => {
    const newLocalData = deliveryVouchers.filter((voucher) => {
      const status = voucher.status.toLowerCase();
      const filter = statusFilter.find((filter) => filter.id === status);
      return filter?.checked;
    });
    setLocalData(newLocalData);
  }, [deliveryVouchers, statusFilter]);

  const handleFilters = useCallback(
    (data: Partial<DeliveryVoucherFilter>) => {
      dispatch(DeliveryVouchersListActions.setFilters(data));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchDeliveryVouchersList();
  }, [fetchDeliveryVouchersList]);

  useEffect(() => {
    handleLocalData();
  }, [handleLocalData]);

  useEffect(() => {
    handleFilterByStatus();
  }, [handleFilterByStatus]);

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
          />
        </DataFilter>
        <IndicatorCards vouchers={localData} />
        <DataTable columns={columns} data={localData} isLoading={loading} />
      </section>
    </TrackingDeliveryLayout>
  );
};
