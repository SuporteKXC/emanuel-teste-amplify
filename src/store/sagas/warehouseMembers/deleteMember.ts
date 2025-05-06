import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  DeleteWarehouseMemberActions as Actions,
  DeleteWarehouseMemberRequestAction as RequestAction,
} from 'store/ducks/warehouseMembers';

export function* deleteWarehouseMemberRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.delete, `warehouse-members/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Usuário removido com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
