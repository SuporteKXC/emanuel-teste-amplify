import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";
import { usePermission } from "@/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpenTextIcon } from "lucide-react";

export function useDataTableColumns() {
  const { hasPermissionTo } = usePermission();
  const columns: ColumnDef<any>[] = [
    {
      id: "Código",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código" />
      ),
      cell: ({ row }) => {
        return row.original.id;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Módulo",
      accessorKey: "module_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Módulo" />
      ),
      cell: ({ row }) => {
        return row.original.module_id;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Nome.Alert",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
      cell: ({ row }) => {
        return row.original.description;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Frequência",
      accessorKey: "alert_frequency",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Frequência" />
      ),
      cell: ({ row }) => {
        return row.original.alert_frequency;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Detalhes",
      accessorKey: "details",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Detalhes" />
      ),
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookOpenTextIcon className="text-slate-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs font-sans text-xs p-4">
                <p>{row.original.details}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const actions: IDataTableAction[] = [
          {
            name: "Editar",
            route: `/config/alert-types/update/${row.original.id}`,
            hasPermission: hasPermissionTo("UPDATEALERTTYPE", "LISTROLE"),
          },
          {
            name: "Excluir",
            route: `/config/alert-types/delete/${row.original.id}`,
            hasPermission: hasPermissionTo("DELETEALERTTYPE", "LISTROLE"),
          },
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns };
}
