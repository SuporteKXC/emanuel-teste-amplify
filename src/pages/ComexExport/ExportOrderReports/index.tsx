import { FilterOperational } from "@/components";
import { DataTable } from "@/components/ui/DataTable";

import { useColumns } from "./columns";

import { notify } from "@/services";
import { useGetExportOrderReports } from "./queries/getExportOrderReports";
import { FormHandles, SubmitHandler } from "@unform/core";
// import { ExportExportOrderItemsActions, ExportExportOrderItemsActions, IOperationalFilter } from "@/store/ducks";

import { useDispatch } from "react-redux";
import {
  ExportExportOrderItemsActions,
  IOperationalFilter,
} from "@/store/ducks";
import { ExportLayout } from "../layout";
import { FilterOperationalExport } from "@/components/comex/Operational/FilterOperationalExport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportExcel } from "@/components/ui/ExportExcel";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@unform/web";
import RangePicker from "@/components/ui/Forms/rangePicker";
import { DateRange } from "react-day-picker";
import { FormField } from "@/components/ui/form";
import { format } from "date-fns";
import { t } from "i18next";

const ExportOrderReports = () => {
  const { columns } = useColumns();
  const { data, isLoading, refetch } = useGetExportOrderReports();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [clearFilter, setClearFilter] = React.useState(false);
  const disptach = useDispatch();

  const { register, handleSubmit, control, setValue } = useForm();
  const formRef = React.useRef<FormHandles>(null);

  const onSuccess = () => {
    notify("success", "Estamos gerando seu relatório...");
    setIsSubmitting(false);
    resetForm();
    refetch();
  };

  const onError = () => {
    notify("error", "Não foi possível gerar seu relatório!");
    setIsSubmitting(false);
  };


  const handleSubmitForm = (data: any) => {
    const dataFormatted = {
      ...data,
      registerDateStart:
        data?.register_date?.from &&
        format(data?.register_date?.from, "yyyy-MM-dd"),
      registerDateEnd:
        data?.register_date?.to &&
        format(data?.register_date?.to, "yyyy-MM-dd"),
      deliveryDateStart:
        data?.delivery_date?.from &&
        format(data?.delivery_date?.from, "yyyy-MM-dd"),
      deliveryDateEnd:
        data?.delivery_date?.to &&
        format(data?.delivery_date?.to, "yyyy-MM-dd"),
      ataStart:
        data?.ata_date?.from && format(data?.ata_date?.from, "yyyy-MM-dd"),
      ataEnd:
        data?.ata_date?.to && format(data?.ata_date?.to, "yyyy-MM-dd"),
      grActualStart:
        data?.gr_actual?.from && format(data?.gr_actual?.from, "yyyy-MM-dd"),
      grActualEnd:
        data?.gr_actual?.to && format(data?.gr_actual?.to, "yyyy-MM-dd"),
    };
    setIsSubmitting(true);
    disptach(
      ExportExportOrderItemsActions.request(
        {
          type: "export-order-item",
          ...dataFormatted,
          limit: "undefined",
          // registerDateStart: format(subDays(new Date(), 30), "yyyy-MM-dd"),
          // registerDateEnd: format(new Date(), "yyyy-MM-dd"),
        },
        onSuccess,
        onError
      )
    )
  };

  const resetForm = () => {
    setClearFilter(true);
    formRef?.current?.reset();
    setValue("product", undefined);
    setValue("po", undefined);
    setValue("register_date", undefined);
    setValue("delivery_date", undefined);
    setValue("ata_date", undefined);
    setValue("gr_actual", undefined);

    setClearFilter(false);
  };

  return (
    <div className="w-full">
      <div className="filter">
      </div>
      <ExportLayout>
        <Form
          className={"flex gap-4 items-end"}
          onSubmit={handleSubmit(handleSubmitForm)}
          ref={formRef}
          placeholder=""
        >
          <FormField
            control={control}
            {...register("register_date")}
            render={({ field }) => {
              return (
              <RangePicker
                label={"Dt.Registro"}
                onSelect={field.onChange
                }
                selected={field.value}
              />
              )
            }}
          />
          <FormField
            control={control}
            {...register("delivery_date")}
            render={({ field }) => {
              return (
              <RangePicker
                label={"Data de Entrega"}
                onSelect={field.onChange
                }
                selected={field.value}
              />
              )
            }}
          />
          <FormField
            control={control}
            {...register("ata_date")}
            render={({ field }) => {
              return (
              <RangePicker
                label={"Data de Atracação"}
                onSelect={field.onChange
                }
                selected={field.value}
              />
              )
            }}
          />
          <FormField
            control={control}
            {...register("gr_actual")}
            render={({ field }) => {
              return (
              <RangePicker
                label={"GR Atual"}
                onSelect={field.onChange
                }
                selected={field.value}
              />
              )
            }}
          />
          <Input
            {...register("product")}
            key={"product.description"}
            placeholder={`Filtrar descrição...`}
            className="max-w-sm"
          />
          <Input
            {...register("po")}
            key={"exportOrder.order_reference"}
            placeholder={`Filtrar pedido...`}
            className="max-w-sm"
          />
            {/* <Button type="submit">Gerar</Button> */}
            <Button
              type="submit"
              disabled={isSubmitting}
              children={isSubmitting ? "Gerando..." : "Gerar"}
            />
            <Button
              type="reset"
              disabled={isSubmitting}
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-400"
              children={"Limpar filtros"}
            />
          
        </Form>

        <DataTable data={data ?? []} columns={columns} />
      </ExportLayout>
    </div>
  );
};

export default ExportOrderReports;
