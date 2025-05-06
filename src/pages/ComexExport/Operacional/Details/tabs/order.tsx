import { Button } from "@/components/ui/ButtonGs";
import { DataTable, DataTableColumnHeader } from "@/components/ui/DataTable";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Contact,
  MapPin,
  Package2,
  Ship,
  TruckIcon,
  Warehouse,
  WarehouseIcon,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { JustificationSales } from "@/contracts/justificationSales";
import { DateTime } from "luxon";
import { JustificationForm } from "@/pages/ComexExport/Operacional/Details/tabs/JustificationForm";
import { ExportOrder, ExportOrderItem } from "@/contracts/exportOrder/exportOrder";
import { ReactNode } from "react";
import CarrierTransport from "@/components/comex/Operational/CarrierTransport";
import { OrderItem } from "@/contracts/management";
import { OrderItemData } from "@/contracts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { GetExportOrderJustificationActions, NewExportOrderJustificationActions } from "@/store/ducks";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Formatter } from "@/utils/Formatter";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

const InfoCard = ({ icon, title, content }: InfoCardProps) => (
  <div className="bg-white p-6 rounded">
    <div className="flex items-center mb-5">
      <div className="mr-4">{icon}</div>
      <p className="font-semibold text-sm uppercase">{title}</p>
    </div>
    <div className="grid gap-2">{content}</div>
  </div>
);

const columns: ColumnDef<JustificationSales>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Id" />;
    },
    cell: ({ row }) => {
      return `${row.original.id}`;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "description",
    accessorKey: "description",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Descrição" />;
    },
    cell: ({ row }) => {
      return `${row.original.description}`;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Adicionada em" />;
    },
    cell: ({ row }) => {
      const data = new Date(String(row.original.created_at));
      const dataFormatada = format(data, 'dd/MM/yyyy HH:mm');
      return `${dataFormatada}`;
    },
    enableSorting: true,
    enableHiding: true,
  },
];

interface FormData {
  description: string;
  justification_type_id: number;
  export_order_id: number;
}

