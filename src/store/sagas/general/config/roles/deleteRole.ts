import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  DeleteRoleActions,
  DeleteRoleRequestAction,
} from 'store/ducks';

export function* deleteRoleRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteRoleRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/role/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Cargo Bloqueado!');
    yield all([
      put(DeleteRoleActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DeleteRoleActions.failure(errorMessage));
  }
}
