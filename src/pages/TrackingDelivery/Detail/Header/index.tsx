import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Document } from "@/contracts/trackingDelivery/Document";
import { ListGeolocations } from "../Modal/ListGeolocations";
import { useState } from "react";
// import { invoiceMock } from '../MapTrackingInvoice/invoiceMock';
import { NewInvoiceJustification } from "../Modal/NewInvoiceJustification";
import { NewDeliveryDate } from "../Modal/NewDeliveryDate";
import { UpdateCarrier } from "../Modal/UpdateCarrier";
import { RecalculateDeadline } from "../Modal/RecalculateDeadline";
import { InvoiceStatusIcon } from "@/components/trackingDelivery/InvoiceStatusIcons";
import { usePermission } from "@/hooks/usePermission";
import { useTranslation } from "react-i18next";

interface InfoCardProps {
  data: Document;
  onActionSuccess: () => void;
}

export function Header({ data, onActionSuccess }: InfoCardProps) {
  const [modalGeolocations, setModalGeolocations] = useState<boolean>(false);
  const [modalJustification, setModalJustification] = useState<boolean>(false);
  const [modalDeliveryDate, setModalDeliveryDate] = useState<boolean>(false);
  const [modalUpdateCarrier, setModalUpdateCarrier] = useState<boolean>(false);
  const [modalRecalculateDeadline, setModalRecalculateDeadline] =
    useState<boolean>(false);
  const { hasPermissionTo } = usePermission();
  const { t } = useTranslation();

  return (
    <>
      <ListGeolocations
        isOpen={modalGeolocations}
        close={() => setModalGeolocations(false)}
        geolocations={data.documentGeolocations || null}
        occurrences={data.documentOccurrences || null}
      />
      <NewInvoiceJustification
        isOpen={modalJustification}
        close={() => setModalJustification(false)}
        invoiceId={data.id}
        onActionSuccess={onActionSuccess}
      />
      <NewDeliveryDate
        isOpen={modalDeliveryDate}
        close={() => setModalDeliveryDate(false)}
        invoiceId={data.id}
        onActionSuccess={onActionSuccess}
      />
      <RecalculateDeadline
        isOpen={modalRecalculateDeadline}
        close={() => setModalRecalculateDeadline(false)}
        invoice={data}
        onActionSuccess={onActionSuccess}
      />
      <UpdateCarrier
        isOpen={modalUpdateCarrier}
        close={() => setModalUpdateCarrier(false)}
        invoiceId={data.id}
        onActionSuccess={onActionSuccess}
      />
      <section className="flex items-center mb-4 gap-12 w-full rounded-md bg-white px-6 py-4 shadow-sm shadow-slate-300">
        <div className="flex gap-4">
          <InvoiceStatusIcon status={data?.status} size="large" />
          <div>
            <h5 className="text-sm text-slate-500">Status</h5>
            <p className="font-GilroySemibold text-sm text-slate-800 font-semibold">
              {t(`trackingDelivery.status.${data?.status}`)}
            </p>
          </div>
        </div>
        <div>
          <h5 className="text-sm text-slate-500">
            {t("trackingDelivery.fields.documentNumber")}
          </h5>
          <p className="font-GilroySemibold text-sm text-slate-800 font-semibold">
            {data?.documentNumber}-{data?.documentDigit}
          </p>
        </div>
        <div>
          <h5 className="text-sm text-slate-500">
            {t("trackingDelivery.fields.shipmentNumber")}
          </h5>
          <p className="font-GilroySemibold text-sm text-slate-800 font-semibold">
            {data?.brazilDocument?.shipment ?? "---"}
          </p>
        </div>
        <div>
          <h5 className="text-sm text-slate-500">
            {t("trackingDelivery.fields.emissionDate")}
          </h5>
          <p className="font-GilroySemibold text-sm text-slate-800 font-semibold">
            {data?.emissionDate
              ? new Date(data?.emissionDate).toLocaleDateString("pt-BR")
              : "---"}
          </p>
        </div>
        <div>
          <h5 className="text-sm text-slate-500">
            {t("trackingDelivery.fields.deadlineDate")}
          </h5>
          <p className="font-GilroySemibold text-sm text-slate-800 font-semibold">
            {data?.deadlineDate
              ? new Date(data?.deadlineDate).toLocaleDateString("pt-BR")
              : "---"}
          </p>
        </div>
        <div>
          <h5 className="text-sm text-slate-500">
            {t("trackingDelivery.fields.deliveryDate")}
          </h5>
          <p className="font-GilroySemibold text-sm text-slate-800 font-semibold">
            {data?.deliveryDate
              ? new Date(data?.deliveryDate).toLocaleDateString("pt-BR")
              : "---"}
          </p>
        </div>
        <div>
          <h5 className="text-sm text-slate-500">
            {t("trackingDelivery.header.location")}
          </h5>
          <p className="font-GilroySemibold text-sm uppercase text-slate-800 font-semibold">
            {data?.location}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-auto">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {/* <DropdownMenuLabel>Ações</DropdownMenuLabel> */}
            <DropdownMenuItem onClick={() => setModalGeolocations(true)}>
              {t("trackingDelivery.header.locations")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setModalJustification(true)}
              disabled={!hasPermissionTo("DOCUMENT-JUSTIFICATION.CREATE")}
            >
              {t("trackingDelivery.header.justifications")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem
              onClick={() => setModalDeliveryDate(true)}
              disabled={!hasPermissionTo('DOCUMENT.SET_DELIVERY_DATE')}
            >
              {t('trackingDelivery.header.deliveryDate')}
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() => setModalRecalculateDeadline(true)}
              disabled={!hasPermissionTo("DOCUMENT.SET_DEADLINE_DATE")}
            >
              {t("trackingDelivery.header.recalculateDeadline")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setModalUpdateCarrier(true)}
              disabled={!hasPermissionTo("DOCUMENT.SET_CARRIER")}
            >
              {t("trackingDelivery.header.updateCarrier")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </>
  );
}
