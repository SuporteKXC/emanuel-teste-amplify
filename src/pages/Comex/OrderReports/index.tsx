import { DataTable } from "@/components/ui/DataTable";

import { useColumns } from "./columns";

import { notify } from "@/services";
import { useGetOrderReports } from "./queries/getOrderReports";
import { SubmitHandler } from "@unform/core";
import { ExportOrderItemsActions, IOperationalFilter } from "@/store/ducks";

import { useDispatch } from "react-redux";
import { FilterOperationalReports } from "@/components/comex/Operational/FilterOperationalReports";


const OrderReports = () => {
  const { columns } = useColumns();
  const { data, isLoading, refetch } = useGetOrderReports();
  const disptach = useDispatch();



  const onSuccess = () => {
    notify("success", "Estamos gerando seu relatório...");
    refetch();
  };

  const onError = () => {
    notify("error", "Não foi possível gerar seu relatório!");
  };
  const onSubmit = (data: SubmitHandler<IOperationalFilter>) => {
    disptach(
      ExportOrderItemsActions.request(
        {
          type: "order-item",
          ...data,
          limit: "undefined",
          // registerDateStart: format(subDays(new Date(), 30), "yyyy-MM-dd"),
          // registerDateEnd: format(new Date(), "yyyy-MM-dd"),
        },
        onSuccess,
        onError
      )
    );
  };

  return (
    <div className="w-full">
      <div className="filter mb-10">
        <FilterOperationalReports customOnSubmit={onSubmit} />
      </div>
      <DataTable data={data ?? []} columns={columns}isLoading={isLoading} />
    </div>
  );
};

export default OrderReports;
