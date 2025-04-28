import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { requestErrorHandler, expirationDaysText } from "utils";
import { AuthActions, LoginRequest } from "store/ducks/auth";

export const authRehydrateAccessToken = ({ payload }: Record<string, any>) => {
  if (!payload?.auth?.data) return;
  const { accessToken } = payload.auth.data;
  if (accessToken) {
    apiGeneral.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }
};

export function* authLoginRequest(action: any) {
  try {
    const { data: postData } = action as LoginRequest;
    const { data: responseData } = yield call(
      apiGeneral.post,
      "login",
      postData
    );

    const { token: accessToken, ...data } = responseData;

    if (data.integration) {
      throw new Error('Usuário integração: Acesso não autorizado');
    }

    apiGeneral.defaults.headers.Authorization = `Bearer ${accessToken}`;

    yield put(AuthActions.loginSuccess({ ...data, accessToken }));
    notify("success", `Bem-vindo ${data.name}`);

    const { days_left_password } = data;

    if(days_left_password && days_left_password <= 10 && days_left_password > 0) {
      notify(
        "warning",
        expirationDaysText(days_left_password)
      );
    } else if(days_left_password !== null && days_left_password <= 0) {
      notify("error", `Sua senha expirou!`);
    }
    
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(AuthActions.loginFailure(errorMessage));
  }
}

export function* authLogoutRequest() {
  try {
    yield call(apiGeneral.post, "logout");
  } catch (error) {
    yield;
  } finally {
    notify("success", "Até mais");
    yield put(AuthActions.logoutSuccess());
    apiGeneral.defaults.headers.Authorization = null;
  }
}
