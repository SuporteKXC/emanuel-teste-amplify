import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  InvoiceStatus,
  InvoiceStatusIcon,
} from "@/components/trackingDelivery/InvoiceStatusIcons";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";
import { useState } from "react";
import { format } from "date-fns";
import { ExportOrderItem } from "@/contracts/exportOrder";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isBetween } from "@/components/ui/DataTable/custom-filters/date-range-filter";
import { Formatter } from "@/utils/Formatter";

export function useColumns() {
  const [selectExportOrderItem, setSelectExportOrderItem] =
    useState<ExportOrderItem>();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const base = "salesOrder.columns";
  const navigate = useNavigate();
  const columns: ColumnDef<ExportOrderItem>[] = [
    {
      id: "Pedido",
      accessorKey: "exportOrder.order_reference",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"PO"} />
      ),
      cell: ({ row }) => {
        return `${row.original?.exportOrder?.order_reference}`;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Item",
      accessorKey: "item",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Item"} />
      ),
      cell: ({ row }) => {
        const company = row.original.item;
        return company;
      },
      enableHiding: true,
    },
    {
      id: "Produto",
      accessorKey: "product.code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Produto"} />
      ),
      cell: ({ row }) => {
        const company = row.original.product?.code;
        return company;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Descrição.Export",
      accessorKey: "product.description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Descrição"} />
      ),
      cell: ({ row }) => {
        const company = row.original.product?.description;
        return company;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Qtd",
      accessorKey: "qty",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Qtd"} />
      ),
      cell: ({ row }) => {
        const company = row.original.qty;
        return company;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "UN",
      accessorKey: "un",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"UN"} />
      ),
      cell: ({ row }) => {
        const company = row.original.un;
        return company;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Registro",
      accessorKey: "register_date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t(`${base}.dataRegister`)}
        />
      ),
      cell: ({ row }) => {
        if (row.original.register_date) {
          const date = row.original.register_date;
          // console.log(date);
          return date ? Formatter.nativeFormat(date) : "--/--/----";
        } else {
          return "---";
        }
      },
      filterFn: isBetween,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Atracação",
      accessorKey: "ata_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.dataAta`)} />
      ),
      cell: ({ row }) => {
        if (row.original.ata_date) {
          const date = row.original.ata_date;
          // console.log(date);
          return date ? Formatter.nativeFormat(date) : "--/--/----";
        } else {
          return "---";
        }
      },
      filterFn: isBetween,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Entrega",
      accessorKey: "delivery_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Entrega"} />
      ),
      cell: ({ row }) => {
        if (row.original?.atd_date) {
          const date = row.original.atd_date;
          return date ? Formatter.nativeFormat(date) : "--/--/----";
        } else {
          return "---";
        }
      },
      filterFn: isBetween,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "GR Atual",
      accessorKey: "gr_actual",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`GR Atual`)} />
      ),
      cell: ({ row }) => {
        if (row.original?.gr_actual) {
          const date = row.original.gr_actual;
          return date ? Formatter.nativeFormat(date) : "--/--/----";
        } else {
          return "---";
        }
      },
      filterFn: isBetween,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`Status`)} />
      ),
      cell: ({ row }) => {
        if (row.original.status) {
          return row.original.status;
        } else {
          return "---";
        }
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const actions: IDataTableAction[] = [
          {
            name: "Ver",
            route: "#",
            onPress: () => {
              navigate(`${row.original.id}`);
            },
          },
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns, selectExportOrderItem, isOpen, setIsOpen };
}
