import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";

export const columns: ColumnDef<any>[] = [
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
    id: "Dt.Criação",
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dt.Criação" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return date.toLocaleDateString("pt-BR");
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "Tipo",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      return row.original.name;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const actions: IDataTableAction[] = [
        {
          name: "Editar",
          route: `/config/roles/update/${row.original.id}`,
        },
      ];
      return <DataTableActions actions={actions} />;
    },
  },
];
