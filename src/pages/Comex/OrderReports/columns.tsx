import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceStatusIcon } from "@/components/trackingDelivery/InvoiceStatusIcons";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";

import { usePermission } from "@/hooks";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { useDownloadReport } from "./queries/downloadReport";
import { useProcessReport } from "./queries/processReport";
import { notify } from "@/services";
import { Button } from "@/components/ui/button";
import FileSaver from "file-saver";

const PROCESS_STATUS = {
  pending: "Pendente",
  processing: "Processando",
  finished: "Finalizado",
  failed: "Falhou",
  canceled: "Cancelado",
} as const;

const PROCESS_STATUS_COLORS = {
  pending: "bg-yellow-500 ",
  processing: "bg-blue-500",
  finished: "bg-green-500",
  failed: "bg-red-500",
  canceled: "bg-red-500",
} as const;

type ProcessStatusKeyType = keyof typeof PROCESS_STATUS;

export function useColumns() {
  const { hasPermissionTo } = usePermission();
  const { mutate: mutateDownloadReport } = useDownloadReport();
  const { mutate: mutateProcessReport } = useProcessReport();

  const downloadReport = (reportId: number) => {
    mutateDownloadReport(reportId, {
      onSuccess: async (report) => {
        notify("success", "O download será iniciado automaticamente.");
        const downloadResponse = await fetch(report.uri);
        const blob = await downloadResponse.blob();
        FileSaver.saveAs(blob, report.fileName);
      },
      onError: () => {
        notify("error", "Não foi possível realizar download");
      },
    });
  };

  const processReport = () => {
    mutateProcessReport();
    notify("success", "começamos a processar os relatórios...");
  };

  const columns: ColumnDef<any>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#" />
      ),
      cell: ({ row }) => {
        return row.original.id;
      },
      enableSorting: true,
      enableHiding: false,
    },
    // {
    //   id: "type",
    //   accessorKey: "type",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Tipo" />
    //   ),
    //   cell: ({ row }) => {
    //     return row.original.type;
    //   },
    //   enableSorting: true,
    //   enableHiding: false,
    // },
    {
      id: "startedAt",
      accessorKey: "startedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Iniciou em" />
      ),
      cell: ({ row }) => {
        if (row.original.started_at) {
          const date = new Date(row.original.started_at);
          return format(date, "dd/MM/yyyy HH:mm");
        } else {
          return "---";
        }
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "finishedAt",
      accessorKey: "finishedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Finalizou em" />
      ),
      cell: ({ row }) => {
        if (row.original.finished_at) {
          const date = new Date(row.original.finished_at);
          return format(date, "dd/MM/yyyy HH:mm");
        } else {
          return "---";
        }
      },
      enableSorting: true,
      enableHiding: true,
    },

    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <Badge
            className={`text-foreground ${
              PROCESS_STATUS_COLORS[row.original.status as ProcessStatusKeyType]
            }`}
          >
            {PROCESS_STATUS[row.original.status as ProcessStatusKeyType]}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#" />
      ),
      cell: ({ row }) => {
        return (
          <Button
            className="text-sm"
            size="sm"
            variant="link"
            disabled={
              PROCESS_STATUS[row.original.status as ProcessStatusKeyType] !==
              "Finalizado"
            }
            onClick={() => downloadReport(row.original.id)}
          >
            Download
          </Button>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   id: "actions",
    //   cell: ({ row }) => {
    //     const document = row.original;

    //     const actions: IDataTableAction[] = [
    //       {
    //         name: "Download",
    //         route: "#",
    //         hasPermission: true,
    //         onPress: () => downloadReport(document.id),
    //       },
    //       {
    //         name: "",
    //         route: "#",
    //         hasPermission: true,
    //         onPress: () => processReport(),
    //       },
    //     ];
    //     return <DataTableActions actions={actions} />;
    //   },
    // },
  ];

  return { columns };
}
