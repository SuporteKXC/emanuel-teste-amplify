import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "../input";
import { ExportExcel } from "../ExportExcel";
import { Skeleton } from "./data-table-skeleton";
import { Button } from "../button";
import { Sheet } from "lucide-react";
import { Calendar } from "../calendar";
import DateRangePickerGs from "../Forms/dateRangePickerGs";
import RangePicker from "../Forms/rangePicker";
import { DateRange } from "react-day-picker";
import { ExportAodExcel } from "../ExportAodExcel";
import { useDispatch, useSelector } from "react-redux";
import { DatatableFilterActions } from "@/store/ducks/export/dataTableFilters";
import { RootState } from "@/store";

interface AdicionalStylesProps {
  item_table_row: string,
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy?: string | string[];
  filterByDate?: string | string[];
  exportTable?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  exportData?: any;
  aditionalStyles?: (item: any) => AdicionalStylesProps
}

export function DataTable<TData, TValue>({
  columns,
  data,
  exportData,
  filterBy,
  filterByDate,
  exportTable = false,
  isLoading = false,
  children,
  aditionalStyles,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();

  const columnFilters = useSelector(
    (state: RootState) => state.datatableFilterReducer.filter
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [localColumnFilters, setLocalColumnFilters] =
    React.useState<ColumnFiltersState>(columnFilters);

  const setGlobalColumnFilters = React.useCallback(
    (data: ColumnFiltersState) => {
      dispatch(DatatableFilterActions.addFilters(data));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (localColumnFilters !== columnFilters) {
      setGlobalColumnFilters(localColumnFilters);
    }
  }, [localColumnFilters, columnFilters, setGlobalColumnFilters]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setLocalColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-24 text-center font-sans">
        Sem resultados.
      </div>
    );
  }

  const aditionalStylesRow = (item: any) => aditionalStyles ? 
    aditionalStyles(item) 
    : {
      item_table_row: "",
    };

  return (
    <div>
      <div className="w-full mb-4 flex flex-col md:flex-row gap-3 items-end justify-between">
        {filterByDate &&
          (Array.isArray(filterByDate) ? (
            filterByDate.map((filterBy) => (
              <RangePicker
                label={filterBy}
                onSelect={(date) => {
                  table.getColumn(filterBy)?.setFilterValue(date);
                }}
                selected={
                  table
                    .getColumn(filterBy as string)
                    ?.getFilterValue() as DateRange
                }
              />
            ))
          ) : (
            <RangePicker
              label={filterByDate as string}
              onSelect={(date) => {
                table.getColumn(filterByDate as string)?.setFilterValue(date);
              }}
              selected={
                table
                  .getColumn(filterByDate as string)
                  ?.getFilterValue() as DateRange
              }
            />
          ))}
        {filterBy &&
          (Array.isArray(filterBy) ? (
            filterBy.map((filterBy) => (
              <Input
                key={filterBy}
                placeholder={`Filtrar ${filterBy
                  .split(".")?.[0]
                  ?.toLowerCase()} ...`}
                value={
                  (table.getColumn(filterBy)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(filterBy)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            ))
          ) : (
            <Input
              placeholder={`Filtrar ${filterBy
                .split(".")?.[0]
                ?.toLowerCase()} ...`}
              value={
                (table.getColumn(filterBy)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(filterBy)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          ))}
        <div className="flex gap-3 w-full justify-end">
          {children && children}
          {exportTable && <ExportExcel data={exportData ? exportData : data} />}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-xs font-sans">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={aditionalStylesRow(row.original)?.item_table_row || ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center font-sans"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-start space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
