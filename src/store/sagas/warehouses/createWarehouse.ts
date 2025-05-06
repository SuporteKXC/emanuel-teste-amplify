import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  CreateWarehouseActions as Actions,
  CreateWarehouseRequestAction as RequestAction,
} from 'store/ducks/warehouses';

export function* createWarehouseRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.post, `warehouses`, postData);
    onSuccess && onSuccess();
    notify('success', 'Armazém criado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
