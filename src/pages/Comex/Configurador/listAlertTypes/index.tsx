import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertTypesActions, ModulesListActions } from "store/ducks";
import type { AppDispatch, RootState } from "store";
import { useTranslation } from "react-i18next";
import { usePermission } from "hooks";
import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import { DataTable } from "@/components/ui/DataTable";
import { useDataTableColumns } from "./columns";

export const ListAlertTypes: React.FC = () => {
  const { columns } = useDataTableColumns();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const [_, setIsUpdatingSet] = useState(new Set());
  const { hasPermissionTo } = usePermission();

  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("comex.settings.alertType.title"),
      route: "/config/alert-types",
      hasPermission: true,
    },
    {
      title: t("comex.settings.alertType.addAlertType"),
      route: "/config/alert-types/novo",
      hasPermission: hasPermissionTo("CREATEALERTTYPE"),
    },
  ];

  const { data: alertTypesData, loading } = useSelector(
    (state: RootState) => state.alertTypes
  );

  const fetchAlertTypes = useCallback(() => {
    dispatch(AlertTypesActions.request("", onSuccess));
  }, [dispatch]);

  const onSuccess = useCallback(() => {
    setIsUpdatingSet(new Set());
  }, []);

  const fetchModules = useCallback(() => {
    dispatch(ModulesListActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchAlertTypes();
    fetchModules();
  }, [fetchAlertTypes]);

  return (
    <section className="w-full flex flex-col gap-6">
      <InnerNavigator options={navigatorOptions} />
      <DataTable
        columns={columns}
        data={alertTypesData ?? []}
        filterBy="Nome.Alert"
        isLoading={loading}
      />
    </section>
  );
};

export default ListAlertTypes;
