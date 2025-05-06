import { all, call, put } from "@redux-saga/core/effects";
import {
  api,
  notify,
  apiErrorHandler,
  apiStocks,
  apiImport,
  apiUploadVoucher,
  apiComexExport,
  apiDashboard,
} from "services";
import {
  AuthActions,
  LoginActions,
  LoginRequestAction,
} from "store/ducks/general";

export const authRehydrateAccessToken = ({ payload }: Record<string, any>) => {
  if (!payload?.auth?.data) return;
  const { token } = payload.auth.data;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    apiStocks.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    apiImport.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    apiUploadVoucher.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    apiComexExport.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export function* loginRequest(action: any) {
  const { postData, onSuccess, onFailure }: LoginRequestAction = action;
  try {
    const { data } = yield call(api.post, "/login", postData);
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
      apiComexExport.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
    }

    // yield call(apiDashboard.post, `login-dashboard`, {
    //   domain: 'IFF',
    //   token: data.tokenHash,
    // });
    
    onSuccess && onSuccess();
    notify("success", "Bem vindo");

    yield all([put(LoginActions.success()), put(AuthActions.setData(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(LoginActions.failure(errorMessage));
  }
}
