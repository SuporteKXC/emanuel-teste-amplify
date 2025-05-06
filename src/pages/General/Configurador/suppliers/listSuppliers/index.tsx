import { usePermission } from "@/hooks";
import { AppDispatch, RootState } from "@/store";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDataTableColumns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";
import { InnerNavigatorOption, InnerNavigator } from "@/components/ui/InnerNavigator";
import { SupplierListActions } from "@/store/ducks";

interface IProps {}

/**
 * @author
 * @function @Suppliers
 **/

export const Suppliers: FC<IProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [_, setIsUpdatingSet] = useState(new Set());
  const { t } = useTranslation();
  const { hasPermissionTo } = usePermission();
  const { columns } = useDataTableColumns();
  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("general.asideMenu.config.suppliers.title"),
      route: "/config/suppliers",
      hasPermission: true,
    },
    {
      title: t("comex.filterandButton.addSupplier"),
      route: "/config/suppliers/novo",
      hasPermission: hasPermissionTo(
        // "CREATESUPPLIER",
        "LISTUSER",
      ),
    },
  ];

  const { data: suppliers, loading } = useSelector(
    (state: RootState) => state.supplierList
  );

  const fetchSuppliers = useCallback(() => {
    dispatch(SupplierListActions.request("", onSuccess));
  }, []);

  const onSuccess = useCallback((data: any[]): void => {
    console.log(data)
    setIsUpdatingSet(new Set());
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <section className="w-full flex flex-col gap-6">
      <InnerNavigator options={navigatorOptions} />
      <DataTable
        columns={columns}
        data={suppliers ?? []}
        filterBy={["Descrição.Supplier", "Código"]}
        isLoading={loading}
      />
    </section>
  );
};
