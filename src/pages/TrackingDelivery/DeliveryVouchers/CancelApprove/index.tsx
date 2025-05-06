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
  DeliveryVoucherCancelApproveActions,
} from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { RenderVoucher } from "../RenderVoucher";
import { notify } from "@/services";

export const CancelApproveDeliveryVoucher: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { fileName, id } = useParams();
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
    notify(
      "success",
      "O cancelamento da aprovação do comprovante de entrega foi realizada com sucesso!"
    );
    goBack();
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(
      DeliveryVoucherCancelApproveActions.request(id, {
        onSuccess: () => onSucess(),
        onFailure: () => goBack(),
      })
    );
  }, [dispatch]);

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
              Cancelar da aprovação do comprovante de entrega?
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
          <DialogDescription className="font-sans">
            Você tenha certeza que deseja cancelar a aprovação o comprovante de
            entrega, clique no botão{" "}
            <span className="font-bold">cancelar aprovação</span>. Caso
            contrário, clique no botão{" "}
            <span className="font-bold">cancelar</span>.
          </DialogDescription>
          <DialogFooter>
            <Button.Root size="sm" variant="secondary" onClick={() => goBack()}>
              Cancelar
            </Button.Root>
            <Button.Root
              size="sm"
              variant="danger"
              onClick={() => handleConfirm()}
              disabled={loading}
            >
              Cancelar aprovação
            </Button.Root>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
