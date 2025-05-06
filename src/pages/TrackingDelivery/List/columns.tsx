import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceStatusIcon } from "@/components/trackingDelivery/InvoiceStatusIcons";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";

import { useRef } from "react";
import { Invoice, ModalInvoiceCancelHanldes } from "./ModalInvoiceCancel";
import { usePermission } from "@/hooks";

export function useColumns() {
  const modalCancelInvoiceRef = useRef<ModalInvoiceCancelHanldes>(null);
  const { hasPermissionTo } = usePermission()

  const columns: ColumnDef<any>[] = [
    {
      id: "numero",
      accessorKey: "documentNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Número" />
      ),
      cell: ({ row }) => {
        return `${row.original.documentNumber}-${row.original.documentDigit}`;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Emissão",
      accessorKey: "emissionDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dt.Emissão" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.emissionDate);
        return date.toLocaleDateString("pt-BR");
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Prazo",
      accessorKey: "deadlineDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dt.Prazo" />
      ),
      cell: ({ row }) => {
        if (row.original.deadlineDate) {
          const date = new Date(row.original.deadlineDate);
          return date.toLocaleDateString("pt-BR");
        } else {
          return "---";
        }
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Data de Entrega",
      accessorKey: "deliveryDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de Entrega" />
      ),
      cell: ({ row }) => {
        if (row.original.deliveryDate) {
          const date = new Date(row.original.deliveryDate);
          return date.toLocaleDateString("pt-BR");
        } else {
          return "---";
        }
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Origem",
      accessorKey: "originCity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origem" />
      ),
      cell: ({ row }) => {
        return `${row.original.originCity}/${row.original.originState}`;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Destino",
      accessorKey: "destinationCity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Destino" />
      ),
      cell: ({ row }) => {
        return `${row.original.destinationCity}/${row.original.destinationState}`;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Transportadora",
      accessorKey: "carrier.tradeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transportadora" />
      ),
      cell: ({ row }) => {
        return row.original.carrier?.tradeName
          ? row.original.carrier.tradeName.toString().toUpperCase()
          : "---";
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Cliente",
      accessorKey: "client.tradeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cliente" />
      ),
      cell: ({ row }) => {
        return row.original.client?.tradeName
          ? row.original.client.tradeName.toString().toUpperCase()
          : "---";
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return <InvoiceStatusIcon status={row.original?.status} />;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const document = row.original as Invoice


        const actions: IDataTableAction[] = [
          {
            name: "Ver",
            route: `/tracking-delivery/detail/${document.id}`,
            hasPermission: true,
          },
          {
            name: "Cancelar Nota",
            route: `#`,
            hasPermission: true,
            disabled: !!document.canceledAt || !hasPermissionTo("DOCUMENT.CANCEL_INVOICE"),
            onPress: () => {
              modalCancelInvoiceRef.current?.open({
                invoice: document,
              });
            },
          },
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns, modalCancelInvoiceRef };
}
