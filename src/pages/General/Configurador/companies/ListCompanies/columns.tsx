import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Company from "@/contracts/general/Company";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "styles/components/icons";

export function useColumns() {
  const navigate = useNavigate();
  const columns: ColumnDef<Company>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="id" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "nameFantasy",
      accessorKey: "nameFantasy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Neme Fantasia" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "cnpj",
      accessorKey: "cnpj",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cnpj" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "consignee",
      accessorKey: "consignee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Consignee" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "plantCode",
      accessorKey: "plantCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Planta" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "action",
      cell: ({ row }) => {
        const id = row.getValue("id");

        return (
          <button
            title={"editar"}
            onClick={() => navigate(`/config/companies/${id}`)}
          >
            <EditIcon />
          </button>
        );
      },
    },
  ];

  return { columns };
}
