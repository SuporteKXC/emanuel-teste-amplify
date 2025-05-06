import { DataTableColumnHeader } from "@/components/ui/DataTable";
import { DataTableActions, IDataTableAction } from "@/components/ui/DataTableActions";
import { OrderFile } from "@/contracts/comex/OrderFile";
import { ColumnDef } from "@tanstack/react-table";

export function useColumns(){
    const columns: ColumnDef<OrderFile>[] = [
        {
            id: "id",
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
            id: "po",
            accessorKey: "order.order_reference",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Po" />
            ),
            cell: ({ row }) => {
                return row.original.order.order_reference;
            },
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: "description",
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
            id: "created_at",
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Criado em" />
            ),
            cell: ({ row }) => {
                const date = new Date(row.original.created_at);
        return date.toLocaleDateString("pt-BR");
            },
            enableSorting: true,
        },
        {
            id: "actions",
            cell: ({ row }) => {
              const actions: IDataTableAction[] = [
                {
                  name: "Editar",
                  route: `${row.original.id}`,
                },
              ];
              return <DataTableActions actions={actions} />;
            },
          },
    ]
    return {
        columns
    }
}