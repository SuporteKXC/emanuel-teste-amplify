import React, { useCallback, useEffect } from "react";
import { MainNavigator } from "@/components/ui/MainNavigator";
import { MainNavOptions } from "@/data/MainNavOptions";
import { RootState } from "store";
import { ModulesListActions, PermissionActions } from "store/ducks";
import { useDispatch, useSelector } from "react-redux";
const env = import.meta.env;

export const AsideMenu: React.FC = () => {
  const { options } = MainNavOptions();
  const dispatch = useDispatch();

  const { data: userPermissions, loading } = useSelector(
    (state: RootState) => state.permission
  );

  const { data: modules, loading: loadingModules } = useSelector(
    (state: RootState) => state.modules
  );

  const getPermissions = useCallback(() => {
    dispatch(PermissionActions.request());
  }, [dispatch]);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  useEffect(()=>{
    dispatch(ModulesListActions.request());
  },[])

  return (
    <div className="z-50">
      <MainNavigator
        options={options}
        userPermissions={loading ? [] : userPermissions ?? []}
        clientLogo={env.VITE_LOGO_MENU_URL}
        modules={loadingModules ? [] : modules ?? []}
      />
    </div>
  );
};
