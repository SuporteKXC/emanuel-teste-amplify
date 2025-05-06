import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { TextareaGs } from "@/components/ui/Forms";
import { notify } from "@/services";
import { RootState } from "@/store";
import { DeliveryVoucherRejectActions } from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type Inputs = {
  reason: string;
};

type RejectModalProps = {
  id: string | number;
};

const RejectModal = ({ id }: RejectModalProps) => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const { loading } = useSelector(
    (state: RootState) => state.deliveryVoucherReject
  );

  const onSucess = useCallback(() => {
    notify("success", "Comprovante de entrega rejeitado!");
  }, []);

  const onFailure = useCallback(() => {
    notify("error", "Não foi possível rejeitar.");
  }, []);

  const handleConfirm = useCallback<SubmitHandler<Inputs>>(
    (data) => {
      dispatch(
        DeliveryVoucherRejectActions.request(
          { id, reason: data.reason },
          {
            onSuccess: () => onSucess(),
            onFailure: () => onFailure(),
          }
        )
      );
    },
    [dispatch]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Reprovar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl min-h-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-3 tracking-wide">
            Reprovar comprovante de entrega?
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleConfirm)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <TextareaGs
                  {...field}
                  placeholder="Motivo da reprovação"
                  disabled={loading}
                />
              )}
            />

            <DialogDescription className="font-sans">
              Você tenha certeza que deseja reprovar o comprovante de entrega,
              clique no botão <span className="font-bold">reprovar</span>. Caso
              contrário, clique no botão{" "}
              <span className="font-bold">cancelar</span>.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button size="sm" variant="secondary" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                size="sm"
                variant="destructive"
                type="submit"
                disabled={loading}
              >
                Reprovar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RejectModal;
