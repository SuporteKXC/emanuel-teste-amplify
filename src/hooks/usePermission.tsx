import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { ModulesListActions, PermissionActions, actions } from 'store/ducks';
import { createSelector } from 'reselect';

const selectActions = createSelector(
  (state: RootState) => state.permission,
  (permission) => permission?.data,
);

const selectModules = createSelector(
  (state: RootState) => state.modules,
  (modules) => modules?.data,
);

export const usePermission = () => {
  const dispatch = useDispatch();
  const actions = useSelector(selectActions);
  const modules = useSelector(selectModules);
  
  useEffect(() => {
    dispatch(ModulesListActions.request());
    dispatch(PermissionActions.request());
  }, []);

  const hasPermissionTo = useCallback(
    (...actionsToCheck: string[]): boolean =>
       actionsToCheck.every(action => actions?.includes(action) || action === "safe")
    ,
    [actions]
  );
  
  const canAccessModule = useCallback((name: string) =>
    modules?.some(module => module.name === name && module.actions.some(moduleAction => actions?.includes(moduleAction.code))),
    [actions, modules]
  );
  
  return {
    canCheckPermission: !!actions,
    canAccessModule,
    hasPermissionTo,
    modules
  }
}