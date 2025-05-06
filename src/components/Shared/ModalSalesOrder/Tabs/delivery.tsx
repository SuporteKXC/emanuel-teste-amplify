import { Button } from "@/components/ui/ButtonGs";
import { FormField,Form } from "@/components/ui/form";
import { InputGs } from "@/components/ui/Forms";
import { SalesOrder } from "@/contracts/salesOrder";
import { notify } from "@/services";
import { RootState } from "@/store";
import { SalesOrderPutActions, SalesOrderShowActions } from "@/store/ducks/trackingDelivery/sales-order";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
  delivery_document_number: z.string().trim().min(1, { message: "Obrigatório para salvar entrega" }),
});

export const DeliveryTab: React.FC<{ salesOrder: SalesOrder | null }> = ({
  salesOrder,
}) => {

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const base = "salesOrder.drawer.delivery";
  const { data: salesOrderData,loading } = useSelector(
    (state: RootState) => state.salesOrderShow
  )
  const form = useForm({
    defaultValues: {
      delivery_document_number: salesOrderData?.delivery_document_number ?? "",
    },
    resolver: zodResolver(formSchema),
  });


  const onSuccess = () => {
    fetch()
  }
  const handleSubmit = (data: any) => {
    if(salesOrder?.delivery_document_number === data?.delivery_document_number){
      notify('error', 'Entrega já adicionada');
      return
    }
    dispatch(SalesOrderPutActions.request( salesOrder?.id,data,onSuccess));
  }

  
  const fetch = () => {
    dispatch(SalesOrderShowActions.request(salesOrder?.id));
  }

  useEffect(() => {
    fetch()
  },[])
  return (
    <div className="text-sm px-6 mt-4 w-full rounded border-2">
      <h1 className="font-GilroyBold text-lg text-slate-800">
        {t(`${base}.adicionarEntrega`)}
      </h1>
      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="delivery_document_number"
            render={({ field }) => (
              <InputGs
                {...field}
                label={t(`${base}.entrega`)}
                placeholder=""
                // disabled={isLoading}
              />
            )}
          />
          <div className="flex gap-2 justify-start">
            <Button.Root variant="secondary" size="sm" type="reset" onClick={() => {form.reset()}}>
              {t(`${base}.limpar`)}
            </Button.Root>
            <Button.Root size="sm" type="submit" disabled={loading}>
              {!loading ? t(`${base}.salvar`) : "..."}
            </Button.Root>
          </div>
        </form>
      </Form>
    </div>
  );
};
