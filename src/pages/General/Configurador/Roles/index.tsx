import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RolesActions } from "store/ducks";
import type { AppDispatch, RootState } from "store";
import { useTranslation } from "react-i18next";
import { usePermission } from "hooks";
import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import { columns } from "./columns";
import { DataTable } from "components/ui/DataTable";

export const Roles: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const [_, setIsUpdatingSet] = useState(new Set());
  const { hasPermissionTo } = usePermission();

  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("general.config.users.profile"),
      route: "/config/roles",
      hasPermission: true,
    },
    {
      title: t("comex.filterandButton.addprofile"),
      route: "/config/roles/novo",
      hasPermission: hasPermissionTo("CREATEROLE", "LISTACTION"),
    },
  ];

  const { data: rolesData, loading } = useSelector(
    (state: RootState) => state.roles
  );

  const fetchRoles = useCallback(() => {
    dispatch(RolesActions.request("", onSuccess, onFailure));
  }, [dispatch]);

  const onSuccess = useCallback(() => {
    setIsUpdatingSet(new Set());
  }, []);

  const onFailure = useCallback((message: string) => {
    setIsUpdatingSet(new Set());
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [dispatch]);

  return (
    <section className="w-full flex flex-col gap-6">
      <InnerNavigator options={navigatorOptions} />
      <DataTable
        columns={columns}
        data={rolesData ?? []}
        filterBy="Tipo"
        isLoading={loading}
      />
    </section>
  );
};

export default Roles;
