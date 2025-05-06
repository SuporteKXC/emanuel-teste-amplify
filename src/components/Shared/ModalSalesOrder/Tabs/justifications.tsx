import { Button } from "@/components/ui/ButtonGs";
import { SelectGs, InputGs } from "@/components/ui/Forms";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormField, Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SalesOrder } from "@/contracts/salesOrder";
import { useAuth, usePermission } from "@/hooks";
import { RootState } from "@/store";
import { JustificationTypeListActions, JustificationTypesActions } from "@/store/ducks";
import {
  CreateJustificationSalesActions,
  JustificationSalesIndexActions,
  UpdateStatusJustificationSalesActions,
} from "@/store/ducks/trackingDelivery/justification-sales";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, XSquare, Check, X } from "lucide-react";
import { DateTime } from "luxon";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "../../ConfirmModal/styles";
import { useTranslation } from "react-i18next";
import { SalesOrderIndexActions, salesOrderIndex } from "@/store/ducks/trackingDelivery/sales-order";

interface FormData {
  description: string;
  type: string;
}
export const JustificationsTab: React.FC<{ salesOrder: SalesOrder | null }> = ({
  salesOrder,
}) => {
  const [checkedJustifications, setCheckedJustifications] = useState<number[]>(
    []
  );
  const { t } = useTranslation();
  const base = "salesOrder.drawer.justification";
  const { profile } = useAuth();
  
  const { data: justificationData, loading: justificationLoading } =
    useSelector((state: RootState) => state.justificationSalesIndex);
  
    const { data: justificationTypeData, loading: justificationTypeLoading } =
    useSelector((state: RootState) => state.listJustificationTypes);
  
    const { loading: justificationStatusLoading } = useSelector(
    (state: RootState) => state.updateStatusJustificationSales
  );
  
  const {loading: justificationCreateLoading} = useSelector((state: RootState) => state.createJustificationSales)
  
  const { data: filterData } = useSelector((state: RootState) => state.salesOrderFilter);

  const dispatch = useDispatch();

  const { hasPermissionTo } = usePermission()
  const justificationOptions = justificationTypeData?.map((item) => ({
    value: `${item.id}`,
    name: item.description,
  }));
  const form = useForm({
    defaultValues: {
      type: "",
      description: "",
    },
  });

  const handleReset = useCallback(() => {
    form.reset({
      type: "",
      description: "",
    });
  }, [form]);

  const onSuccess = () => {
    dispatch(
      JustificationSalesIndexActions.request({ salesOrderId: salesOrder?.id })
    );
    dispatch(
      SalesOrderIndexActions.request(filterData.formFilter, filterData.statusFilter)
    )
    setCheckedJustifications([]);
    handleReset()
  };

  const handleSubmit = (data: FormData) => {
    const validData = {
      description: data.description,
      justification_type_id: data.type,
      user_id: profile?.userId,
      sales_order_id: salesOrder?.id,
    }
    dispatch(CreateJustificationSalesActions.request(validData,onSuccess));
  }
  const handleCheckJustifications = useCallback(
    (checked: boolean, id: number) => {
      const justification = justificationData?.find((item) => item.id === id) as any;
      if (justification?.rejectedAt || justification?.approvedAt) return
      if (checked) {
        setCheckedJustifications([...checkedJustifications, id]);
      } else {
        setCheckedJustifications(checkedJustifications.filter((c) => c !== id));
      }
    },
    [checkedJustifications, setCheckedJustifications]
  );
  const checkAll = (e: boolean) => {
    if (e) {
      setCheckedJustifications(justificationData?.map((item) => item.id));
    } else {
      setCheckedJustifications([]);
    }
  };
  const isAllChecked = () => {
    return (
      checkedJustifications.length === justificationData?.length &&
      checkedJustifications.length > 0
    );
  };


  const handleApprove = (ids: number[]) => {
    const data = {
      ids: ids,
      data: {
        approved_at: DateTime.now().toISO(),
        justification_user_id: profile?.userId,
      },
    };
    dispatch(UpdateStatusJustificationSalesActions.request(data, onSuccess));
  };

  const handleReprove = (ids: number[]) => {
    const data = {
      ids: ids,
      data: {
        rejected_at: DateTime.now().toISO(),
        justification_user_id: profile?.userId,
      },
    };
    dispatch(UpdateStatusJustificationSalesActions.request(data, onSuccess));
  };

  useEffect(() => {
    dispatch(
      JustificationSalesIndexActions.request({ salesOrderId: salesOrder?.id })
    );
    dispatch(JustificationTypesActions.request({ category: "tracking" }));
  }, []);

  return (
    <div className="text-sm px-6 mt-4 w-full rounded border-2">
      {salesOrder && hasPermissionTo("JUSTIFICATION_SALES.INDEX") ? (
        <ScrollArea className="h-[200px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  scope="col"
                  className="w-[5%] text-start py-2 font-GilroyBold"
                >
                  <Checkbox
                    checked={isAllChecked()}
                    onCheckedChange={(e: boolean) => {
                      checkAll(e);
                    }}
                  />
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[10%] text-start py-2 font-GilroyBold"
                >
                  {t(`Id`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[15%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.tipo`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[60%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.comentario`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[5%] text-start py-2 font-GilroyBold"
                >
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[5%] text-start py-2 font-GilroyBold"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      disabled={
                        justificationStatusLoading ||
                        checkedJustifications.length === 0
                      }
                    >
                      <Button.Root className="p-0">
                        <MoreHorizontal className="bg-white h-5 w-5 text-slate-800" />
                      </Button.Root>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-sm shadow-lg border-2 bg-white"
                    >
                      <DropdownMenuItem>
                        <div
                          onClick={() => handleApprove(checkedJustifications)}
                        >
                          {t(`${base}.aprovar`)}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div
                          onClick={() => handleReprove(checkedJustifications)}
                        >
                          {t(`${base}.reprovar`)}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto max-h-50">
              {justificationData.map((element: any) => {
                return (
                  <TableRow key={element.id}>
                    <TableCell className="w-[5%] text-start py-2">
                      <Checkbox
                        checked={checkedJustifications.includes(element.id)}
                        onCheckedChange={(e: boolean) =>
                          handleCheckJustifications(e, element.id)
                        }
                      />
                    </TableCell>
                    <TableCell scope="row" className="w-[10%] text-start py-2">
                      {element.id}
                    </TableCell>
                    <TableCell className="w-[15%] text-start py-2">
                      {element.justificationTypeId}
                    </TableCell>
                    <TableCell className="w-[60%] text-start py-2">
                      {element.description}
                    </TableCell>
                    <TableCell className="w-[5%] text-start py-2">
                      {element.approvedAt == null &&
                      element.rejectedAt == null ? (
                        <></>
                      ) : element.approvedAt ? (
                        <Check className="rounded-sm bg-green-400 stroke-slate-50" />
                      ) : (
                        <X className="rounded-sm stroke-slate-50 bg-red-400" />
                      )}
                    </TableCell>
                    <TableCell className="w-[5%] text-start py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          disabled={
                            justificationStatusLoading ||
                            element.approvedAt ||
                            element.rejectedAt ||
                            !hasPermissionTo('JUSTIFICATION_SALES.UPDATE_IN')
                          }
                        >
                          <Button.Root className="p-0">
                            <MoreHorizontal className="bg-white h-5 w-5 text-slate-800" />
                          </Button.Root>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-sm shadow-lg border-2 bg-white"
                        >
                          <DropdownMenuItem>
                            <div onClick={() => handleApprove([element.id])}>
                              {t(`${base}.aprovar`)}
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div onClick={() => handleReprove([element.id])}>
                              {t(`${base}.reprovar`)}
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <h1 className="font-GilroyBold text-lg text-slate-800">Não possui permissão para ver as justificativas</h1>
      )}
      <h1 className="font-GilroyBold text-lg text-slate-800">
        {t(`${base}.novaJustificativa`)}
      </h1>
      <div>
      {hasPermissionTo('JUSTIFICATION_SALES.CREATE') && <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <SelectGs
                {...field}
                label={"Tipo"}
                content={justificationOptions}
                value={field.value}
                onValueChange={(value) => form.setValue("type", value)}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <InputGs
                {...field}
                label="Comentário"
                placeholder="Comentário"
                maxLength={255}
                // disabled={isLoading}
              />
            )}
          />
          <div className="flex gap-2 justify-start">
            <Button.Root
              variant="secondary"
              size="sm"
              type="reset"
              onClick={() => handleReset()}
            >
              {t(`${base}.limpar`)}
            </Button.Root>
            <Button.Root disabled={justificationCreateLoading} size="sm" type="submit">
              {justificationCreateLoading ? <ActivityIndicator/> : t(`${base}.salvar`) }
            </Button.Root>
          </div>
        </form>
      </Form>}
      </div>
    </div>
  );
};
