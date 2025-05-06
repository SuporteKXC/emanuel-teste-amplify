import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler,formDataBuilder } from 'services';
import {
  UpdateCompanyActions as Actions,
  UpdateCompanyRequestAction as RequestAction,
} from 'store/ducks/companies';

export function* updateCompanyRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    const formData = formDataBuilder(putData);
    yield call(api.put, `companies/${id}`, formData);
    onSuccess && onSuccess();
    notify('success', 'Cliente atualizado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
