import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/ButtonGs";
import {
  DeliveryVoucherDownloadActions,
  DeliveryVoucherRejectActions,
} from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { RenderVoucher } from "../RenderVoucher";
import { notify } from "@/services";
import { Form, FormField } from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextareaGs } from "@/components/ui/Forms";

type Inputs = {
  reason: string;
};

export const RejectDeliveryVoucher: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { fileName, id } = useParams();
  const form = useForm({
    defaultValues: {
      reason: "",
    },
  });
  const { data: fileData, loading } = useSelector(
    (state: RootState) => state.deliveryVoucherDownload
  );

  const goBack = () => {
    navigate("/tracking-delivery/vouchers");
  };

  const downloadFile = useCallback(() => {
    dispatch(
      DeliveryVoucherDownloadActions.request(
        { fileName },
        { onFailure: () => goBack() }
      )
    );
  }, [dispatch, fileName]);

  const onSucess = useCallback(() => {
    notify("success", "Comprovante de entrega rejeitado!");
    goBack();
  }, []);

  const handleConfirm = useCallback<SubmitHandler<Inputs>>(
    (data) => {
      dispatch(
        DeliveryVoucherRejectActions.request(
          { id, reason: data.reason },
          {
            onSuccess: () => onSucess(),
            onFailure: () => goBack(),
          }
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    downloadFile();

    return () => {
      dispatch(DeliveryVoucherDownloadActions.reset());
    };
  }, [downloadFile, dispatch]);

  return (
    <section className="w-full h-screen items-center justify-center">
      <Dialog open={!!fileName} onOpenChange={() => goBack()}>
        <DialogContent className="max-w-3xl min-h-[500px]">
          <DialogHeader>
            <DialogTitle className="mb-3 tracking-wide">
              Reprovar comprovante de entrega?
            </DialogTitle>
          </DialogHeader>
          <div className="font-sans !mb-4">
            <div className="w-full h-[500px] overflow-y-auto bg-slate-100">
              <RenderVoucher
                fileName={fileName}
                fileData={fileData}
                isLoading={loading}
              />
            </div>
          </div>
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
                clique no botão <span className="font-bold">reprovar</span>.
                Caso contrário, clique no botão{" "}
                <span className="font-bold">cancelar</span>.
              </DialogDescription>
              <DialogFooter>
                <Button.Root
                  size="sm"
                  variant="secondary"
                  onClick={() => goBack()}
                >
                  Cancelar
                </Button.Root>
                <Button.Root
                  size="sm"
                  variant="danger"
                  type="submit"
                  disabled={loading}
                >
                  Reprovar
                </Button.Root>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
