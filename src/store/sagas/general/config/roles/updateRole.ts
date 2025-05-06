import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
    UpdateRoleActions,
    UpdateRoleRequestAction,
} from 'store/ducks';

export function* updateRoleRequest(action: any) {
  const { id, postData, onSuccess, onFailure }: UpdateRoleRequestAction = action;
  try {
    const { data } = yield call(api.put, `/role/update-related/${id}`, postData);
    onSuccess && onSuccess();
    notify('success', 'Perfil Atualizado!');
    yield all([
      put(UpdateRoleActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(UpdateRoleActions.failure(errorMessage));
  }
}