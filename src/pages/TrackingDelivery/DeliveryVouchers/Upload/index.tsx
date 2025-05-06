import React, { useCallback, useEffect, useRef } from "react";
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
import { DeliveryVoucherCreateActions } from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { notify } from "@/services";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputFileGs } from "@/components/ui/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const FormSchema = z.object({
  file: z.any().refine((file) => !!file, "Arquivo obrigatório"),
});

export const UploadDeliveryVoucher: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id: chaveNfe } = useParams();
  const { loading } = useSelector(
    (state: RootState) => state.deliveryVoucherCreate
  );
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const goBack = () => {
    navigate("/tracking-delivery/vouchers");
  };

  const onSucess = useCallback(() => {
    notify("success", "Comprovante de entrega adicionado!");
    goBack();
  }, []);

  const handleConfirm = useCallback(
    (data: any) => {
      if (!chaveNfe) {
        notify("error", "Chave da NFe não informada");
        return;
      }
      const file = fileInputRef.current?.files?.[0] || null;

      if (!file) {
        notify("error", "Arquivo não informado");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chave_nf", chaveNfe);

      dispatch(
        DeliveryVoucherCreateActions.request(formData, {
          onSuccess: () => onSucess(),
          onFailure: () => goBack(),
        })
      );
    },
    [dispatch]
  );

  return (
    <section className="w-full h-screen items-center justify-center">
      <Dialog open={!!chaveNfe} onOpenChange={() => goBack()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3 tracking-wide">
              Adicionar comprovante de entrega
            </DialogTitle>
            <DialogDescription className="font-sans">
              Para adicionar um comprovante de entrega, clique no botão{" "}
              <span className="font-bold">selecionar arquivo</span> e selecione
              o arquivo (
              <span className="font-bold">.pdf, .png, .jpg, .jpeg</span>) que
              deseja adicionar . Após selecionar o arquivo, clique no botão{" "}
              <span className="font-bold">adicionar</span> para adicionar o
              comprovante de entrega. .
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleConfirm)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <InputFileGs
                    {...field}
                    type="file"
                    disabled={loading}
                    ref={fileInputRef}
                  />
                )}
              />

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
                  Adicionar
                </Button.Root>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
