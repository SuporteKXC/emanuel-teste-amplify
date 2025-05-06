import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, formDataBuilder } from 'services';
import {
  CreateCompanyActions as Actions,
  CreateCompanyRequestAction as RequestAction,
} from 'store/ducks/companies';

export function* createCompanyRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    const formData = formDataBuilder(postData);
    yield call(api.post, `companies`, formData);
    onSuccess && onSuccess();
    notify('success', 'Cliente criado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
