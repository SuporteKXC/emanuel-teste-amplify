import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { AppDispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DeliveryVoucherApproveActions,
  DeliveryVoucherDownloadActions,
  DeliveryVoucherRejectActions,
} from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { RenderVoucher } from "../RenderVoucher";
import { Button } from "@/components/ui/button";
import { apiStocks, notify } from "@/services";
import RejectModal from "./RejectModal";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export const DeliveryVoucherView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { fileName } = useParams();
  const [queryString] = useSearchParams();
  const nf = queryString.get("nf");
  const id = queryString.get("id");
  const { data: fileData, loading } = useSelector(
    (state: RootState) => state.deliveryVoucherDownload
  );

  const { data, isLoading } = useQuery({
    queryKey: [`get-voucher-${id!}`],
    queryFn: async () => {
      const { data } = await apiStocks.get(`/delivery-voucher/${id!}`);

      return data;
    },
  });

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

  const onConfirmSucess = useCallback(() => {
    notify("success", "Comprovante de entrega aprovado com sucesso!");
    // goBack();
  }, []);

  const handleConfirm = useCallback(() => {
    if (!id) return;

    dispatch(
      DeliveryVoucherApproveActions.request(id, {
        onSuccess: () => onConfirmSucess(),
        onFailure: () => goBack(),
      })
    );
  }, [dispatch, id]);

  const handleDownloadPDFFile = async () => {
    if (!fileName) return;

    try {
      const { data } = await apiStocks.get(
        `delivery-voucher/download?fileName=${fileName}`
      );

      const a = document.createElement("a");
      a.href = data.urlSigned;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
    }
  };

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
              {`Comprovante de entrega - NF ${nf}`}
            </DialogTitle>
            <DialogDescription className="grid gap-1.5">
              <div className="">
                {data && (
                  <span>{`Criado em: ${format(
                    new Date(data?.createdAt),
                    "dd/mm/yyyy HH:mm"
                  )}`}</span>
                )}
                <span>{` - Enviado por: ${data?.user?.name ?? "---"}`}</span>
              </div>

              <span>
                {data?.apiReason && !data?.approvedAt
                  ? `(${data?.approvalApi}) - ${data.apiReason}`
                  : ""}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="font-sans !mb-4">
            <RenderVoucher
              fileName={fileName}
              fileData={fileData}
              isLoading={loading}
            />
          </div>
          <DialogFooter className="w-full grid grid-cols-2">
            <DialogClose asChild>
              <Button className="w-max">Fechar</Button>
            </DialogClose>
            <div className="flex gap-2 justify-end">
              <Button
                className="bg-green-500 hover:bg-green-400"
                onClick={handleConfirm}
                disabled={!id}
              >
                Aprovar
              </Button>
              <RejectModal id={id!} />
              <Button variant="secondary" onClick={handleDownloadPDFFile}>
                Download
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
