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
      id: "Nome.User",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
      cell: ({ row }) => {
        return row.original.name;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "Email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return row.original.email;
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
      id: "Último Acesso",
      accessorKey: "last_access",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Último Acesso" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.last_access);
        return date.toLocaleDateString("pt-BR");
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
            route: `/config/users/update/${row.original.id}`,
            hasPermission: hasPermissionTo("UPDATEUSER"),
          },
          {
            name: "Excluir",
            route: `/config/users/delete/${row.original.id}`,
            hasPermission: hasPermissionTo("DELETEUSER"),
          },
          {
            name: "Logar como",
            route: `/config/users/impersonate/${row.original.id}`,
            hasPermission: hasPermissionTo("IMPERSONATEUSER"),
          },
        ];
        return <DataTableActions actions={actions} />;
      },
    },
  ];

  return { columns };
}
