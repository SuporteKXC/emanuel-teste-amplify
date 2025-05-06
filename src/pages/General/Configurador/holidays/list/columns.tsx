import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";
import { usePermission } from "@/hooks";
import type { Holiday } from "../holiday";
import { DateTime } from "luxon";

export function useDataTableColumns() {
  const { hasPermissionTo } = usePermission();
  const columns: ColumnDef<Holiday>[] = [
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
      id: "Feriado",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Feriado" />
      ),
      cell: ({ row }) => {
        return row.original.name;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Data",
      accessorKey: "holidayDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data" />
      ),
      cell: ({ row }) => {
        const date = row.original.holidayDate as unknown as string
        return DateTime.fromISO(date).toLocaleString();
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Dt.Criação",
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dt.Criação" />
      ),
      cell: ({ row }) => {
        const date = row.original.createdAt as unknown as string
        return DateTime.fromISO(date).toLocaleString();
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Company",
      accessorKey: 'company.name_fantasy',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Empresa" />
      ),
      cell: ({ row }) => {
        return row.original.company?.name_fantasy || "---"
      },
        },
    {
      id: "Fixado",
      accessorKey: "fixed",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="É fixo?" />
      ),
      cell: ({ row }) => {
        return row.original.fixed ? 'SIM' : "NÃO"
      },
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const actions: IDataTableAction[] = [
          {
            name: "Editar",
            route: `/config/holidays/${row.original.id}`,
            hasPermission: hasPermissionTo("UPDATEHOLIDAY"),
          },
          {
            name: "Excluir",
            route: `/config/holidays/delete/${row.original.id}`,
            hasPermission: hasPermissionTo("DELETEHOLIDAY"),
          },
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns };
}
