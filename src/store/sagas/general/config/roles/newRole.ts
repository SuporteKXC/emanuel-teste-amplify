import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewRoleActions,
  NewRoleRequestAction,
} from 'store/ducks';

export function* newRoleRequest(action: any) {
  const { postData, onSuccess, onFailure }: NewRoleRequestAction = action;
  try {
    const { data } = yield call(api.post, `/role/create-related`, postData);
    onSuccess && onSuccess(data.id);
    notify('success', 'Cargo Cadastrado!');
    yield all([
      put(NewRoleActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(NewRoleActions.failure(errorMessage));
  }
}
  