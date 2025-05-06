import { Button } from "@/components/ui/ButtonGs";
import {
  InputGs,
  SelectContentProps,
  SelectGs,
  TextareaGs,
} from "@/components/ui/Forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { JustificationType } from "@/contracts";
import { usePermission } from "@/hooks/usePermission";
import type { AppDispatch, RootState } from "@/store";
import {
  JustificationTypeListActions,
  OrderItemActions,
  OrderItemJustificationManyActions,
  SelectedIdsActions,
} from "@/store/ducks";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "../../showOrderItem/styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectSeparator } from "@/components/ui/select";

interface Props {
  children: React.ReactNode;
}

interface FormData {
  justification_type_id: string;
  description: string;
}

const formDataSchema = z.object({
  justification_type_id: z.string().min(1, { message: "Selecione um tipo!" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Insira uma justificativa!" }),
});

const AddJustification: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  //selectors
  const { ids: selectedOrderItems, pos: selectedPos } = useSelector(
    (state: RootState) => state.orderItemSelectedIdsReducer
  );

  const { loading } = useSelector(
    (state: RootState) => state.orderItemJustificationMany
  );

  const { data: justificationTypes } = useSelector(
    (state: RootState) => state.justificationTypes
  );
  const { data: filterData } = useSelector(
    (state: RootState) => state.operationalFilterData
  );

  //form
  const form = useForm<FormData>({
    defaultValues: {
      justification_type_id: "",
      description: "",
    },
    resolver: zodResolver(formDataSchema),
  });

  //fetchs
  function fetchJustificationTypes() {
    dispatch(JustificationTypeListActions.request());
  }

  //handlers
  function success() {
    form.reset();
    setOpen(false);
    dispatch(SelectedIdsActions.clearSelectedIds());
    dispatch(OrderItemActions.request(filterData));
  }
  function onSubmit(formData: FormData) {
    const requestData = {
      ...formData,
      order_item_ids: selectedOrderItems,
    };
    dispatch(OrderItemJustificationManyActions.request(requestData, success));
  }
  function prepareJustificationTypes(): SelectContentProps[] {
    return justificationTypes?.map((justificationType) => ({
      value: `${justificationType.id}`,
      name: justificationType.description,
    }));
  }

  useEffect(() => {
    fetchJustificationTypes();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Justificativas</DialogTitle>
          <DialogDescription>
            Deseja adicionar a TODAS as POs selecionadas?
          </DialogDescription>
          <ScrollArea className="border p-2 border-gray-300 h-20 w-full">
            {selectedPos.map((po,index) => (
              <>
                <div key={index}>
                  PO: {po}
                </div>
                <SelectSeparator/>
              </>
            ))}
          </ScrollArea>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="justification_type_id"
              render={({ field }) => (
                <SelectGs
                  {...field}
                  value={field.value}
                  onValueChange={(value) =>
                    form.setValue("justification_type_id", value)
                  }
                  required
                  label="Tipo de Justificativa"
                  content={prepareJustificationTypes()}
                />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <TextareaGs
                  {...field}
                  label="Descrição"
                  placeholder="Adicione a descrição da justificativa"
                  className="w-full"
                />
              )}
            />
            <Button.Root disabled={loading} type="submit" className="w-full">
              {loading ? <ActivityIndicator /> : "Adicionar para todas"}
            </Button.Root>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJustification;