const Pedido: React.FC<{ order: ExportOrder }> = ({ order }) => {
  const dispatch = useDispatch();

  const { id: exportOrderId } = useParams();

  const [open, setOpen] = useState(false)
  const infoItems = useMemo(
    () => [
      { title: "PO", value: order?.order_reference || "" },
      { title: "Customer PO", value: order?.customer_po || "" },
      { title: "Informações de compra", value: order?.purchasing_info || "" },
      { title: "Moeda", value: order?.invoice_currency},
    ],
    [order]
  );

  const { data: exportOrderJustificationData } =
    useSelector((state: RootState) => state.getExportOrderJustification);

  const fetchExportOrderJustifications = useCallback(() => {
    if (exportOrderId) {
      dispatch(GetExportOrderJustificationActions.request({ exportOrder: exportOrderId }));
    }
  }, []);
  useEffect(() => {
    fetchExportOrderJustifications();
  }, [exportOrderId]);

  const onSuccess = () => {
    setOpen(false);
    fetchExportOrderJustifications();
  }

  const handleSubmit = (data: FormData) => {
    const validData = {
      description: data.description,
      justification_type_id: data.justification_type_id,
      export_order_id: exportOrderId,
    };
    dispatch(NewExportOrderJustificationActions.request(validData, onSuccess));
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <section className="w-full px-4 pb-4 border-b-4 border-green-400 justify-between flex bg-white rounded">
        {infoItems.map((item, index) => (
          <div key={index}>
            <h2 className="font-GilroyRegular">{item.title}</h2>
            <p className="font-GilroyBold">{item.value}</p>
          </div>
        ))}
      </section>
      <section className="grid w-full grid-cols-1 sm:grid-cols-4 gap-4 justify-between">
        <div className=" p-6 flex flex-col gap-4">
          <p className="font-GilroyBold">
            Próxima etapa: <span>{order?.status || "BOOKING"}</span>
          </p>
          <p className="font-GilroyBold">
            Modal: <span>{order?.modal}</span>
          </p>
          <p className="font-GilroyBold">
            Tipo de processo: <span>{order?.purchasing_doc_type}</span>
          </p>
          <p className="font-GilroyBold">
            Analista Responsável: <span>{order?.customer_po}</span>
          </p>
        </div>
        <InfoCard
          icon={<Warehouse className="w-5 h-5 text-gray-900" />}
          title="Fornecedor"
          content={
            <>
              <p className="font-semibold text-sm text-gray-900">
                Razão Social:
              </p>
              <p className="text-xs text-gray-500">
                {order?.company?.trade_name}
              </p>
              <p className="font-semibold text-sm text-gray-900">Origem:</p>
              <p className="text-xs text-gray-500">
                {order?.shipper_address}
              </p>
            </>
          }
        />

        <InfoCard
          icon={<MapPin className="w-5 h-5 text-gray-900" />}
          title="Destinatário"
          content={
            <>
              <p className="font-semibold text-sm text-gray-900">
                Razão Social:
              </p>
              <p className="text-xs text-gray-500">
                {order?.client?.tradeName}
              </p>
              <p className="font-semibold text-sm text-gray-900">
                Terminal de Atracação:
              </p>
              <p className="text-xs text-gray-500">
                {order?.destination_harbor}
              </p>
              <p className="font-semibold text-sm text-gray-900">
                Terminal do Desembaraço:
              </p>
              <p className="text-xs text-gray-500">
                {order?.port_clearance}
              </p>
              <p className="font-semibold text-sm text-gray-900">
                Planta Destino:
              </p>
              <p className="text-xs text-gray-500">
                {order?.company?.country}
              </p>
            </>
          }
        />

        <InfoCard
          icon={<Ship className="w-5 h-5 text-gray-900" />}
          title="Previsões"
          content={
            <>
              <p className="font-semibold text-sm text-gray-900">ETD:</p>
              <p className="text-xs text-gray-500">
                {order?.etd_date &&
                  Formatter.nativeFormat(order?.etd_date)}
              </p>
              <p className="font-semibold text-sm text-gray-900">ETA:</p>
              <p className="text-xs text-gray-500">
                {order?.eta_date &&
                  Formatter.nativeFormat(order?.eta_date)}
              </p>
              <p className="font-semibold text-sm text-gray-900">
                ETA Revisado:
              </p>
              <p className="text-xs text-gray-500">
                {order?.revised_eta_date &&
                  Formatter.nativeFormat(order?.revised_eta_date)}
              </p>
              <p className="font-semibold text-sm text-gray-900">ETB:</p>
              <p className="text-xs text-gray-500">
                {order?.etb_date &&
                   Formatter.nativeFormat(order?.etb_date)}
              </p>
              <p className="font-semibold text-sm text-gray-900">GR Atual:</p>
              <p className="text-xs text-gray-500">
                {order?.gr_actual &&
                  Formatter.nativeFormat(order?.gr_actual)}
              </p>
            </>
          }
        />
      </section>
      <CarrierTransport orderItem={order as unknown as OrderItemData} />

      <Separator />
      <section>
        <div className="w-full flex justify-between">
          <h2>Justificativas:</h2>
          {
            exportOrderJustificationData.length == 0 && (
              <Dialog open={open} onOpenChange={
                setOpen
              }>
                <DialogTrigger asChild>
                  <Button.Root size="sm">Adicionar</Button.Root>
                </DialogTrigger>
                <DialogContent>
                  <JustificationForm
                    handleSubmit={handleSubmit}
                    isOpen={open}
                  />
                </DialogContent>
              </Dialog>
            )
          }
        </div>
        <DataTable
          columns={columns as ColumnDef<unknown>[]}
          data={exportOrderJustificationData || []}
        >
          {
            exportOrderJustificationData.length > 0 && 
              <Dialog open={open} onOpenChange={
                setOpen
              }>
                <DialogTrigger asChild>
                  <Button.Root size="sm">Adicionar</Button.Root>
                </DialogTrigger>
                <DialogContent>
                  <JustificationForm
                    handleSubmit={handleSubmit}
                    isOpen={open}
                  />
                </DialogContent>
              </Dialog>
            
          }
        </DataTable>
      </section>
    </div>
  );
};

export default Pedido;
