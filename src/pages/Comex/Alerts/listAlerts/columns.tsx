import { DataTableColumnHeader } from "components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { usePermission } from "@/hooks";
import { UserAlertData } from "@/contracts";
import { Button } from "@/components/ui/ButtonGs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  AlertActions,
  UpdateAlertActions,
  UpdateManyAlertActions,
} from "@/store/ducks";
import { useCallback, useState } from "react";
import { ActivityIndicator } from "./styles";

export function useColumns() {
  const hasPermissionTo = usePermission();
  const dispatch = useDispatch();
  const [setIsUpdating, setSetIsUpdating] = useState(new Set());
  const { data: alerts, loading } = useSelector(
    (state: RootState) => state.alerts
  );
  const { data: filterData } = useSelector(
    (state: RootState) => state.alertsFilter
  );

  const onSuccess = useCallback(() => {
    dispatch(AlertActions.request(filterData));
    setSetIsUpdating(new Set());
  }, []);

  const handleClick = () => {
    let ids: number[] = [];
    alerts?.forEach((item) => {
      if (item.read == 0) {
        ids.push(item.id);
      }
    });
    dispatch(UpdateManyAlertActions.request(ids, 1, onSuccess));
  };
  const columns: ColumnDef<UserAlertData>[] = [
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
      id: "Criado em",
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Criado em" />
      ),
      cell: ({ row }) => {
        return new Date(row.original?.created_at).toLocaleString();
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "csr_name",
      accessorKey: "order_item_alert.order_item.order.csr_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Responsável pela importação"
        />
      ),
      cell: ({ row }) => {
        return row.original?.order_item_alert?.order_item?.order
          ?.responsible_po;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "responsible_po",
      accessorKey: "order_item_alert.order_item.order.responsible_po",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Planejador" />
      ),
      cell: ({ row }) => {
        console.log(row.original);
        return row.original?.order_item_alert?.order_item?.order
          ?.responsible_po;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "product_description",
      accessorKey: "order_item_alert.order_item.product.description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Produto" />
      ),
      cell: ({ row }) => {
        return row.original?.order_item_alert?.order_item?.product?.description;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "order_reference",
      accessorKey: "order_item_alert.order_item.order.order_reference",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PO" />
      ),
      cell: ({ row }) => {
        return row.original?.order_item_alert?.order_item?.order
          ?.order_reference;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "item",
      accessorKey: "order_item_alert.order_item.item",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Item" />
      ),
      cell: ({ row }) => {
        return row.original?.order_item_alert?.order_item?.item;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "message",
      accessorKey: "order_item_alert.message",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mensagem" />
      ),
      cell: ({ row }) => {
        return row.original?.order_item_alert?.message;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "mark_as_read",
      header: ({ column }) => (
        <Button.Root variant="tertiary" size="sm">
          {loading ? <ActivityIndicator size={18} /> : "Marcar todas"}
        </Button.Root>
      ),
      cell: ({ row }) => {
        return (
          <Button.Root
            onClick={(e) => {
              setSetIsUpdating((prev) => new Set([...prev, row.original.id]));
              dispatch(
                UpdateAlertActions.request(
                  row.original?.id,
                  row.original?.read === 0 ? 1 : 0,
                  onSuccess
                )
              );
            }}
            variant="tertiary"
            size="sm"
          >
            {setIsUpdating.has(row.original.id) ? (
              <ActivityIndicator size={18} />
            ) : row.original?.read === 0 ? (
              "Marcar como lido"
            ) : (
              "Desmarcar"
            )}
          </Button.Root>
        );
      },
    },
  ];

  return { columns };
}
