import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  CreateWarehouseMemberActions as Actions,
  CreateWarehouseMemberRequestAction as RequestAction,
} from 'store/ducks/warehouseMembers';

export function* createWarehouseMemberRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.post, `auth/register/warehouse-member`, postData);
    onSuccess && onSuccess();
    notify('success', 'Usuário criado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
