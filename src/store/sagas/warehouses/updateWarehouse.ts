import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateWarehouseActions as Actions,
  UpdateWarehouseRequestAction as RequestAction,
} from 'store/ducks/warehouses';

export function* updateWarehouseRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.put, `warehouses/${id}`, putData);
    onSuccess && onSuccess();
    notify('success', 'Armazém atualizado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
