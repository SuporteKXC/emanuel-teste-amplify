import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableActions,
  IDataTableAction,
} from "@/components/ui/DataTableActions";
import { usePermission } from "@/hooks";

export function useDataTableColumns() {
  const { hasPermissionTo } = usePermission();
  const columns: ColumnDef<any>[] = [
    {
      id: "Id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
      cell: ({ row }) => {
        return row.original.id;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Código",
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código" />
      ),
      cell: ({ row }) => {
        return row.original.code;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Descrição.Supplier",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descrição" />
      ),
      cell: ({ row }) => {
        return row.original.description;
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
      id: "Exceção",
      accessorKey: "is_special",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Exceção" />
      ),
      cell: ({ row }) => {
        return row.original.is_special === 1 ? "Sim" : "Nao";
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
            route: `/config/suppliers/edit/${row.original.id}`,
            hasPermission: hasPermissionTo("UPDATESUPPLIER"),
          },
          {
            name: "Excluir",
            route: `/config/suppliers/`,
            hasPermission: hasPermissionTo("DELETESUPPLIER"),
          },
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns };
}
