import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceStatus, InvoiceStatusIcon } from "@/components/trackingDelivery/InvoiceStatusIcons";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";
import { modalShowSalesOrderRef } from ".";
import { useState } from "react";
import { format } from "date-fns";
import {
  BookOpenText
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SalesOrder } from "@/contracts/salesOrder";
import { useTranslation } from "react-i18next";

export function useColumns() {

  const [selectSalesOrder, setSelectSalesOrder] = useState<SalesOrder>();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const base = "salesOrder.columns";
  const columns: ColumnDef<SalesOrder>[] = [
    {
      id: "numero",
      accessorKey: "order_reference",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.salesOrder`)} />
      ),
      cell: ({ row }) => {
        return `${row.original.order_reference}`;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Emissão",
      accessorKey: "emissionDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.dataEmissao`)} />
      ),
      cell: ({ row }) => {
        const date = row.original.emission_date;
        return format(new Date(date),'dd/MM/yyyy');
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Prazo",
      accessorKey: "deadlineDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.dataPrazo`)} />
      ),
      cell: ({ row }) => {
        if (row.original.deadline_date) {
          const date = row.original.deadline_date;
          return format(new Date(date),'dd/MM/yyyy');
        } else {
          return "---";
        }
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Num. Entrega",
      accessorKey: "delivery_document_number",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t(`${base}.numEntrega`)}
        />
      ),
      cell: ({ row }) => {
        return `${row.original.delivery_document_number || "---"}`;
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "Data.Fat",
      accessorKey: "dateFate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.dataFaturamento`)} />
      ),
      cell: ({ row }) => {
        
        if(row.original.document?.createdAt){
          const date = row.original.document?.createdAt;
          return format(new Date(date),'dd/MM/yyyy');
        } else{
          return "---";
        }
        
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Entrega",
      accessorKey: "dateArrived",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.dataEntrega`)} />
      ),
      cell: ({ row }) => {
        if (row.original.delivery_date) {
          const date = row.original.delivery_date
          return format(new Date(date),'dd/MM/yyyy');
        } else {
          return "---";
        }
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "NúmeroNFe",
      accessorKey: "NúmeroNFe",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.nfNumero`)} />
      ),
      cell: ({ row }) => {
        
        if(row.original.document?.documentNumber){
          return row.original.document?.documentNumber;
        } else{
          return "---";
        }
        
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Origem",
      accessorKey: "company.tradeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.origem`)} />
      ),
      cell: ({ row }) => {
        return `${row.original.company.nameFantasy}`;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Cliente",
      accessorKey: "client.tradeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t(`${base}.cliente`)} />
      ),
      cell: ({ row }) => {
        return row.original.client?.tradeName
          ? row.original.client.tradeName.toString().toUpperCase()
          : "";
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Justification",
      cell: ({ row }) => {
        const {justification_sales: justification} = row.original
        const approved = justification.filter((element: any) => element.approvedAt !== null)
        const reproved = justification.filter((element: any) => element.rejectedAt !== null)
        const pending = justification.filter((element: any) => element.approvedAt === null && element.rejectedAt === null)
        return ( 
        row.original.justification_sales.length ? 
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <BookOpenText />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs font-sans text-xs p-4">
                  <div className="flex flex-col">
                    <p key={1}><span className="font-bold">Aprovadas:</span> {approved.length}</p>
                    <p key={2}><span className="font-bold">Reprovadas:</span> {reproved.length}</p>
                    <p key={3}><span className="font-bold">Pendentes:</span> {pending.length}</p>
                  </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> : <></>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Status",
      cell: ({ row }) => {
        return <InvoiceStatusIcon status={row.original?.status as InvoiceStatus} />;
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
              setSelectSalesOrder(row.original)
              setIsOpen(true);
              modalShowSalesOrderRef.current?.open()
            }
          }
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns, selectSalesOrder, isOpen, setIsOpen };
}
