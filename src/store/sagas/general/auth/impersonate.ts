import { all, call, put } from "@redux-saga/core/effects";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  api,
  notify,
  apiErrorHandler,
  apiStocks,
  apiImport,
  apiUploadVoucher,
  apiDashboard,
} from "services";
import {
  ActionsListActions,
  AuthActions,
  FiltersListActions,
  ImpersonateActions,
  LoginActions,
  LoginRequestAction,
  ModulesListActions,
  PermissionActions,
} from "store/ducks/general";

export function* impersonateRequest(action: any) {
  const { postData, onSuccess, onFailure, navigation }: LoginRequestAction & {navigation: NavigateFunction} = action;
  try {
    const { data } = yield call(api.post, "/impersonate", postData);

    onSuccess && onSuccess();
    yield all([put(LoginActions.success()), put(AuthActions.setData(data))]);
    
    if (api?.defaults?.headers?.common) {
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      apiStocks.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
      apiImport.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
      apiUploadVoucher.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
    }

    // yield call(apiDashboard.post, `login-dashboard`, {
    //   domain: 'IFF',
    //   token: data.tokenHash,
    // });
    
    const { data: permissions } = yield call(api.get, "/permission/actions");
    const { data: filters } = yield call(api.get, `/permission/filters`);
    const { data: modules } = yield call(api.get, `/permission/modules`);
    
    yield all([
      put(ImpersonateActions.success()),
      put(PermissionActions.success(permissions)),
      put(ModulesListActions.success(modules)),
      put(FiltersListActions.success(filters)),
    ]);
    notify("success", "Bem vindo");
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(LoginActions.failure(errorMessage));
  }
}
