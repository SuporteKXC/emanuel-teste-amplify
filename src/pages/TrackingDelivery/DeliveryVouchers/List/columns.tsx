import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";
import { VoucherStatusIcons } from "@/components/trackingDelivery/VoucherStatusIcons";
import { usePermission } from "@/hooks/usePermission";
import { DeliveryVoucher } from "@/contracts/trackingDelivery";

export function useColumns() {
  const { hasPermissionTo } = usePermission();
  const columns: ColumnDef<DeliveryVoucher>[] = [
    {
      id: "NF",
      accessorKey: "documentNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NF" />
      ),
      cell: ({ row }) => {
        const nf = `${row.original.document.documentNumber}-${row.original.document.documentDigit}`;
        return nf;
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
        const date = new Date(row.original.document.emissionDate);
        return date.toLocaleDateString("pt-BR");
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Entrega",
      accessorKey: "deliveryDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dt.Entrega" />
      ),
      cell: ({ row }) => {
        const deliveryDate = row.original.document.deliveryDate;
        if (!deliveryDate) return null;
        const date = new Date(deliveryDate);
        return date.toLocaleDateString("pt-BR");
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
        const origin = `${row.original.document.originCity}/${row.original.document.originState}`;
        return origin;
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
        const destination = `${row.original.document.destinationCity}/${row.original.document.destinationState}`;
        return destination;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Transportadora",
      accessorKey: "carrierTradeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transportadora" />
      ),
      cell: ({ row }) => {
        return row.original.document.carrier?.tradeName ?? null;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Cliente",
      accessorKey: "clientTradeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cliente" />
      ),
      cell: ({ row }) => {
        return row.original.document.client?.tradeName ?? null;
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
        return (
          <VoucherStatusIcons
            status={row.original?.status}
            message={row.original.rejectedReason ?? undefined}
          />
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const actions: IDataTableAction[] = [
          {
            name: "Upload",
            route: `/tracking-delivery/vouchers/create/${row.original.document.chaveNfe}`,
            hasPermission:
              (!row.original.id &&
                hasPermissionTo("DELIVERY_VOUCHER.UPLOAD")) ||
              (!!row.original.id &&
                !!row.original.rejectedAt &&
                hasPermissionTo("DELIVERY_VOUCHER.UPLOAD")),
          },
          {
            name: "Ver NF",
            route: `/tracking-delivery/detail/${row.original.document.id}`,
            hasPermission:
              !!row.original.document.id &&
              hasPermissionTo("DELIVERY_VOUCHER.DOWNLOAD"),
          },
          {
            name: "Expandir",
            route: `/tracking-delivery/vouchers/view/${row.original.fileName}?nf=${row.original.document.documentNumber}-${row.original.document.documentDigit}&id=${row.original.id}`,
            hasPermission:
              !!row.original.id && hasPermissionTo("DELIVERY_VOUCHER.DOWNLOAD"),
          },
          {
            name: "Aprovar",
            route: `/tracking-delivery/vouchers/approve/${row.original.id}/${row.original.fileName}`,
            hasPermission:
              !!row.original.id &&
              !row.original.approvedAt &&
              !row.original.rejectedAt &&
              hasPermissionTo("DELIVERY_VOUCHER.SET_AS_APPROVED"),
          },
          {
            name: "Reprovar",
            route: `/tracking-delivery/vouchers/reject/${row.original.id}/${row.original.fileName}`,
            hasPermission:
              !!row.original.id &&
              !row.original.approvedAt &&
              !row.original.rejectedAt &&
              hasPermissionTo("DELIVERY_VOUCHER.SET_AS_REJECTED"),
          },
          {
            name: "Cancelar Aprovação",
            route: `/tracking-delivery/vouchers/cancel-approval/${row.original.id}/${row.original.fileName}`,
            hasPermission:
              !!row.original.id &&
              !!row.original.approvedAt &&
              !row.original.rejectedAt &&
              hasPermissionTo("DELIVERY_VOUCHER.CANCEL_APPROVED"),
          },
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns };
}
