import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  DeleteUserActions,
  DeleteUserRequestAction,
} from 'store/ducks';

export function* deleteUserRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteUserRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/user/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Usuário Bloqueado!');
    yield all([
      put(DeleteUserActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DeleteUserActions.failure(errorMessage));
  }
}
