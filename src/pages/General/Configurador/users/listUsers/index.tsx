import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { UserActions } from "store/ducks";
import { useTranslation } from "react-i18next";
import { usePermission } from "hooks";
import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import { DataTable } from "@/components/ui/DataTable";
import { useDataTableColumns } from "./columns";

export const Users: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [_, setIsUpdatingSet] = useState(new Set());
  const { t } = useTranslation();
  const { hasPermissionTo } = usePermission();
  const { columns } = useDataTableColumns();

  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("general.config.users.title"),
      route: "/config/users",
      hasPermission: true,
    },
    {
      title: t("comex.filterandButton.addUser"),
      route: "/config/users/novo",
      hasPermission: hasPermissionTo(
        "CREATEUSER",
        "LISTROLE",
        "LISTCOMPANY",
        "LISTRESPONSIBLE"
      ),
    },
  ];

  const { data: users, loading } = useSelector(
    (state: RootState) => state.users
  );

  const fetchUsers = useCallback(() => {
    dispatch(UserActions.request("", onSuccess));
  }, []);

  const onSuccess = useCallback((data: any[]): void => {
    setIsUpdatingSet(new Set());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="w-full flex flex-col gap-6">
      <InnerNavigator options={navigatorOptions} />
      <DataTable
        columns={columns}
        data={users ?? []}
        filterBy="Nome.User"
        isLoading={loading}
      />
    </section>
  );
};

export default Users;
