import { all, call, put, select } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  AuthActions,
  AuthState,
  LoginActions,
  UpdateAccountActions as Actions,
  UpdateAccountRequestAction as RequestAction,
} from 'store/ducks/auth';

export function* updateAccountRequest(action: any) {
  const { putData, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data: authData }: AuthState = yield select((state) => state.auth);
    yield call(api.put, 'auth/account', putData);

    const actions = [put(Actions.success())];

    // if updating the password, we need to renew the token
    if (putData?.password) {
      actions.push(
        put(
          LoginActions.request({
            email: authData?.profile.email,
            password: putData.password,
          })
        )
      );
    }

    // if updating the name, we just need to update the profile
    if (putData?.name && authData?.profile) {
      actions.push(
        put(
          AuthActions.setData({ ...authData, profile: { ...authData.profile, name: putData.name } })
        )
      );
    }

    onSuccess && onSuccess();
    notify('success', 'Dados atualizados com sucesso');
    yield all(actions);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
