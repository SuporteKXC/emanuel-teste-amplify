import { Loading } from "@/components/shared/Forms/Input/styles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCancelInvoice from "@/queries/TrackingDelivery/cancelInvoice";
import { notify } from "@/services";
import { DocumentsListActions } from "@/store/ducks/trackingDelivery/documents";
import { AlertCircle } from "lucide-react";
import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type Client = {
  id: number;
  tradeName: string;
};

type Carrier = {
  id: number;
  tradeName: string;
};

type Company = {
  id: number;
  nameFantasy: string;
};
export type Invoice = {
  id: number;
  documentNumber: string;
  documentDigit: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  emissionDate: string;
  deliveryDate: string;
  deadlineDate: string;
  returnDate: any;
  canceledAt: any;
  companyId: number;
  company: Company;
  clientId: number;
  client: Client;
  carrierId: number;
  carrier: Carrier;
  documentOccurrences: any[];
  status: string;
};

type Params = {
  invoice: Invoice | null;
};

export type ModalInvoiceCancelHanldes = {
  open: (payload: Params) => void;
  close: () => void;
};

type ModalDataState = {
  open: boolean;
  invoice: Invoice | null;
};

const MODAL_DATA_INITIAL_STATE: ModalDataState = {
  open: false,
  invoice: null,
};

type ModalInvoiceCancelProps = {
  documentRefetch: () => void;
};

const ModalInvoiceCancel = forwardRef<
  ModalInvoiceCancelHanldes,
  ModalInvoiceCancelProps
>(({ documentRefetch }, ref) => {
  const dispatch = useDispatch();
  const { mutate, isPending, isError, reset } = useCancelInvoice();
  const [modalData, setModalData] = useState<ModalDataState>(
    MODAL_DATA_INITIAL_STATE
  );
  const justificationInputRef = useRef<HTMLTextAreaElement>(null);

  const handleInvoice = () => {
    const { invoice } = modalData;

    if (!invoice) return;

    if (!justificationInputRef.current?.value) {
      notify("error", "Informe uma Justificativa de cancelamento.");
      return;
    }

    const makePayload = {
      documentId: invoice.id,
      cancellationJustification: justificationInputRef.current?.value,
    };

    mutate(makePayload, {
      onSuccess: () => {
        notify("success", "Nota foi cancelada com sucesso!");
        documentRefetch();
        onClose();
      },
      onError: () => {},
    });
  };

  const onClose = () => {
    reset();
    setModalData(MODAL_DATA_INITIAL_STATE);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: ({ invoice }) => {
        setModalData({
          invoice: invoice,
          open: true,
        });
      },
      close: () => onClose,
    }),
    []
  );

  return (
    <Dialog open={modalData.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {`#Nº ${
              modalData.invoice
                ? `${modalData.invoice.documentNumber}-${modalData.invoice.documentDigit}`
                : "---"
            } - Cancelar`}
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja cancelar essa nota?
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <label
            htmlFor="cancellationJustification"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Justificativa
          </label>
          <textarea
            ref={justificationInputRef}
            id="cancellationJustification"
            name="cancellationJustification"
            className="lock p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {isError && (
          <div className="alert w-full flex justify-center items-center gap-2">
            <AlertCircle size={21} className="text-red-600" />
            <span className="text-md text-red-600">
              Não foi possível cancelar nota!
            </span>
          </div>
        )}
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button
            onClick={handleInvoice}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && <Loading />}
            {isPending ? "Cancelando Nota" : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default memo(ModalInvoiceCancel);
