import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceStatus, InvoiceStatusIcon } from "@/components/trackingDelivery/InvoiceStatusIcons";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";
import { useState } from "react";
import { format } from "date-fns";
import { ExportOrder } from "@/contracts/exportOrder";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isBetween } from "@/components/ui/DataTable/custom-filters/date-range-filter";
import { Formatter } from "@/utils/Formatter";

export function useColumns() {

  const [selectExportOrder, setSelectExportOrder] = useState<ExportOrder>();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const base = "salesOrder.columns";
  const navigate = useNavigate()
  const columns: ColumnDef<ExportOrder>[] = [
    {
      id: "numero",
      accessorKey: "order_reference",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"PO"} />
      ),
      cell: ({ row }) => {
        return `${row.original.order_reference}`;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "company",
      accessorKey: "company",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Origem"} />
      ),
      cell: ({ row }) => {
        const company = row.original.company?.nameFantasy;
        return company
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Registro",
      accessorKey: "register_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.dataRegister`)} />
      ),
      cell: ({ row }) => {
        if (row.original.register_date) {
          const date = row.original.register_date ;
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
          const date = row.original.ata_date ;
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
      id: "Dt.Entrega estatística",
      accessorKey: "statistical_delivery_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={'Entrega'} />
      ),
      cell: ({ row }) => {
        
        if(row.original?.statistical_delivery_date){
          const date = row.original.statistical_delivery_date;
          return date ? Formatter.nativeFormat(date.toString()) : "--/--/----";
        } else{
          return "---";
        }
        
      },
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
        if(row.original?.gr_actual){
          const date = row.original.gr_actual;
          return date ? Formatter.nativeFormat(date) : "--/--/----";
        } else{
          return "---";
        }
      },
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
        
        if(row.original.status){
          return row.original.status;
        } else{
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
             navigate(`${row.original.id}`)
            }
          }
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns, selectExportOrder, isOpen, setIsOpen };
}
