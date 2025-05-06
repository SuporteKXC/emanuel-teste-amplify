import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateCompanyMemberActions as Actions,
  UpdateCompanyMemberRequestAction as RequestAction,
} from 'store/ducks/companyMembers';

export function* updateCompanyMemberRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.put, `company-members/${id}`, putData);
    onSuccess && onSuccess();
    notify('success', 'Usuário atualizado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
